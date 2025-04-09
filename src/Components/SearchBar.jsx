import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-6 max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border border-purple-200 rounded-l-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-purple-800 placeholder-purple-400"
      />
      <button 
        type="submit" 
        className="bg-purple-600 text-white rounded-r-xl px-4 py-2 hover:bg-purple-700 transition-colors duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;