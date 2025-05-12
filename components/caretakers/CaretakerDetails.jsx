import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCaretakerById, getCatsForCaretaker } from '../services/CaretakerService';
import './CaretakerDetails.css';

export const CaretakerDetails = () => {
  const { id } = useParams();  
  const [caretaker, setCaretaker] = useState(null);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCaretakerById(id).then((data) => {
      setCaretaker(data);
    });

    getCatsForCaretaker(id).then((catData) => {
      const fullCats = catData.map(entry => entry.cat);
      setCats(fullCats);
    });
  }, [id]);

  if (!caretaker) return <div>Loading...</div>;

  return (
    <div className="caretaker-details-container">
      <h2>Caretaker Details</h2>

      <img src={caretaker.url} alt={`A photo of ${caretaker.name}`} className="caretaker-image" />
      <div className="caretaker-info">
        <p><strong>ID:</strong> {caretaker.id}</p>
        <p><strong>Name:</strong> {caretaker.name}</p>
        <p><strong>Zip Code:</strong> {caretaker.zipCode}</p>
        <p><strong>Streets Served:</strong> {caretaker.streetsServed || "Not listed"}</p>
        <p><strong>Phone Number:</strong> {caretaker.phoneNumber || "Not listed"}</p>
        <p><strong>Special Skills:</strong> {caretaker.specialSkills || "None listed"}</p>
        <p><strong>Lead Caretaker:</strong> {caretaker.isLeadCaretaker ? "Yes" : "No"}</p>

        {cats.length > 0 ? (
          <div className="caretaker-cats">
            <h3>Currently caring for:</h3>
            <p>
              {cats.map((cat, index) => (
                <span key={cat.id}>
                  <Link to={`/cat-details/${cat.id}`}><strong>{cat.name}</strong></Link>
                  {index < cats.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        ) : (
          <p>This caretaker is currently not caring for any cats.</p>
        )}
      </div>

      <Link to="/caretaker-list" className="back-to-caretaker-list-button">
        Back to Caretaker List
      </Link>
    </div>
  );
};