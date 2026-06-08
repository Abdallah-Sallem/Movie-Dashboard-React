const API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? "";
const BASE_URL = "https://api.themoviedb.org/3";

const fallbackMovies = [
  {
    id: 901,
    title: "Dune: Part Two",
    release_date: "2024-02-27",
    poster_path: null,
  },
  {
    id: 902,
    title: "Spider-Man: Across the Spider-Verse",
    release_date: "2023-06-02",
    poster_path: null,
  },
  {
    id: 903,
    title: "Oppenheimer",
    release_date: "2023-07-21",
    poster_path: null,
  },
  {
    id: 904,
    title: "The Batman",
    release_date: "2022-03-04",
    poster_path: null,
  },
  {
    id: 905,
    title: "Top Gun: Maverick",
    release_date: "2022-05-27",
    poster_path: null,
  },
  {
    id: 906,
    title: "Poor Things",
    release_date: "2023-12-08",
    poster_path: null,
  },
];

const normalizeMovies = (movies) => (Array.isArray(movies) ? movies : []);

const buildMovieUrl = (path, query) => {
  if (!API_KEY) return null;

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url;
};

const requestMovies = async (path, query) => {
  const url = buildMovieUrl(path, query);

  if (!url) {
    return fallbackMovies;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  const data = await response.json();
  return normalizeMovies(data.results);
};

export const getPopularMovies = async () => {
  return requestMovies("/movie/popular");
};

export const searchMovies = async (query) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  if (!API_KEY) {
    return fallbackMovies.filter((movie) =>
      movie.title.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
  }

  return requestMovies("/search/movie", { query: trimmedQuery });
};
