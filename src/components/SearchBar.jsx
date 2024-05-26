import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search notes..."
                onChange={(e) => onSearch(e.target.value)}
            />
            <span className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
            </span>
        </div>
    );
};

export default SearchBar;
