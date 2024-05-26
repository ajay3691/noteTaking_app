import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p><strong>Category:</strong> {note.category}</p>
      <button onClick={() => onEdit(note.id)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
