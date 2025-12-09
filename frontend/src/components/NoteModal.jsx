import React, { useEffect, useState } from 'react'

const NoteModal = ({ closeModal, addNote, currentNoteId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentNoteId) {    
            setTitle(currentNoteId.title || '' );
            setDescription(currentNoteId.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [currentNoteId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (typeof addNote === 'function') {
                await addNote(title, description);
            } else {
                console.warn('addNote prop is not provided or not a function');
            }
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        if (closeModal) closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancel}></div>

            {/* Modal panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 transform transition-all duration-300 ease-out
                             ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">N</div>
                        <div>
                            <h2 className="text-2xl font-extrabold">{currentNoteId ? 'Edit Note' : 'Add New Note'}</h2>
                            <p className="text-sm text-slate-500">Capture your idea quickly — it’s saved to your notes.</p>
                        </div>
                    </div>
                    <button onClick={handleCancel} className="text-slate-500 hover:text-slate-700 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Note Title"
                        className="block w-full rounded-md border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Note Description"
                        rows={6}
                        className="block w-full rounded-md border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <div className="flex items-center justify-end gap-3">
                        <button onClick={handleCancel} className="px-4 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
                        <button type="submit" className="px-5 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-500 shadow-md hover:scale-[1.02] transform transition">{currentNoteId ? 'Edit Note' : 'Save Note'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NoteModal
