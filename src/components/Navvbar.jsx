import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/languageHooks";

function Navvbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const favoriteCount = useSelector((state) => state.favorites.items.length);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <span>MovieHub</span>
        </NavLink>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            Movies
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `navbar-link${isActive ? " active" : ""}`
            }
            onClick={closeMenu}
          >
            Favorites
          </NavLink>
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `navbar-link${isActive ? " active" : ""}`
              }
              onClick={closeMenu}
            >
              Login
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                logout();
                navigate("/movies");
              }}
            >
              Logout
            </NavLink>
          )}
        </div>

        <div className="navbar-right">
          <select
            className="navbar-lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en-US">EN</option>
            <option value="tr-TR">TR</option>
            <option value="fr-FR">FR</option>
          </select>

          <NavLink to="/favorites" className="navbar-fav-badge" onClick={closeMenu}>
            <span>Favorites</span>
            <span className="navbar-fav-count">{favoriteCount}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navvbar;


