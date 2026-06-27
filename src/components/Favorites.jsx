import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../features/favoritesSlice";
import Button from "react-bootstrap/Button";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items);

  if (!favorites?.length) {
    return (
      <div className="container my-4">
        <h1>Favorites</h1>
        <p>No favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h1>Favorites</h1>

      <div className="row">
        {favorites.map((movie) => (
          <div key={movie.id} className="col-md-4" style={{ marginBottom: 20 }}>
            <div className="card h-100">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/movies/${movie.id}`)}
                />
              ) : null}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {movie.overview ? movie.overview.slice(0, 120) + "..." : ""}
                </p>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => dispatch(toggleFavorite(movie))}
                    aria-label="Remove favorite"
                  >
                    ❤️
                  </Button>
                  <Button onClick={() => navigate(`/movies/${movie.id}`)}>Details</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

