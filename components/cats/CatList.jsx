import { useEffect, useState } from "react";
import "./CatList.css";
import { getAllCats } from "../services/CatService.jsx";
import { Link } from "react-router-dom";

export const CatList = () => {
    const [allCats, setAllCats] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      getAllCats().then((catsArray) => {
        setAllCats(catsArray);
      });
    }, []);

    const filteredCats = allCats.filter((cat) => {
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

      if (searchWords.length === 0) {
        return true;
      }
    
      return searchWords.some((word) => combinedInfo.includes(word));
    });

    return (
      <div className="cats-container">
        <h2>Community Cat List</h2>
        <h5>PLEASE ensure to check our database thoroughly before adding a new cat to prevent duplicates!</h5>
      <h5>
        Sure you've found a new cat?{" "}
        <Link to="/cat-form">Click HERE to add it to our database!</Link>
      </h5>
        <input
          type="text"
          placeholder="Search cat by any combination of color, ear tip, sex, markings, street or ZipCode"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="cat-search-bar"
        />

        <article className="cats-list">
          {filteredCats.map((cat) => {
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
          })}
        </article>
      </div>
    );
};

