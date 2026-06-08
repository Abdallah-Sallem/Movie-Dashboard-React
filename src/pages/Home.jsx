import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return
    if (loading) return

    setLoading(true)
    try {
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults)
        setError(null)
    } catch (err) {
        console.log(err)
        setError("Failed to search movies...")
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="home">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Curated movie tracker</span>
          <h1>Discover what to watch next.</h1>
          <p>
            Search trending titles, save favorites, and browse a clean cinematic
            library that works even before your API key is configured.
          </p>
        </div>
        <div className="hero-stats">
          <div>
            <strong>{movies.length}</strong>
            <span>titles loaded</span>
          </div>
          <div>
            <strong>1 click</strong>
            <span>to favorite</span>
          </div>
        </div>
      </section>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-shell">
          <div className="loading">Loading movies...</div>
        </div>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="empty-results">
              <h2>No matches yet</h2>
              <p>
                Try a different search term or configure your TMDB API key to
                pull live popular titles.
              </p>
            </div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
