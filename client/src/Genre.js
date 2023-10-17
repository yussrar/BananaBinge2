import React, { useState, useEffect } from 'react';
import './Genre.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Genre() {
  const [parts, setGenres] = useState();

  const navigate = useNavigate();


  //sending to server
  const handleGenreClick = async (genreId, genreName) => {
    try {
      const response = await axios.post(`https://cap-project-server.vercel.app/api/selectedGenre/${genreId}`);
      const responseData = response.data;  

      navigate('/Lists', {
        state: {
          searchResults: responseData,
          query: genreName,
        },
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };








  
  

  // Use the useEffect hook to fetch genres when the component mounts
  useEffect(() => {
    async function fetchGenres() {
      try {

        const response = await axios.get('https://cap-project-server.vercel.app/api/genres'); // Assuming your server is running on the same domain
        const data =response.data
        setGenres(data);
        

      } catch (error) {
        console.error(error);
      }
    }

    fetchGenres();
  }, []);

  
  return (
    <div className="genre-filter">
      <h2>Search by Genre</h2>
      <div className="genre-buttons">
        {parts && parts.genres ? (
          parts.genres.map((genre) => ( 
            <button className='genre-button'
              key={genre.id}  
              onClick={() => handleGenreClick(genre.id, genre.name)}
          
              >
              {genre.name}
            </button>
          )
        ) ): (
          <p>Loading genres...</p>
        )}
      </div>
    </div>
  );
  


  
}

export default Genre;
