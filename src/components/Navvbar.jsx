import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/languageHooks";


function Navvbar() {
  const favoriteCount = useSelector((state) => state.favorites.items.length);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-danger" : "text-dark"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? "text-danger" : "text-dark"
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "text-danger" : "text-dark"
              }
            >
              Favorites
            </NavLink>

            {!isAuthenticated ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-danger" : "text-dark"
                }
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                  navigate("/movies");
                }}
                className={({ isActive }) =>
                  isActive ? "text-danger" : "text-dark"
                }
              >
                Logout
              </NavLink>
            )}
          </Nav>

          <div className="d-flex align-items-center gap-3 navbar-actions">
            <select
              className="form-select"
              style={{ width: 140 }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en-US">EN</option>
              <option value="tr-TR">TR</option>
              <option value="fr-FR">FR</option>
            </select>

            <span className="ms-auto navbar-favorites">
              Favorites: <strong>{favoriteCount}</strong>
            </span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navvbar;


