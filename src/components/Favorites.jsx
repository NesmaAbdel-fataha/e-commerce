import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../features/favoritesSlice";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items);

  if (!favorites?.length) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="favorites-empty">
            <div className="favorites-empty__icon">🎥</div>
            <h2 className="favorites-empty__title">No favorites yet</h2>
            <p className="favorites-empty__text">
              Start exploring movies and add your favorites to see them here.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/movies")}
            >
              Browse Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1 className="favorites-title">My Favorites</h1>
          <p className="favorites-subtitle">
            {favorites.length} movie{favorites.length !== 1 ? "s" : ""} saved
          </p>
        </div>

        <div className="favorites-grid">
          {favorites.map((movie) => (
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
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-card__image"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "var(--bg-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      fontSize: "3rem",
                    }}
                  >
                    🎬
                  </div>
                )}
                <div className="movie-card__overlay" />
                <button
                  className="movie-card__favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavorite(movie));
                  }}
                  aria-label="Remove favorite"
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
                  {movie.overview
                    ? movie.overview.slice(0, 120) + "..."
                    : "No description available."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;

