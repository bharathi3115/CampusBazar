import express from 'express';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { Purchase } from '../models/Purchase.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const router = express.Router();

// Fail fast if database is disconnected so frontend can fallback to dummy data immediately
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database disconnected' });
  }
  next();
});

// Get all products with filters, sorting, and pagination
router.get('/products', async (req, res) => {
  try {
    const { search, category, condition, sort, page = 1, limit = 12 } = req.query;
    
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    if (condition && condition !== 'All Conditions') {
      query.condition = condition;
    }
    
    let sortObj = {};
    switch (sort) {
      case 'Price Low to High': sortObj.price = 1; break;
      case 'Price High to Low': sortObj.price = -1; break;
      case 'Most Viewed': sortObj.views = -1; break;
      case 'Most Wishlisted': sortObj.wishlistCount = -1; break;
      case 'Oldest First': sortObj.createdAt = 1; break;
      case 'Newest First': 
      default: sortObj.createdAt = -1; break;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product listing
router.post('/products', async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Upload base64 images to Cloudinary if configured and images exist
    if (productData.images && productData.images.length > 0) {
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        const uploadPromises = productData.images.map(async (imgBase64) => {
          // If it's already a URL, skip upload
          if (imgBase64.startsWith('http')) return imgBase64;
          
          try {
            const uploadResponse = await cloudinary.uploader.upload(imgBase64, {
              folder: 'campusbazaar_products'
            });
            return uploadResponse.secure_url;
          } catch (uploadErr) {
            console.error('Cloudinary upload error:', uploadErr);
            return imgBase64; // Fallback to base64 if upload fails
          }
        });
        productData.images = await Promise.all(uploadPromises);
      }
    }

    const newProduct = new Product(productData);
    // If images are provided, set the first one as 'img' for backward compatibility
    if (newProduct.images && newProduct.images.length > 0) {
      newProduct.img = newProduct.images[0];
    }
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get trending categories
router.get('/trending-categories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 }
    ]);
    res.json(categories.map(c => ({ name: c._id, listings: c.count })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get marketplace stats
router.get('/stats', async (req, res) => {
  try {
    const activeListings = await Product.countDocuments({ status: 'Active' });
    res.json({
      activeListings,
      studentsOnline: 342, // Mocked live stat
      verifiedSellers: 89,
      itemsSoldThisWeek: 142
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product details and track view
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    
    // In a real app we'd have a user token, for now mock user ID update
    const defaultUser = await User.findOne();
    if (defaultUser && product) {
      if (!defaultUser.recentlyViewed.includes(product._id)) {
        defaultUser.recentlyViewed.unshift(product._id);
        if (defaultUser.recentlyViewed.length > 10) defaultUser.recentlyViewed.pop();
        await defaultUser.save();
      }
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recently viewed
router.get('/recently-viewed', async (req, res) => {
  try {
    const defaultUser = await User.findOne().populate('recentlyViewed');
    res.json(defaultUser ? defaultUser.recentlyViewed : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recommended
router.get('/recommended', async (req, res) => {
  try {
    // Just fetch some highly viewed products randomly for demo
    const recommended = await Product.find().sort({ views: -1 }).limit(4);
    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get price drops
router.get('/price-drops', async (req, res) => {
  try {
    const priceDrops = await Product.find({ originalPrice: { $gt: 0 } }).limit(4);
    res.json(priceDrops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user purchases
router.get('/purchases', async (req, res) => {
  try {
    // In a real app, buyerId would come from auth token req.user.id
    // For demo, fetch the default buyer user
    const defaultBuyer = await User.findOne({ email: 'buyer@campusbazar.com' });
    if (!defaultBuyer) {
      return res.status(404).json({ message: 'Buyer user not found' });
    }

    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const purchases = await Purchase.find({ buyerId: defaultBuyer._id })
      .sort({ purchaseDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Purchase.countDocuments({ buyerId: defaultBuyer._id });

    // Calculate summary statistics
    const allPurchases = await Purchase.find({ buyerId: defaultBuyer._id });
    const totalAmountSpent = allPurchases.reduce((sum, p) => sum + p.purchasePrice, 0);
    const averageSellerRating = allPurchases.length > 0 
      ? (allPurchases.reduce((sum, p) => sum + p.sellerRating, 0) / allPurchases.length).toFixed(1)
      : 0;
    
    // Purchases this month
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const purchasesThisMonth = allPurchases.filter(p => new Date(p.purchaseDate) >= thirtyDaysAgo).length;

    res.json({
      purchases,
      summary: {
        totalPurchases: total,
        totalAmountSpent,
        averageSellerRating,
        purchasesThisMonth
      },
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
