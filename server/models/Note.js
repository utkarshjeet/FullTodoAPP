import mongoose from "mongoose";
import User from "./user.js";

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    UserId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Note = mongoose.model("Note", NoteSchema);

export default Note;
