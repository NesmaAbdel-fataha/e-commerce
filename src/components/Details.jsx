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



  if (moviesStatus === "loading" && !movie) return <p>Loading...</p>;
  if (!movie) return null;

  return (
    <div>
      <div className="container">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              dispatch(toggleFavorite(movie));
              toast.success("Toggled favorite");
            }}
            aria-label="Toggle favorite"
          >
            ❤️
          </button>

          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : null}
        </div>
      </div>

      <button
        className="btn btn-dark px-3"
        onClick={() => navigate("/movies")}
      >
        Back to Movies
      </button>
    </div>
  );
};

export default Details;


