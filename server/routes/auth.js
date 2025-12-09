import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, passwordHash: hashedPassword });

        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;   
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }  
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }  
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }  
        
        const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });


        res.status(200).json({ success: true, message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }   
}); 


export default router;