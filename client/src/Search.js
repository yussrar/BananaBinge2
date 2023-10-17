import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();


  const handleSearch = async () => {
    try {
      const response = await fetch(`https://cap-project-server.vercel.app/api/searchTVShows?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      

      navigate('/Lists', {
        state: {
          searchResults: data,
          query: searchQuery,
        },
      });

      // Pass the search results to your Lists component
      // Implement this part according to your component structure
    } catch (error) {
      console.error('Error searching for TV shows:', error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
