import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Tags = ({ tags }) => {
  return (
    <>
      {tags?.length > 0 ? (
  <div className="tags">
      {tags.map((tagCount, index) => (
        <span key={index} >{
          tagCount?.tag ? 
          <p className="tag" key={index}>
        <Link
          to={`/tags/${tagCount.tag}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          {`${tagCount.tag} (${tagCount.count})`}
        </Link>
      </p> : <p className="tag" key={index}>
            <Link
              to={`/tags/${tagCount}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {tagCount}
            </Link>
          </p>
        }</span>
      
    ))}
  </div>
) : (
  <div>Tags not available</div>
)}

    </>
  );
};

export default Tags;
