import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const name = email ? email.split("@")[0] : "Guest";

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">Welcome back, {name}</span>
          <h1 className="home-hero__title">A beautiful home for your movie journey</h1>
          <p className="home-hero__text">
            Explore curated releases, track favorites, and enjoy a modern responsive
            experience designed to feel fresh and effortless.
          </p>

          <div className="home-hero__actions">
            <Link to="/movies" className="home-button">
              Browse Movies
            </Link>
            <a href="#highlights" className="home-link">
              View highlights
            </a>
          </div>
        </div>

        <div className="home-hero__stats">
          <article className="home-stat-card">
            <strong>120+</strong>
            <span>Curated titles</span>
          </article>
          <article className="home-stat-card">
            <strong>Favorites</strong>
            <span>Save the films you love</span>
          </article>
          <article className="home-stat-card">
            <strong>Responsive</strong>
            <span>Looks great on every device</span>
          </article>
        </div>
      </section>

      <section className="home-highlights" id="highlights">
        <div className="home-highlights__intro">
          <p className="home-section-label">Features</p>
          <h2>Clean design, smart navigation, and modern card layouts</h2>
        </div>

        <div className="home-feature-grid">
          <article className="home-feature-card">
            <h3>Fast discovery</h3>
            <p>Search, filter, and preview movies with an intuitive interface.</p>
          </article>
          <article className="home-feature-card">
            <h3>Personal favorites</h3>
            <p>Save and revisit titles that matter to you with one click.</p>
          </article>
          <article className="home-feature-card">
            <h3>Modern experience</h3>
            <p>Enjoy polished visuals and responsive layout from mobile to desktop.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;