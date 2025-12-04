import { useState } from 'react';
import React from 'react';
import "../css/SearchBar.css"

interface SearchBarProperties {
  onSearchChange: (searchTerm: string) => void;
}

export function SearchBar({ onSearchChange }: SearchBarProperties) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    onSearchChange(newTerm); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <form className="container-search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter keywords here . . ."
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search input"
      />
      <button type="submit">
        Search
      </button>
    </form>
  );
}