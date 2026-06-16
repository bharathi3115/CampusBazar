import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Purchase } from './models/Purchase.js';
import { Report } from './models/Report.js';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    let defaultBuyer, defaultSeller, defaultAdmin;
    if (userCount === 0) {
      defaultBuyer = await User.create({
        email: 'buyer@campusbazar.com',
        name: 'Demo Buyer',
        role: 'buyer'
      });
      defaultSeller = await User.create({
        email: 'seller@campusbazar.com',
        name: 'Demo Seller',
        role: 'seller'
      });
      const adminPassword = await bcrypt.hash('Admin@123', 10);
      defaultAdmin = await User.create({
        email: 'admin@campus.edu',
        name: 'Super Admin',
        role: 'admin',
        password: adminPassword
      });
    } else {
      defaultBuyer = await User.findOne({ role: 'buyer' });
      defaultSeller = await User.findOne({ role: 'seller' });
      defaultAdmin = await User.findOne({ role: 'admin' });
      if (!defaultSeller) {
        defaultSeller = await User.create({ email: 'seller@campusbazar.com', name: 'Demo Seller', role: 'seller' });
      }
      if (!defaultAdmin) {
        const adminPassword = await bcrypt.hash('Admin@123', 10);
        defaultAdmin = await User.create({
          email: 'admin@campus.edu',
          name: 'Super Admin',
          role: 'admin',
          password: adminPassword
        });
      }
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding initial marketplace data...');
      
      const sampleProducts = [
        {
          title: 'Engineering Graphics Textbook',
          price: 250,
          originalPrice: 300,
          category: 'Books',
          condition: 'Good',
          img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Alice W.', rating: 4.8, verified: true, listingsCount: 5 },
          views: 120,
          wishlistCount: 15
        },
        {
          title: 'Scientific Calculator',
          price: 500,
          originalPrice: 600,
          category: 'Calculators',
          condition: 'Like New',
          img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Emma S.', rating: 4.9, verified: true, listingsCount: 12 },
          views: 340,
          wishlistCount: 42
        },
        {
          title: 'Hostel Bed Mattress',
          price: 1200,
          category: 'Hostel Essentials',
          condition: 'Fair',
          img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'David K.', rating: 4.2, verified: false, listingsCount: 2 },
          views: 89,
          wishlistCount: 5
        },
        {
          title: 'Laptop Stand',
          price: 450,
          category: 'Electronics',
          condition: 'New',
          img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Sarah M.', rating: 5.0, verified: true, listingsCount: 8 },
          views: 210,
          wishlistCount: 28
        },
        {
          title: 'Lab Coat (Size M)',
          price: 200,
          category: 'Lab Equipment',
          condition: 'Good',
          img: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Prof. Miller', rating: 4.9, verified: true, listingsCount: 24 },
          views: 450,
          wishlistCount: 55
        },
        {
          title: 'Mountain Bicycle',
          price: 2500,
          category: 'Bicycles',
          condition: 'Like New',
          img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Mike T.', rating: 4.5, verified: false, listingsCount: 1 },
          views: 520,
          wishlistCount: 65
        },
        {
          title: 'Drafting Table',
          price: 1500,
          originalPrice: 1800,
          category: 'Furniture',
          condition: 'Good',
          img: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'John D.', rating: 4.7, verified: true, listingsCount: 4 },
          views: 180,
          wishlistCount: 20
        },
        {
          title: 'Physics Lab Manual',
          price: 100,
          category: 'Books',
          condition: 'Good',
          img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=400&fit=crop',
          seller: { userId: defaultSeller._id, name: 'Rachel G.', rating: 4.6, verified: false, listingsCount: 3 },
          views: 75,
          wishlistCount: 8
        }
      ];

      await Product.insertMany(sampleProducts);
      console.log('Seeding initial products completed.');
    }
    
    defaultBuyer = await User.findOne({ email: 'buyer@campusbazar.com' });
    if (!defaultBuyer) {
      defaultBuyer = await User.create({
        email: 'buyer@campusbazar.com',
        name: 'Demo Buyer',
        role: 'buyer'
      });
    }

    const purchaseCount = await Purchase.countDocuments();
    if (purchaseCount === 0 && defaultBuyer) {
      console.log('Seeding initial purchases...');
      const samplePurchases = [
        {
          buyerId: defaultBuyer._id,
          productName: 'Engineering Graphics Textbook',
          category: 'Books',
          productImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop',
          purchasePrice: 250,
          sellerName: 'Rahul S.',
          sellerRating: 4.8,
          purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'Completed',
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
        },
        {
          buyerId: defaultBuyer._id,
          productName: 'Scientific Calculator',
          category: 'Calculators',
          productImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop',
          purchasePrice: 500,
          sellerName: 'Priya M.',
          sellerRating: 4.9,
          purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: 'Completed',
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
        },
        {
          buyerId: defaultBuyer._id,
          productName: 'Physics Lab Coat',
          category: 'Lab Equipment',
          productImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop',
          purchasePrice: 300,
          sellerName: 'Prof. Sharma',
          sellerRating: 4.9,
          purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          status: 'Pending Pickup',
          transactionId: 'TXN-' + Math.floor(Math.random() * 1000000)
        }
      ];
      await Purchase.insertMany(samplePurchases);
      console.log('Seeding purchases completed.');
    }

    const reportCount = await Report.countDocuments();
    if (reportCount === 0 && defaultBuyer) {
      console.log('Seeding dummy reports...');
      const firstProduct = await Product.findOne();
      const secondProduct = await Product.findOne().skip(1);
      
      if (firstProduct && secondProduct) {
        await Report.insertMany([
          {
            productId: firstProduct._id,
            reporterId: defaultBuyer._id,
            reason: 'Fake Product',
            severity: 'High',
            status: 'active'
          },
          {
            productId: secondProduct._id,
            reporterId: defaultBuyer._id,
            reason: 'Spam Listing',
            severity: 'High',
            status: 'active'
          },
          {
            productId: secondProduct._id,
            reporterId: defaultBuyer._id,
            reason: 'Duplicate Listing',
            severity: 'Low',
            status: 'active'
          }
        ]);
        console.log('Seeding reports completed.');
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
