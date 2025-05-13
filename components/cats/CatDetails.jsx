import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCatById, deleteCat } from "../services/CatService";
import { useNavigate } from "react-router-dom";
import "./CatDetails.css";

export const CatDetails = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("bowie_user"));
  const navigate = useNavigate();

  useEffect(() => {
    getCatById(id).then((catData) => {
      setCat(catData);
    });
  }, [id]);

  if (!cat) return <div>Loading...</div>;

  const handleDelete = async (catId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cat?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCat(catId);
      navigate("/cat-list"); // redirect after delete
    } catch (error) {
      console.error("Error deleting cat:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const friendlyMessage = cat.friendly
    ? "This cat is known to be friendly!"
    : "Not friendly - use caution! Experienced caretakers recommended.";

  return (
    <div className="cat-details-container">
      <h2>Cat Details</h2>
      <img
        src={cat.url || null}
        alt={`A photo of ${cat.name}`}
        className="cat-image"
      />
      <div className="cat-info">
        <p>
          <strong>Cat ID:</strong> {cat.id}
        </p>
        <p>
          <strong>Name:</strong> {cat.name}
        </p>
        <p>
          <strong>Color:</strong> {cat.color?.color || "Unknown"}
        </p>
        <p>
          <strong>Sex:</strong> {cat.sex?.sex || "Unknown"}
        </p>
        <p>
          <strong>Age:</strong> {cat.age || "Unknown"} years
        </p>
        <p>
          <strong>Special Markings:</strong> {cat.specialMarkings || "None"}
        </p>
        <p>
          <strong>Zip Code:</strong> {cat.zipCode}
        </p>
        <p>
          <strong>Friendly?:</strong> {friendlyMessage}
        </p>
        <p>
          <strong>Known Streets:</strong> {cat.knownStreets || "None"}
        </p>
        <p>
          <strong>Notes:</strong> {cat.notes || "No additional notes"}
        </p>

        {currentUser?.id === cat.createdByUserId && (
          <div className="edit-delete-buttons">
            <Link to={`/cat-edit/${cat.id}`} className="cat-edit-button">
              Edit Cat
            </Link>
            <button
              className="cat-delete-button"
              onClick={() => handleDelete(cat.id)}
            >
              Delete Cat
            </button>
          </div>
        )}
      </div>

      <Link to="/cat-list" className="back-to-cat-list-button">
        Back to Cat List
      </Link>
    </div>
  );
};
