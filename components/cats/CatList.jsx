import { useEffect, useState } from "react";
import { getAllCats } from "../services/CatService.jsx";
import { Link } from "react-router-dom";
import "./CatList.css"; 

export const CatList = () => {
  const [allCats, setAllCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 12;

  useEffect(() => {
    getAllCats().then((catsArray) => {
      setAllCats(catsArray);
      setFilteredCats(catsArray);
    });
  }, []);

  useEffect(() => {
    const filtered = allCats.filter((cat) => {
      const combinedInfo = `
        ${cat.name}
        ${cat.age}
        ${cat.color?.color}
        ${cat.sex?.sex}
        ${cat.specialMarkings}
        ${cat.zipCode}
        ${cat.notes}
        ${cat.knownStreets}
      `.toLowerCase();

      const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);

      if (searchWords.length === 0) return true;
      return searchWords.some((word) => combinedInfo.includes(word));
    });

    setFilteredCats(filtered);
    setCurrentPage(1);
  }, [searchTerm, allCats]);

  // Pagination logic
  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = filteredCats.slice(indexOfFirstCat, indexOfLastCat);
  const totalPages = Math.ceil(filteredCats.length / catsPerPage);

  return (
    <div className="cats-container">
      <h2>Community Cats</h2>
      <h5>Make sure to check our database thoroughly before adding a new cat to prevent duplicates!</h5>
      <h5>
        Sure you've found a new cat?{" "}
        <Link to="/cat-form">Click HERE to add it to our database!</Link>
      </h5>

      <input
        type="text"
        placeholder="Search Cats by any combination of Color, Markings, Zip Code, Street, etc"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="cat-search-bar"
      />

      <article className="cats-list">
        {filteredCats.length === 0 ? (
          <p>No cats match your search.</p>
        ) : (
          currentCats.map((cat) => {
            const colorName = cat.color?.color || "unknown";
            const sexName = cat.sex?.sex || "unknown";

            return (
              <Link to={`/cat-details/${cat.id}`} key={cat.id} className="cat-card">
                <section>
                  <div>
                    <h4>Cat ID# {cat.id}</h4>
                    <h4>{cat.name}</h4>
                    <p>{colorName}</p>
                    <p>{sexName}</p>
                    <div className="cat-image">
                      <img
                        src={cat.url || null}
                        alt={`An image of a ${colorName} cat`}
                      />
                    </div>
                  </div>
                </section>
              </Link>
            );
          })
        )}
      </article>

      <div className="pagination-controls">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
