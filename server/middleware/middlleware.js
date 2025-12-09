import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;           
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
        const decoded = jwt.verify(token, jwtSecret);
        const user =            await User.findById(decoded.userId).select('-passwordHash');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }               
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }       
};

export default authMiddleware;