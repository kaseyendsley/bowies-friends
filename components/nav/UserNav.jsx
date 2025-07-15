import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserNav.css';

export const UserNav = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bowie_user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
  <div className="navbar-logo">
    <Link to="/">
      <img src="/assets/bowielogo.png" alt="Bowie's Friends Logo" />
    </Link>
  </div>
  {isMobile && (
    <button className="hamburger" onClick={toggleMenu}>
      ☰
    </button>
  )}
</div>

      <ul className={`navbar-list ${isMobile ? "mobile" : ""} ${menuOpen ? "open" : ""}`}>
        {isMobile && (
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
        )}
        <li className="navbar-item">
          <Link to="/getting-started" className="navbar-link" onClick={() => setMenuOpen(false)}>Getting Started</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cat-list" className="navbar-link" onClick={() => setMenuOpen(false)}>Community Cats</Link>
        </li>
        <li className="navbar-item">
          <Link to="/caretaker-list" className="navbar-link" onClick={() => setMenuOpen(false)}>Caretakers</Link>
        </li>
        <li className="navbar-item">
          <Link to="/resources" className="navbar-link" onClick={() => setMenuOpen(false)}>Resources</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li className="navbar-item">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};
