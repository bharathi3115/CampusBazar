import express from 'express';
import { Report } from '../models/Report.js';

const router = express.Router();

// POST /api/reports - Create a new report
router.post('/', async (req, res) => {
  try {
    const { productId, reporterId, reason } = req.body;
    
    if (!productId || !reporterId || !reason) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Determine severity based on reason
    let severity = 'Low';
    if (reason === 'Fake Product' || reason === 'Spam Listing') severity = 'High';
    else if (reason === 'Inappropriate Content') severity = 'Medium';

    const report = new Report({
      productId,
      reporterId,
      reason,
      severity
    });

    await report.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/reports - Fetch all active reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find({ status: 'active' })
      .populate('productId')
      .populate('reporterId', 'email name')
      .sort({ createdAt: -1 });
    
    // Group multiple reports for the same product, if needed, or just send them all.
    // The requirement says: "Multiple reports for the same listing should be grouped or counted together to avoid duplicate entries."
    const groupedReports = [];
    const productMap = new Map();

    reports.forEach(report => {
      // If product was deleted, productId might be null
      if (!report.productId) return; 

      const prodIdStr = report.productId._id.toString();
      if (productMap.has(prodIdStr)) {
        productMap.get(prodIdStr).count += 1;
      } else {
        const entry = {
          _id: report._id, // use the id of the first report
          productId: report.productId,
          reporter: report.reporterId,
          reason: report.reason,
          severity: report.severity,
          createdAt: report.createdAt,
          count: 1
        };
        productMap.set(prodIdStr, entry);
        groupedReports.push(entry);
      }
    });

    res.json(groupedReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/reports/:id/ignore - Ignore a report
router.put('/:id/ignore', async (req, res) => {
  try {
    // We update all reports for this product to 'ignored' so they don't show up again
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    await Report.updateMany(
      { productId: report.productId, status: 'active' },
      { $set: { status: 'ignored' } }
    );

    res.json({ message: 'Report ignored' });
  } catch (error) {
    console.error('Error ignoring report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
