
import { useEffect } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { fetchPopularMovies } from "../features/moviesSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../contexts/languageHooks";



const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseMovies = useSelector((state) => state.movies.list);
  const moviesStatus = useSelector((state) => state.movies.status);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const pageParam = searchParams.get("page") || "1";
  const page = parseInt(pageParam, 10);
  const pageSize = 5;

  const allMovies = query
    ? baseMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    : baseMovies;

  const totalPages = Math.ceil(allMovies.length / pageSize);
  const paginatedMovies = allMovies.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const { language } = useLanguage();

  useEffect(() => {
    dispatch(fetchPopularMovies({ language }));
  }, [dispatch, language]);



  useEffect(() => {
    if (baseMovies?.length) {
      if (query && allMovies.length === 0) {
        toast.info("No movies matched your search.");
      }
    }
  }, [query, allMovies.length, baseMovies?.length]);

  useEffect(() => {
    if (moviesStatus === "succeeded" && !baseMovies?.length) {
      toast.error("No movies available.");
    }
  }, [moviesStatus, baseMovies]);

  return (
    <div className="container movie-page">
      <div className="movie-page__header">
        <div>
          <h1 className="movie-page__title">Movies</h1>
          <p className="movie-page__subtitle">
            Discover your next favorite film in a polished gallery.
          </p>
        </div>
      </div>

      <input
        type="text"
        value={query}
        placeholder="Search movies..."
        className="form-control movie-search"
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />

      <div className="movie-grid">
        {moviesStatus === "loading" ? (
          <p className="movie-state">Loading...</p>
        ) : baseMovies.length > 0 ? (
          paginatedMovies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <div className="movie-card__image-wrap">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card__image"
                  onClick={() => navigate(`/movies/${movie.id}`)}
                />
              </div>

              <div className="movie-card__body">
                <div className="movie-card__top">
                  <h2 className="movie-card__title">{movie.title}</h2>
                  <button
                    className="movie-card__favorite"
                    onClick={() => {
                      dispatch(toggleFavorite(movie));
                      toast.success("Toggled favorite");
                    }}
                    aria-label="Toggle favorite"
                  >
                    ❤️
                  </button>
                </div>

                <p className="movie-card__description">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </article>
          ))
        ) : (
          <p className="movie-state">No movies available</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="movie-pagination">
          <button
            className="btn btn-secondary"
            onClick={() =>
              setSearchParams({
                q: query,
                page: Math.max(1, page - 1).toString(),
              })
            }
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="movie-pagination__label">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setSearchParams({
                q: query,
                page: Math.min(totalPages, page + 1).toString(),
              })
            }
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
