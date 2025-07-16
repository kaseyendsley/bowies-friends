import { Link } from 'react-router-dom';
import './GettingStarted.css';

export const GettingStarted = () => {
  return (
    <div className="getting-started-container">
      <h1 className="getting-started-title">So... first time?</h1>
      <p>
       Welcome to Bowie's Friends!  This application is dedicated to helping caretakers care for community cats by providing a comprehensive database
       of community cats and the caretakers they share their neighborhood with.  Whether you're curious and 
       want to learn more about your feline neighbors, have a single cat you feed on occasion, or want to take a 
       bigger role in your community, we're glad you're here!  
       <br />
       <br/>
      </p>
      <p>
      Our <Link to="/cat-list" className="cats-link">List of Community Cats </Link> and <Link to="/caretaker-list">List of Caretakers</Link> are simple to navigate via the search bar
      at the top of their pages.  If you're checking to see if a community cat is already logged, make sure to search by every parameter
      you can think of before logging it as "new" in our database: search by color, any special markings, the zip code and any streets you've seen it on.
      Chances are, someone else has already seen it and may be caring for it! You can see who has selected each cat in our database as being under their care by clicking
      on the cat's profile.  You can also reach out
      to the caretaker(s) each cat has - they may need additional help with that cat or others in their care.
      </p>
      <p>If you're certain that you've found a new cat, you can add it to our database by clicking the link found at the top of
        our <strong>List of Community Cats.</strong>  We put it there on purpose to ensure that users are first directed to, and thoughtfully checking,
        our database.  Duplicate entries can confuse users and lead to undocumented care or missing information - we don't want that!
      </p>
      <p>
        Make sure to go back and update the details for each cat you have added as time goes on!  Are they becoming more friendly?  Did you manage to book them a veterinary
        appointment? Add notes to the cat so that others can follow in their progress.  Helpful, up to date information can even help them get fostered or adopted!
      </p>
      <p>
        Don't forget to visit the <Link to="/resources"> Resources Page</Link> for helpful information on caring for community cats as well as links to local resources that can help, such
        as trap/neuter/return programs that often provide free or reduced veterinary care for community cats. 
      </p>
    </div>
  );
};
