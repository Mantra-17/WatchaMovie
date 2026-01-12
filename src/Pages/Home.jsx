import MovieCard from "../Components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('popular');

  useEffect(() => {
    loadMovies('popular');
  }, []);

  const loadMovies = async (type) => {
    setLoading(true);
    try {
      let movieData;
      if (type === 'popular') {
        movieData = await getPopularMovies();
      } else if (type === 'trending') {
        movieData = await getTrendingMovies();
      }
      setMovies(movieData || []);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadMovies(tab);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults || []);
      setError(null);
      setActiveTab('search');
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Discover Amazing Movies</h1>
        <p>Find your next favorite movie from our vast collection</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </div>
        </form>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => handleTabChange('popular')}
        >
          Popular
        </button>
        <button 
          className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => handleTabChange('trending')}
        >
          Trending
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading amazing movies...</p>
        </div>
      ) : (
        <div className="movies-section">
          <h2>
            {activeTab === 'search' ? `Search Results for "${searchQuery}"` : 
             activeTab === 'popular' ? 'Popular Movies' : 'Trending Movies'}
          </h2>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))
            ) : (
              <div className="no-movies">
                <p>No movies found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;