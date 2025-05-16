import { Link } from 'react-router-dom';
import './Home.css'; // You can style this however you’ve styled CatList or CaretakerList

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Bowie's Friends 🐾</h1>
      <p className="home-subtitle">An application for Community Cats and the Caretakers who love them!</p>
      <p className="home-info">
        New here? Please start by reading our{" "}
        <Link to="/getting-started" className="home-link">Getting Started</Link> page.
      </p>
    </div>
  );
};
