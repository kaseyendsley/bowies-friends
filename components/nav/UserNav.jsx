import { Link, useNavigate } from 'react-router-dom';
import './UserNav.css';

export const UserNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bowie_user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/getting-started" className="navbar-link">Getting Started</Link>
        </li>
        <li className="navbar-item">
          <Link to="/cat-list" className="navbar-link">Community Cats</Link>
        </li>
        <li className="navbar-item">
          <Link to="/caretaker-list" className="navbar-link">Caretakers</Link> 
        </li>
        <li className="navbar-item">
          <Link to="/resources" className="navbar-link">Resources</Link> 
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">About</Link> 
        </li>
        <li className="navbar-item">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
};
