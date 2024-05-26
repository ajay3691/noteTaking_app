import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const NoteList = ({ notes, onEdit, onDelete }) => {
    return (
        <div className="note-list">
            {notes.length === 0 ? (
                <p>No notes available. Please add some notes.</p>
            ) : (
                notes.map((note) => (
                    <div className="note-item" key={note.id}>
                        <center>
                            <h3 className='text-success'>{note.title}</h3>
                        </center>
                        <p>{note.content}</p>
                        <div className="note-item-actions">
                            <button className='text-warning' onClick={() => onEdit(note.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>

                            <button className='text-danger' onClick={() => onDelete(note.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NoteList;
