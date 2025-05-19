import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getCatById,
  deleteCat,
  getCaretakerCats,
  addCaretakerCat,
  removeCaretakerCat,
  deleteCaretakerCatByCatId
} from "../services/CatService";

import "./CatDetails.css";

export const CatDetails = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [caretakerCats, setCaretakerCats] = useState([]);
  const [isCaringForCat, setIsCaringForCat] = useState(false);
  const [selectedCareStatus, setSelectedCareStatus] = useState(null);
  const navigate = useNavigate();

  const localBowieUser = localStorage.getItem("bowie_user");
  const bowieUserObject = localBowieUser ? JSON.parse(localBowieUser) : null;
  const currentCaretakerId = bowieUserObject?.id;

  useEffect(() => {
    getCatById(id).then((catData) => {
      setCat(catData);
    });
  }, [id]);

  useEffect(() => {
    getCaretakerCats().then((data) => {
      setCaretakerCats(data);
    });
  }, []);

  useEffect(() => {
    if (cat && caretakerCats.length > 0 && currentCaretakerId) {
      const relationshipExists = caretakerCats.some(
        (entry) =>
          entry.catId === cat.id && entry.caretakerId === currentCaretakerId
      );
      setIsCaringForCat(relationshipExists);
      setSelectedCareStatus(relationshipExists ? "yes" : "no");
    }
  }, [cat, caretakerCats, currentCaretakerId]);

  if (!cat) return <div>Loading...</div>;

  const handleDelete = async (catId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cat?"
    );
    if (!confirmDelete) return;

    try {
      await deleteCaretakerCatByCatId(catId); // delete any relationships before/while deleting cat
      await deleteCat(catId);
      navigate("/cat-list");
    } catch (error) {
      console.error("Error deleting cat:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const friendlyMessage = cat.friendly
    ? "This cat is known to be friendly!"
    : "Not friendly - use caution! Experienced caretakers recommended.";

  const handleCareStatusChange = (event) => {
    setSelectedCareStatus(event.target.value);
  };

  const handleSubmitCareStatus = async () => {
    if (!cat || !currentCaretakerId) return;

    try {
      if (selectedCareStatus === "yes" && !isCaringForCat) {
        await addCaretakerCat(currentCaretakerId, cat.id);
        setIsCaringForCat(true);
        alert("Cat added to your Care List!");
      } else if (selectedCareStatus === "no" && isCaringForCat) {
        await removeCaretakerCat(currentCaretakerId, cat.id);
        setIsCaringForCat(false);
        alert("Cat removed from your Care List.");
      } else {
        alert("This cat is already in your Care List.");
      }

      // refresh caretakerCats
      const updatedCaretakerCats = await getCaretakerCats();
      setCaretakerCats(updatedCaretakerCats);
    } catch (error) {
      console.error("Care status update failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

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
          <u>Cat ID:</u> {cat.id}
        </p>
        <p>
          <u>Name:</u> {cat.name}
        </p>
        <p>
          <u>Color:</u> {cat.color?.color || "Unknown"}
        </p>
        <p>
          <u>Sex:</u> {cat.sex?.sex || "Unknown"}
        </p>
        <p>
          <u>Age:</u> {cat.age || "Unknown"} years
        </p>
        <p>
          <u>Special Markings:</u> {cat.specialMarkings || "None"}
        </p>
        <p>
          <u>Zip Code:</u> {cat.zipCode}
        </p>
        <p>
          <u>Friendly?:</u> {friendlyMessage}
        </p>
        <p>
          <u>Known Streets:</u> {cat.knownStreets || "None"}
        </p>
        <p>
          <u>Notes:</u> {cat.notes || "No additional notes"}
        </p>
 < br />
         <div className="cat-caretakers">
          {caretakerCats.filter((entry) => entry.catId === cat.id).length > 0 ? (
            <>
              <h3>Current Caretakers:</h3>
              <p>
                {caretakerCats
                  .filter((entry) => entry.catId === cat.id)
                  .map((entry, index, filtered) => (
                    <span key={entry.id}>
                      <Link to={`/caretaker-details/${entry.caretakerId}`}>
                        <strong>{entry.caretaker.name}</strong>
                      </Link>
                      {index < filtered.length - 1 && ", "}
                    </span>
                  ))}
              </p>
            </>
          ) : (
            <p>This cat currently has no active caretakers.</p>
          )}
        </div>
< br />
        {bowieUserObject && (
          <div className="caretaker-toggle">
            <p>Are you currently taking care of this cat?</p>
            <label>
              Yes
              <input
                type="radio"
                name="careStatus"
                value="yes"
                checked={selectedCareStatus === "yes"}
                onChange={handleCareStatusChange}
              />
            </label>
            <label>
              No
              <input
                type="radio"
                name="careStatus"
                value="no"
                checked={selectedCareStatus === "no"}
                onChange={handleCareStatusChange}
              />
            </label>
            <br />
            <button
              className="caretaker-submit-button"
              onClick={handleSubmitCareStatus}
            >
              Update
            </button>
          </div>
        )}

        {bowieUserObject && currentCaretakerId === cat.createdByUserId && (
          <div className="edit-delete-buttons" style={{ marginTop: "1em" }}>
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
