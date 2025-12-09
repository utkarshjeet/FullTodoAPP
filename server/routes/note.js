import express from 'express';
import Note from '../models/Note.js';
import authMiddleware from '../middleware/middlleware.js';


const router = express.Router();

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const userId = req.user && (req.user.id || req.user._id);

    const newNote = new Note({
      title,
      description,
      UserId: userId,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ success: true, message: 'Note added successfully', note: savedNote });
  } catch (err) {
    console.error('Error in /api/notes/add:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    const notes = await Note.find({ UserId: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    console.error('Error in /api/notes:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default router;