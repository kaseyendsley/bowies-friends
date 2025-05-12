import { useEffect, useState } from "react";
import { getAllCaretakers } from "../services/CaretakerService.jsx";
import "./CaretakerList.css";
import { Link } from "react-router-dom";

export const CaretakerList = () => {
  const [allCaretakers, setAllCaretakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllCaretakers().then((caretakerArray) => {
      setAllCaretakers(caretakerArray);
    });
  }, []);

  const filteredCaretakers = allCaretakers.filter((caretaker) => {
    const combinedInfo = `
      ${caretaker.name}
      ${caretaker.zipCode}
      ${caretaker.streetsServed}
      ${caretaker.phoneNumber}
      ${caretaker.specialSkills}
      ${caretaker.isLeadCaretaker ? "lead" : ""}
    `.toLowerCase();

    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    if (searchWords.length === 0) return true;
    return searchWords.some((word) => combinedInfo.includes(word));
  });

  return (
    <div className="caretakers-container">
      <h2>Community Caretaker List</h2>
      <input
        type="text"
        placeholder="Search by Name, ZipCode, Served Streets, Special Skills, etc"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="caretaker-search-bar"
      />

<article className="caretakers-list">
      {filteredCaretakers.map((caretaker) => (
        <Link 
          key={caretaker.id} 
          to={`/caretaker-details/${caretaker.id}`} 
          className="caretaker-card-link"
        >
          <section className="caretaker-card">
            <h4>Caretaker ID# {caretaker.id}</h4>
            <h4>{caretaker.name}</h4>
            <p>Lead Caretaker: {caretaker.isLeadCaretaker ? "Yes" : "No"}</p>
            <div className="caretaker-image">
              <img
                src={caretaker.url || null}
                alt={`Photo of ${caretaker.name}`}
              />
            </div>
          </section>
        </Link>
      ))}
    </article>
  </div>
)
}