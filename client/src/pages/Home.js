import React from "react";
import { Link } from "react-router-dom";

const Home = ({ handleRefresh }) => {
  return (
    <div>
      <h1>Choose a Form</h1>
      <div className="button-container">
        <Link to="/form-a" className="btn">
          <button>Form A</button>
        </Link>
        <Link to="/form-b" className="btn">
          <button>Form B</button>
        </Link>
        <button className="btn" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Home;
