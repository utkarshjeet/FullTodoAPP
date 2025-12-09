import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const NoteCard = ({ note, onEdit }) => {
  const createdAt = note.createdAt ? new Date(note.createdAt).toLocaleDateString() : null
  return (
    <article className="w-full h-full p-5 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200 flex flex-col">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">{note.title}</h2>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{note.description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-slate-400">{createdAt}</div>
        <div className="flex items-center space-x-3">
          <button aria-label="Edit note" className="p-2 rounded-md text-sky-600 hover:bg-sky-50"
                  onClick={() => onEdit(note)}>
            <FaEdit size={16} />
          </button>
          <button aria-label="Delete note" className="p-2 rounded-md text-rose-600 hover:bg-rose-50">
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default NoteCard