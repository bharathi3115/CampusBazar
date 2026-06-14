import mongoose from 'mongoose';
import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Purchase } from './models/Purchase.js';

const addSales = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/campusbazar');
    console.log('Connected to MongoDB');

    // Create demo seller
    let seller = await User.findOne({ email: 'seller@campusbazar.com' });
    if (!seller) {
      seller = await User.create({
        email: 'seller@campusbazar.com',
        name: 'Demo Seller',
        role: 'seller'
      });
    }

    // Buyers
    const buyersData = [
      { email: 'rahul@campusbazar.com', name: 'Rahul S.', role: 'buyer' },
      { email: 'priya@campusbazar.com', name: 'Priya M.', role: 'buyer' },
      { email: 'akash@campusbazar.com', name: 'Akash K.', role: 'buyer' },
      { email: 'neha@campusbazar.com', name: 'Neha P.', role: 'buyer' }
    ];
    
    let buyers = {};
    for (let bd of buyersData) {
      let b = await User.findOne({ email: bd.email });
      if (!b) b = await User.create(bd);
      buyers[bd.name] = b;
    }

    // Products
    const salesData = [
      {
        title: 'Engineering Graphics Textbook',
        price: 250,
        category: 'Books',
        condition: 'Good',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop',
        views: 45,
        wishlistCount: 12,
        daysAgo: 2,
        buyerName: 'Rahul S.'
      },
      {
        title: 'Casio Scientific Calculator',
        price: 500,
        category: 'Calculators',
        condition: 'Like New',
        img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop',
        views: 120,
        wishlistCount: 18,
        daysAgo: 5,
        buyerName: 'Priya M.'
      },
      {
        title: 'Physics Lab Coat',
        price: 300,
        category: 'Lab Equipment',
        condition: 'Good',
        img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop',
        views: 85,
        wishlistCount: 9,
        daysAgo: 7,
        buyerName: 'Akash K.'
      },
      {
        title: 'Mountain Bicycle',
        price: 3500,
        category: 'Bicycles',
        condition: 'Good',
        img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop',
        views: 210,
        wishlistCount: 25,
        daysAgo: 10,
        buyerName: 'Neha P.'
      }
    ];

    for (let sd of salesData) {
      // Check if product exists
      let product = await Product.findOne({ title: sd.title, status: 'Sold', 'seller.name': 'Demo Seller' });
      if (!product) {
        product = await Product.create({
          title: sd.title,
          price: sd.price,
          category: sd.category,
          condition: sd.condition,
          img: sd.img,
          views: sd.views,
          wishlistCount: sd.wishlistCount,
          status: 'Sold',
          seller: { name: 'Demo Seller', rating: 4.8, verified: true, listingsCount: 10 }
        });
      }

      // Create purchase
      const pDate = new Date();
      pDate.setDate(pDate.getDate() - sd.daysAgo);

      let purchase = await Purchase.findOne({ productId: product._id });
      if (!purchase) {
        await Purchase.create({
          buyerId: buyers[sd.buyerName]._id,
          productId: product._id,
          productName: product.title,
          category: product.category,
          productImage: product.img,
          purchasePrice: product.price,
          sellerName: 'Demo Seller',
          sellerRating: 4.8,
          purchaseDate: pDate,
          status: 'Completed',
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
        });
      }
    }
    console.log('Dummy sales added.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

addSales();
