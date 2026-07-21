
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { fetchPopularMovies } from "../features/moviesSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "../contexts/languageHooks";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__title" />
        <div className="skeleton-card__text" />
        <div className="skeleton-card__text" />
      </div>
    </div>
  );
}

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

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          placeholder="Search movies..."
          className="movie-search"
          onChange={(e) => setSearchParams({ q: e.target.value })}
        />
      </div>

      <div className="movie-grid">
        {moviesStatus === "loading" ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : baseMovies.length > 0 ? (
          paginatedMovies.map((movie) => (
            <article
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <div className="movie-card__image-wrap">
                {movie.vote_average && (
                  <span className="movie-card__rating-badge">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                )}
                {movie.release_date && (
                  <span className="movie-card__year">
                    {movie.release_date.slice(0, 4)}
                  </span>
                )}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card__image"
                />
                <div className="movie-card__overlay" />
                <button
                  className="movie-card__favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(movie));
                    toast.success("Toggled favorite");
                  }}
                  aria-label="Toggle favorite"
                >
                  ♥
                </button>
              </div>
              <div className="movie-card__body">
                <h2 className="movie-card__title">{movie.title}</h2>
                <div className="movie-card__meta">
                  {movie.release_date && (
                    <>
                      <span>{movie.release_date.slice(0, 4)}</span>
                      <span className="movie-card__meta-dot" />
                    </>
                  )}
                  <span>Movie</span>
                </div>
                <p className="movie-card__description">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </article>
          ))
        ) : moviesStatus === "failed" ? (
          <div className="movie-state">
            <div className="movie-state__icon">⚠️</div>
            <h3 className="movie-state__title">Something went wrong</h3>
            <p className="movie-state__text">
              Failed to load movies. Please check your connection and try again.
            </p>
          </div>
        ) : (
          <div className="movie-state">
            <div className="movie-state__icon">🎬</div>
            <h3 className="movie-state__title">No movies available</h3>
            <p className="movie-state__text">
              There are no movies to display right now.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="movie-pagination">
          <button
            className="page-btn"
            onClick={() =>
              setSearchParams({
                q: query,
                page: Math.max(1, page - 1).toString(),
              })
            }
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span className="movie-pagination__label">
            Page {page} of {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() =>
              setSearchParams({
                q: query,
                page: Math.min(totalPages, page + 1).toString(),
              })
            }
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Movie;
