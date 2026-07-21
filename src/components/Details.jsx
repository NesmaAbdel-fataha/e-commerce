import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { fetchMovieById } from "../features/moviesSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../contexts/languageHooks";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.movies.details);
  const moviesStatus = useSelector((state) => state.movies.status);
  const { language } = useLanguage();

  useEffect(() => {
    if (id) dispatch(fetchMovieById({ id, language }));
  }, [dispatch, id, language]);

  if (moviesStatus === "loading" && !movie) {
    return (
      <div className="details-loading">
        <div className="details-loading__backdrop" />
        <div className="details-loading__content">
          <div className="details-loading__poster" />
          <div className="details-loading__info">
            <div className="details-loading__title" />
            <div className="details-loading__text" />
            <div className="details-loading__text" />
            <div className="details-loading__text" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const genres = movie.genres || [];
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <div className="details-page">
      {backdropUrl && (
        <div className="details-backdrop">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="details-backdrop__image"
          />
          <div className="details-backdrop__gradient" />
        </div>
      )}

      <div className="details-content">
        {posterUrl && (
          <div className="details-poster">
            <img src={posterUrl} alt={movie.title} />
          </div>
        )}

        <div className="details-info">
          <h1 className="details-title">{movie.title}</h1>

          <div className="details-meta">
            {year && (
              <span className="details-meta-item">
                <span>📅</span>
                <span>{year}</span>
              </span>
            )}
            {movie.runtime && (
              <>
                <span className="details-meta-dot" />
                <span className="details-meta-item">
                  <span>⏱</span>
                  <span>{movie.runtime} min</span>
                </span>
              </>
            )}
            {movie.release_date && (
              <>
                <span className="details-meta-dot" />
                <span className="details-meta-item">
                  <span>🗓</span>
                  <span>{movie.release_date}</span>
                </span>
              </>
            )}
            {rating && (
              <>
                <span className="details-meta-dot" />
                <span className="details-rating">★ {rating}</span>
              </>
            )}
          </div>

          {genres.length > 0 && (
            <div className="details-genres">
              {genres.map((genre) => (
                <span key={genre.id} className="details-genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="details-overview">{movie.overview}</p>

          <div className="details-actions">
            <button
              className="details-back-btn"
              onClick={() => navigate("/movies")}
            >
              ← Back to Movies
            </button>
            <button
              className="details-fav-btn"
              onClick={() => {
                dispatch(toggleFavorite(movie));
                toast.success("Toggled favorite");
              }}
              aria-label="Toggle favorite"
            >
              ♥ Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;


