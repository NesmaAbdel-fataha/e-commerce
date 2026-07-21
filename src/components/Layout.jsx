import { useState, useEffect } from "react";
import Navvbar from "./Navvbar";
import { Outlet } from "react-router-dom";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

function AppLayout() {
  return (
    <>
      <Navvbar />
      <Outlet />
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-brand">MovieHub</span>
          <span className="footer-text">
            © {new Date().getFullYear()} MovieHub. All rights reserved.
          </span>
          <div className="footer-links">
            <a href="/movies" className="footer-link">Movies</a>
            <a href="/favorites" className="footer-link">Favorites</a>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </>
  );
}

export default AppLayout;

