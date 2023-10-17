import React, { useEffect, useState } from 'react';
import './Cards.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cards() {
  const navigate = useNavigate();


  const [tvShows, setTvShows] = useState([]);

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



  useEffect(() => {
    async function fetchTrendingTVShows() {
      try {
        const response = await axios.get('https://cap-project-server.vercel.app/api/trendingTVShows');
        const data = response.data;
        setTvShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTrendingTVShows();
  }, []);

  return (
    <div>
      <h1>Popular Today</h1>
      <div className="movie-cards">
        {tvShows.map((tvShow) => (
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
  );
}

export default Cards;
