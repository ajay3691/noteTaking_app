import React, { useState, useEffect } from 'react';
const NoteForm = ({ addNote, editNote, currentNote, isEditing, existingNotes }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setContent(currentNote.content);
            setCategory(currentNote.category);
        } else {
            setTitle('');
            setContent('');
            setCategory('');
        }
    }, [currentNote]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!title.trim() || !content.trim() || !category.trim()) {
            setError('All fields are required.');
            return;
        }

        // Check for duplicate titles
        const isDuplicateTitle = existingNotes.some(
            (note) => note.title === title.trim() && note.id !== (currentNote ? currentNote.id : null)
        );

        if (isDuplicateTitle) {
            setError('Note with this title already exists.');
            return;
        }

        const newNote = {
            id: isEditing ? currentNote.id : Date.now(),
            title,
            content,
            category,
        };

        if (isEditing) {
            editNote(newNote);
        } else {
            addNote(newNote);
        }

        setTitle('');
        setContent('');
        setCategory('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <center>
                <button type="submit" className="note-form-button">
                    {isEditing ? 'Update' : 'Submit'} Note
                </button>
            </center>

        </form>
    );
};

export default NoteForm;
