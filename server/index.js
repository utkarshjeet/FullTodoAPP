import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/note.js';

const app = express();
const PORT = 5000;

// Parse JSON bodies before routes
app.use(express.json());
app.use(cors());

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});


