import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          StayFinder
        </Link>
        <nav className="nav-links">
          <Link
            to="/"
            className={
              location.pathname === "/" ? "active" : ""
            }
          >
            Explore Stays
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;