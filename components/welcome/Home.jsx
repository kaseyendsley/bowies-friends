import { Link } from 'react-router-dom';
import './Home.css'; 

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-logo">
      <img src="/assets/bowielogo.png" alt="Bowie's Friends Logo" />
      </div>

      <p className="home-subtitle">An application for Community Cats and the Caretakers who love them!</p>
      <p className="home-info">
        New here? Please start by reading our{" "}
        <Link to="/getting-started" className="home-link">Getting Started</Link> page.
      </p>
    </div>
  );
};
