import { Link } from 'react-router-dom';
import './UserNav.css';

export const UserNav = () => {
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
          <Link to="/cat-list" className="navbar-link">Cat List</Link>
        </li>
        <li className="navbar-item">
          <Link to="/caretaker-list" className="navbar-link">Caretaker List</Link> 
        </li>
        <li className="navbar-item">
          <Link to="/resources" className="navbar-link">Resources</Link> 
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">About</Link> 
        </li>
      </ul>
    </nav>
  );
};
