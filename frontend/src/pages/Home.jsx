import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoteModal from '../components/NoteModal';

const Home = () => {

      const [ismodal, setIsmodal] = React.useState(false);
      const [notes, setNotes] = React.useState([]);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchNotes = async () => {
          try {
            cosnt { data } = await axios.get('/api/notes', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,



      const closeModal = () => {
        setIsmodal(false);
      }

      const addNote = async (title, description) => {
        try {
          const API_BASE = import.meta.env.VITE_API_URL || '';
          const url = API_BASE ? `${API_BASE}/api/notes/add` : '/api/notes/add';
          const response = await axios.post(
            url,
            { title, description },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
              },
            }
          );

          if (response?.data?.success) {
            closeModal();
          }
        } catch (error) {
          console.error('Error saving note:', error);
        }
      }


  return (
    <div className='bg-gray-50 min-h-screen'>

      {/* F loating+ button */}
      <button
        onClick={() => setIsmodal(true)}
        aria-label="Add note"
        className="fixed right-6 bottom-6 w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-3xl
                   bg-gradient-to-br from-teal-400 to-cyan-500 shadow-2xl ring-4 ring-teal-300/30
                   hover:scale-110 transform transition-all duration-300 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal mount */}
      {ismodal && <NoteModal closeModal={closeModal} 
      addNote={addNote}
      />}

      {/* Page content */}
      <main className="p-8">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Pad</h1>
        <p className="text-lg text-gray-600">Capture ideas quickly — click the + to add a note.</p>
      </main>
    </div>
  )
}

export default Home;