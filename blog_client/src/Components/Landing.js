import "../CSS/Landing.css";
import React from "react";

const Landing = ({ changeDisplay }) => {
  return (
    <div className="landing">
      <div>
        <div className="title">Welcome to the Random Blog</div>
      </div>
      <div>
        <div className="sub">A blog site where anything goes</div>
      </div>
      <div className="bn">
        <button
          className="btt"
          onClick={() => {
            changeDisplay("blogs");
          }}
        >
          View Blog Posts
        </button>
        <button
          className="btt"
          onClick={() => {
            changeDisplay("add");
          }}
        >
          Write A Blog Post
        </button>
      </div>
    </div>
  );
};

export default Landing;
