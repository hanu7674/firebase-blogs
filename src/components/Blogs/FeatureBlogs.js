import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureBlogs = ({ blogs, title }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="blog-heading text-start pt-3 py-2 mb-4">{title}</div>
      {
        blogs?.length > 0 ? <></> : <>{title} are not available</>
      }
      {blogs?.map((item) => (
        <div
          className="row pb-3"
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/blog/view/${item.id}`)}
        >
          <div className="col-5 align-self-center">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="most-popular-img"
            />
          </div>
          <div className="col-7 padding">
            <div className="text-start most-popular-font">{item.title}</div>
            <div className="text-start most-popular-font-meta">
              {item?.postedBy?.timestamp?.toDate().toString()}
            </div>
          </div>
          <div>
          <hr  style={{width: "80%",right: "5px", margin: "5px"}}></hr>

          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureBlogs;
