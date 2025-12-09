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

    await newNote.save();
    res.status(201).json({ success: true, message: 'Note added successfully' });
  } catch (err) {
    console.error('Error in /api/notes/add:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default router;