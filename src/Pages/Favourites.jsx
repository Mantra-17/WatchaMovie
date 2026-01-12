import "../css/Favourites.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../Components/MovieCard";

function Favourites() {
    const { favorites } = useMovieContext();

    if (favorites.length === 0) {
        return (
            <div className="favourites-empty">
                <h2>No Favourite movies yet</h2>
                <p>Start adding movies to your fav list</p>
            </div>
        );
    }

    return (
        <div className="favourites">
            <h2>Your Favourite Movies</h2>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.imdbID} />
                ))}
            </div>
        </div>
    );
}

export default Favourites