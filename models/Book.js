import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Book', bookSchema);