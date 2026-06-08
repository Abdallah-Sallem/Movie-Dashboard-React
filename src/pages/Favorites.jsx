import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <span className="eyebrow">Favorites</span>
      <h2>No saved movies yet</h2>
      <p>
        Tap the heart on any card to build your watchlist. Your picks will show
        up here.
      </p>
    </div>
  );
}

export default Favorites;
