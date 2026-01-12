const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}&type=movie`
  );
  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search;
};

// Get movie details by ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=short`
    );
    const data = await response.json();
    return data.Response === "True" ? data : null;
  } catch (error) {
    console.log('Error fetching movie details:', error);
    return null;
  }
};

// Get multiple categories of popular movies
export const getPopularMovies = async () => {
  const categories = [
    'marvel', 'batman', 'star wars', 'harry potter', 'lord of the rings',
    'fast furious', 'mission impossible', 'james bond', 'transformers', 'jurassic'
  ];
  
  const allMovies = [];
  
  for (const category of categories.slice(0, 3)) { // Limit to 3 categories to avoid rate limiting
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${category}&type=movie`
      );
      const data = await response.json();
      
      if (data.Response === "True" && data.Search) {
        allMovies.push(...data.Search.slice(0, 3)); // Take 3 movies from each category
      }
    } catch (error) {
      console.log(`Error fetching ${category}:`, error);
    }
  }
  
  // Remove duplicates based on imdbID
  const uniqueMovies = allMovies.filter((movie, index, self) => 
    index === self.findIndex(m => m.imdbID === movie.imdbID)
  );
  
  return uniqueMovies;
};

// Get trending movies by year
export const getTrendingMovies = async () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  const allMovies = [];
  
  for (const year of years) {
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=movie&y=${year}&type=movie`
      );
      const data = await response.json();
      
      if (data.Response === "True" && data.Search) {
        allMovies.push(...data.Search.slice(0, 5));
      }
    } catch (error) {
      console.log(`Error fetching ${year} movies:`, error);
    }
  }
  
  return allMovies;
};
