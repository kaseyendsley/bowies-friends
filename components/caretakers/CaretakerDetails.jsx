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
        <p><u>ID:</u> {caretaker.id}</p>
        <p><u>Name:</u> {caretaker.name}</p>
        <p><u>Zip Code:</u> {caretaker.zipCode}</p>
        <p><u>Streets Served:</u> {caretaker.streetsServed || "Not listed"}</p>
        <p><u>Phone Number:</u> {caretaker.phoneNumber || "Not listed"}</p>
        <p><u>Special Skills:</u> {caretaker.specialSkills || "None listed"}</p>
        <p><u>Lead Caretaker:</u> {caretaker.isLeadCaretaker ? "Yes" : "No"}</p>
< br />
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
          <div className="caretaker-cats">
          <p>This caretaker is currently not caring for any cats.</p>
          </div>
        )}
      </div>

      <Link to="/caretaker-list" className="back-to-caretaker-list-button">
        Back to Caretaker List
      </Link>
    </div>
  );
};