import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { User } from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit to prevent localStorage quota issues with base64
});

// POST sync user (find or create)
router.post('/sync', async (req, res) => {
  try {
    const { email, name, role, googleId, picture } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ 
        email, 
        name: name || email.split('@')[0], 
        role: role || 'buyer',
        googleId,
        avatarUrl: picture
      });
      await user.save();
    } else {
      let updated = false;
      if (googleId && !user.googleId) {
        user.googleId = googleId;
        updated = true;
      }
      if (picture && !user.avatarUrl) {
        user.avatarUrl = picture;
        updated = true;
      }
      if (updated) {
        await user.save();
      }
    }
    res.json(user);
  } catch (error) {
    console.error('Sync User Error:', error);
    res.status(500).json({ message: 'Failed to sync user' });
  }
});

// PUT update user profile
router.put('/:id', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If files were uploaded, add their URLs to updateData
    if (req.files) {
      if (req.files.avatar && req.files.avatar.length > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            const res = await cloudinary.uploader.upload(req.files.avatar[0].path, { folder: 'campusbazaar_users' });
            updateData.avatarUrl = res.secure_url;
          } catch (e) {
            console.error('Cloudinary upload error:', e);
            const fileData = fs.readFileSync(req.files.avatar[0].path);
            const base64Str = fileData.toString('base64');
            updateData.avatarUrl = `data:${req.files.avatar[0].mimetype};base64,${base64Str}`;
          }
        } else {
          const fileData = fs.readFileSync(req.files.avatar[0].path);
          const base64Str = fileData.toString('base64');
          updateData.avatarUrl = `data:${req.files.avatar[0].mimetype};base64,${base64Str}`;
        }
      }
      if (req.files.cover && req.files.cover.length > 0) {
        if (process.env.CLOUDINARY_CLOUD_NAME) {
          try {
            const res = await cloudinary.uploader.upload(req.files.cover[0].path, { folder: 'campusbazaar_users' });
            updateData.coverUrl = res.secure_url;
          } catch (e) {
            console.error('Cloudinary upload error:', e);
            const fileData = fs.readFileSync(req.files.cover[0].path);
            const base64Str = fileData.toString('base64');
            updateData.coverUrl = `data:${req.files.cover[0].mimetype};base64,${base64Str}`;
          }
        } else {
          const fileData = fs.readFileSync(req.files.cover[0].path);
          const base64Str = fileData.toString('base64');
          updateData.coverUrl = `data:${req.files.cover[0].mimetype};base64,${base64Str}`;
        }
      }
    }

    if (updateData.preferences && typeof updateData.preferences === 'string') {
      try {
        updateData.preferences = JSON.parse(updateData.preferences);
      } catch (e) {
        console.error('Failed to parse preferences');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;
