import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';

const Home = ({ searchQuery = '' }) => {


      const [filteredNotes, setFilteredNotes] = useState([]);

      const [ismodal, setIsmodal] = useState(false);
      const [notes, setNotes] = useState([]);
      const [currentNoteId, setCurrentNoteId] = useState(null);
 
      const fetchNotes = async () => {
        try {
          const API_BASE = import.meta.env.VITE_API_URL || '';
          const url = API_BASE ? `${API_BASE}/api/notes` : '/api/notes';
          const token = localStorage.getItem('token') || '';
          const { data } = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotes(data.notes || []);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };

      useEffect(() => {
        fetchNotes();
      }, []);

      useEffect(() => {
        const normalizedQuery = (searchQuery || '').trim().toLowerCase();

        if (!normalizedQuery) {
          setFilteredNotes(notes);
          return;
        }

        const filtered = notes.filter((note) => {
          const title = (note?.title || '').toLowerCase();
          const description = (note?.description || '').toLowerCase();
          return title.includes(normalizedQuery) || description.includes(normalizedQuery);
        });

        setFilteredNotes(filtered);
      }, [searchQuery, notes]);


      const closeModal = () => {
        setIsmodal(false);
        setCurrentNoteId(null);
      }

      const onEdit = (note) => {
        setCurrentNoteId(note);
        setIsmodal(true);
      }




      const addNote = async (title, description) => {
        try {
          const API_BASE = import.meta.env.VITE_API_URL || '';
          const token = localStorage.getItem('token') || '';

          // when editing, hit update endpoint
          if (currentNoteId?._id) {
            const url = API_BASE ? `${API_BASE}/api/notes/${currentNoteId._id}` : `/api/notes/${currentNoteId._id}`;
            const response = await axios.put(
              url,
              { title, description },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response?.data?.success && response.data.note) {
              const updated = response.data.note;
              setNotes((prev) => prev.map((note) => (note._id === updated._id ? updated : note)));
              closeModal();
              return;
            }
          }

          // default: add new note
          const url = API_BASE ? `${API_BASE}/api/notes/add` : '/api/notes/add';
          const response = await axios.post(
            url,
            { title, description },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response?.data?.success) {
            const created = response.data.note;
            if (created) {
              setNotes((prev) => [created, ...prev]);
            } else {
              // fallback: re-fetch notes if server didn't return the created note
              await fetchNotes();
            }
            closeModal();
          }
        } catch (error) {
          console.error('Error saving note:', error);
        }
      }


      const deleteNote = async (noteId) => {
        try {
          const API_BASE = import.meta.env.VITE_API_URL || '';
          const token = localStorage.getItem('token') || '';
          const url = API_BASE ? `${API_BASE}/api/notes/${noteId}` : `/api/notes/${noteId}`;
          const response = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.success) {
            setNotes((prev) => prev.filter((note) => note._id !== noteId));
          }
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }



  return (
    <div className='bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen'>

      <header className="bg-white/60 backdrop-blur-md py-6 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Your Notes</h1>
            <p className="text-sm text-slate-500">Quickly save ideas, todos, and thoughts.</p>
          </div>
          <div className="text-sm text-slate-600">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</div>
        </div>
      </header>



     
      <button
        onClick={() => {
          setCurrentNoteId(null);
          setIsmodal(true);
        }}
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
      {ismodal && <NoteModal closeModal={closeModal} addNote={addNote} currentNoteId={currentNoteId} />}

      {/* Page content */}
      <main className="p-8">
        <div className="container mx-auto">
          {notes.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              <p className="text-lg">No notes yet — click the + button to add one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredNotes.length > 0 ? filteredNotes.map((note) => (
                <NoteCard key={note._id} note={note} onEdit={() => onEdit(note)} deleteNote={() => deleteNote(note._id)}/>
                )) : <p>No notes found</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home;