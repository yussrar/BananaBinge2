import React from 'react';
import { useLocation } from 'react-router-dom';
import './Details.css';

function Details() {
  const location = useLocation();
  const showDetails = location.state.showDetails;

  return (
    <div>
      <h1>Details</h1>
      <div className="main">
        <div className="detailsbox">
          <h1>{showDetails.movieDB.name}</h1>
          <img
            src={`http://image.tmdb.org/t/p/w500${showDetails.movieDB.backdrop_path}`}
            alt={showDetails.movieDB.name}
          />
          <p>Overview: {showDetails.movieDB.overview}</p>
          <div className="info">
            <div className="genres">
              <h2>Genres:</h2>
              <ul>
                {showDetails.movieDB.genres.map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div className="deets">
              <h2>Details:</h2>
              <p>Last Episode Air Date: {showDetails.movieDB.last_episode_to_air.air_date}</p>
              <p>Number of Episodes: {showDetails.movieDB.number_of_episodes}</p>
              <p>Number of Seasons: {showDetails.movieDB.number_of_seasons}</p>
              <p>First Air Date: {showDetails.movieDB.first_air_date}</p>
              <p>Last Air Date: {showDetails.movieDB.last_air_date}</p>
              <p>Popularity: {showDetails.movieDB.popularity}</p>
              <p>Status: {showDetails.movieDB.status}</p>
              <p>Tagline: {showDetails.movieDB.tagline}</p>
              <a href={showDetails.movieDB.homepage} rel="noopener noreferrer">
                {showDetails.movieDB.homepage}
              </a>
            </div>
          </div>
          <h2>Seasons:</h2>
          <ul>
            {showDetails.movieDB.seasons.map((season, index) => (
              <li key={index}>
                <h3>{season.name}</h3>
                <p>Season Overview: {season.overview}</p>
                <p>Air Date: {season.air_date}</p>
                <p>Number of Episodes: {season.episode_count}</p>
                <p>Vote Average: {season.vote_average}</p>
                <img
                  src={`http://image.tmdb.org/t/p/w500${season.poster_path}`}
                  alt={showDetails.movieDB.name}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="video-container">
          <h2>Trailers</h2>
          {showDetails.youtube && showDetails.youtube.items && showDetails.youtube.items.length > 0 ? (
            showDetails.youtube.items.map((video, index) => (
              <iframe
                key={index}
                className="frame"
                title={`Video ${index + 1}`} 
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ))
          ) : (
            <p>No trailers available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
