import "../css/Moviecard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useState, useEffect } from "react";
import { getMovieDetails } from "../services/api";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const favorite = isFavorite(movie.imdbID);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getMovieDetails(movie.imdbID);
      setMovieDetails(details);
    };
    fetchDetails();
  }, [movie.imdbID]);

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.imdbID);
    else addToFavorites(movie);
  }

  return (
    <div 
      className={`movie-card ${isFlipped ? 'flipped' : ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          <div className="movie-poster">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
            />
            <div className="movie-overlay">
              <button
                className={`favorite-btn ${favorite ? "active" : ""}`}
                onClick={onFavoriteClick}
              >
                ♥
              </button>
            </div>
          </div>
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="card-back">
          <div className="movie-details">
            <h3>{movie.Title}</h3>
            <div className="details-content">
              {movieDetails ? (
                <>
                  <div className="rating">
                    <span className="imdb-rating">⭐ {movieDetails.imdbRating || 'N/A'}</span>
                    <span className="runtime">{movieDetails.Runtime || 'N/A'}</span>
                  </div>
                  <div className="genre">{movieDetails.Genre || 'N/A'}</div>
                  <div className="plot">
                    {movieDetails.Plot && movieDetails.Plot !== 'N/A' 
                      ? movieDetails.Plot 
                      : 'No plot available for this movie.'}
                  </div>
                  <div className="cast">
                    <strong>Cast:</strong> {movieDetails.Actors || 'N/A'}
                  </div>
                  <div className="director">
                    <strong>Director:</strong> {movieDetails.Director || 'N/A'}
                  </div>
                </>
              ) : (
                <div className="loading-details">Loading details...</div>
              )}
            </div>
            <button
              className={`favorite-btn-back ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              {favorite ? '❤️ Remove' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;