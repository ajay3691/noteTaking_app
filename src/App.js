import React, { useState, useEffect, useRef } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);

    updateCategories(savedNotes);
  }, []);

  const saveNotesToLocalStorage = (newNotes) => {
    localStorage.setItem('notes', JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const updateCategories = (newNotes) => {
    const uniqueCategories = [
      ...new Set(newNotes.map((note) => note.category)),
    ];
    setCategories(uniqueCategories);
    localStorage.setItem('categories', JSON.stringify(uniqueCategories));
  };

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    saveNotesToLocalStorage(updatedNotes);
    updateCategories(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotesToLocalStorage(updatedNotes);
    updateCategories(updatedNotes);
  };

  const editNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    saveNotesToLocalStorage(updatedNotes);
    updateCategories(updatedNotes);
    setIsEditing(false);
    setCurrentNote(null);
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit);
    
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    setIsEditing(true);
    setIsFormVisible(true);
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === '' || note.category === selectedCategory)
  );

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setCurrentNote(null);
    setIsEditing(false);
  };
  
  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <button className="btn btn-warning" onClick={toggleFormVisibility}>
        {isFormVisible ? 'Close' : 'Add Note'}
      </button>
      {isFormVisible || isEditing ? (
        <NoteForm
          ref={formRef} 
          addNote={addNote}
          editNote={editNote}
          currentNote={currentNote}
          isEditing={isEditing}
          existingNotes={notes}
        />
      ) : (
        <NoteList
          notes={filteredNotes}
          onEdit={handleEdit}
          onDelete={deleteNote}
        />
      )}
    </div>
  );
  
  
};

export default App;
