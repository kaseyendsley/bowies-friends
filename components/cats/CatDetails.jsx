import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCatById } from '../services/CatService'; //
import './CatDetails.css'; 


export const CatDetails = () => {
  const { id } = useParams();  
  const [cat, setCat] = useState(null);

  useEffect(() => {
    getCatById(id).then((catData) => {
      setCat(catData);
    });
  }, [id]);

  if (!cat) return <div>Loading...</div>;


  const friendlyMessage = cat.friendly
    ? "This cat is known to be friendly!"
    : "Not friendly - use caution! Experienced caretakers recommended.";

  return (
    <div className="cat-details-container">
      <h2>Cat Details</h2>
      <img src={cat.url} alt={`A photo of ${cat.name}`} className="cat-image" />
      <div className="cat-info">
        <p><strong>Cat ID:</strong> {cat.id}</p>
        <p><strong>Name:</strong> {cat.name}</p>
        <p><strong>Color:</strong> {cat.color?.color || 'Unknown'}</p>
        <p><strong>Sex:</strong> {cat.sex?.sex || 'Unknown'}</p>
        <p><strong>Special Markings:</strong> {cat.specialMarkings || 'None'}</p>
        <p><strong>Zip Code:</strong> {cat.zipCode}</p>
        <p><strong>Friendly?</strong> {friendlyMessage}</p>
        <p><strong>Known Streets:</strong> {cat.knownStreets || 'None'}</p>
        <p><strong>Notes:</strong> {cat.notes || 'No additional notes'}</p>
      </div>
      <Link to="/cat-list" className="back-to-cat-list-button">Back to Cat List</Link>
    </div>
  );
};
