import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="nav-home">
          Stock Watch List
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/watchlist" className="nav-link">
          Watch List
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
