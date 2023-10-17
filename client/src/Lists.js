import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Lists() {

    const navigate = useNavigate();
    

    //handle click 

    const handleDetail = async (tvShowId, tvShowName) => {
        try {
      
          // Create a data object to send in the request body
          const data = {
            tvShowId: tvShowId,
            tvShowName: tvShowName,
          };
      
          const response = await axios.post('https://cap-project-server.vercel.app/api/showDetails', data);
          const responseData = response.data;
      
          
      
          // Access the data from The Movie DB API
          const movieDBData = responseData.movieDB;
      
          // Access the data from the YouTube API
          const youtubeData = responseData.youtube;
      
          // Now you have both sets of data and can navigate to the Details page with all the information.
          navigate('/Details', {
            state: {
              showDetails: {
                movieDB: movieDBData,
                youtube: youtubeData,
              },
            },
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    
    // Use the useLocation hook to access the location state
    const location = useLocation();
    const searchResults = location.state.searchResults;
    const searchQuery = location.state.query;

    return (
        <div>
            <div>
                <h1>Search Results for : {searchQuery}</h1>
                <div className="movie-cards">
                    {searchResults.map((tvShow) => (
                        <div key={tvShow.id}>
                            <img src={`http://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.title} />
                            <p>{tvShow.name}</p>
                            <p>{tvShow.overview}</p>
                            <p>Rating: {tvShow.vote_average}</p>
                            <p>Release Year: {tvShow.first_air_date.split('-')[0]}</p>
                            <button className="det-button" 
                            onClick={() => handleDetail(tvShow.id, tvShow.name)}>
                            View More</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Lists;

