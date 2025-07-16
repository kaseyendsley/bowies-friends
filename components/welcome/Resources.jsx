import "./Resources.css";

export const Resources = () => {
  return (
    <div className="resources-container">
      <h1 className="resources-title">Want to learn more?</h1>
      <h4>Check out the links below! </h4>
      <br />
      <p>
        "I'm new here - <strong>what is TNR?</strong>"{" "}
        <a
          href="https://www.neighborhoodcats.org/how-to-tnr/getting-started/what-is-tnr"
          target="_blank"
        >
          Find out!
        </a>
      </p>

      <p>
      Need some <strong> help figuring out the basics?</strong>{" "}
        <a
          href="https://www.alleycat.org/resources/best-practices-community-cat-colony-care/"
          target="_blank"
        >
          Click here
        </a>{" "}
        to learn about the Best Practices for our community cat friends.
      </p>
      <p>
        <a
          href="https://www.alleycat.org/resources/cold-weather-tips-for-cats/"
          target="_blank"
        >
          Learn about how
        </a>{" "} to take care of them in {" "}
        <strong>
         cold climates or during the winter months
        </strong>{" "}
        (this is when they need you the most!).
      </p>
      <p>
        Looking for <strong>local support?</strong>{" "}
        <a
          href="https://www.petcommunitycenter.org/support-community-cats"
          target="_blank"
        >
          Pet Community Center
        </a>{" "}
        is Davidson County's dedicated TNR program! They do wonderful work every
        day to reduce the overwhelming community cat population by humanely
        aiding in the trap, neuter and return of our local community cats. They
        are always available to answer questions and help new volunteers in our
        community.
      </p>
    </div>
  );
};
