import React from 'react';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
