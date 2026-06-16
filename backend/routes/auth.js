import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = express.Router();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Account temporarily locked due to multiple failed attempts. Try again later.' });
    }

    // Verify password
    if (!user.password) {
      return res.status(401).json({ message: 'Please sign in with Google or reset your password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      // Increment login attempts
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = Date.now() + LOCK_TIME;
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset lock and attempts on success
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // In a real app we'd sign a JWT here. 
    // Returning the user object for the frontend to manage.
    res.json(user);
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (user) {
      // Generate mock reset token
      const resetToken = 'mock-reset-token-' + Date.now();
      
      // Since no email service is configured, we log it
      console.log(`\n==============================================`);
      console.log(`PASSWORD RESET REQUESTED FOR: ${email}`);
      console.log(`RESET LINK: http://localhost:5173/reset-password?token=${resetToken}`);
      console.log(`==============================================\n`);
    }

    // Always return success to prevent email enumeration
    res.json({ message: 'If that email is registered, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, mobile, password } = req.body;
    
    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: fullName,
      email,
      phone: mobile,
      password: hashedPassword,
      role: 'buyer' // Default role, user can choose later if needed
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
