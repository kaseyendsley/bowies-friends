import { useEffect, useState } from "react";
import "./CatList.css";
import { getAllCats } from "../services/CatService.jsx";
import { Link } from "react-router-dom";

export const CatList = () => {
    const [allCats, setAllCats] = useState([]);

    useEffect(() => {
      getAllCats().then((catsArray) => {
        setAllCats(catsArray);
        console.log("Cats Set!");
      });
    }, []); // Runs only on initial render
  
    return (
      <div className="cats-container">
        <h2>Community Cats</h2>
        <article className="cats-list">
          {allCats.map((cat) => {
            const colorName = cat.color?.color || "unknown";
            const sexName = cat.sex?.sex || "unknown";
            
            return (
                <Link to={`/cat-details/${cat.id}`} key={cat.id} className="cat-card">
                    
                <section>
                <div>
                  <h3>Cat # {cat.id}</h3>
                  <h3>{cat.name}</h3>
                  <p>{colorName}</p>
                  <p>{sexName}</p>
                  <div className="cat-image">
                    <img
                      src={cat.url}
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
  