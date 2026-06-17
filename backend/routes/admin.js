import express from 'express';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';
import { Purchase } from '../models/Purchase.js';
import { Report } from '../models/Report.js';

const router = express.Router();

// Helper to format date relative time
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " seconds ago";
}

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalListings = await Product.countDocuments();
    const activeListings = await Product.countDocuments({ status: 'Active' });
    const itemsSold = await Product.countDocuments({ status: 'Sold' });
    const purchasesCount = await Purchase.countDocuments();
    const reportedListings = await Report.countDocuments({ status: 'active' });

    const activeUsersToday = Math.floor(totalStudents * 0.2) + 1; 

    res.json({
      totalStudents,
      totalListings,
      activeListings,
      itemsSold: itemsSold || purchasesCount,
      reportedListings,
      activeUsersToday
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/admin/recent-activity
router.get('/recent-activity', async (req, res) => {
  try {
    const recentUsers = await User.find({ role: { $ne: 'admin' } }).sort({ _id: -1 }).limit(3);
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(3);
    const recentPurchases = await Purchase.find().sort({ purchaseDate: -1 }).limit(2);

    let activities = [];
    
    recentUsers.forEach(u => {
      activities.push({
        id: `u_${u._id}`,
        action: 'registered',
        user: u.name || u.email,
        item: 'completed',
        time: u._id.getTimestamp().toISOString(),
        relativeTime: timeSince(u._id.getTimestamp()),
        type: 'user'
      });
    });

    recentProducts.forEach(p => {
      activities.push({
        id: `p_${p._id}`,
        action: 'posted',
        user: p.seller?.name || 'A user',
        item: p.title,
        time: p.createdAt.toISOString(),
        relativeTime: timeSince(p.createdAt),
        type: 'product'
      });
    });

    recentPurchases.forEach(p => {
      activities.push({
        id: `pur_${p._id}`,
        action: 'sold',
        user: p.sellerName || 'A seller',
        item: p.productName,
        time: p.purchaseDate.toISOString(),
        relativeTime: timeSince(p.purchaseDate),
        type: 'purchase'
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json(activities.slice(0, 5));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/admin/listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await Product.find().sort({ createdAt: -1 }).populate('seller.userId', 'name email');
    res.json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT /api/admin/listings/:id/status
router.put('/listings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE /api/admin/listings/:id
router.delete('/listings/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
