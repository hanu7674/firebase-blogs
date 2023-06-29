import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogSection from "./BlogSection";
import Spinner from "./Spinner";
import { getTags } from "../../redux/ActionCreators";
import { useDispatch, useSelector } from "react-redux";

const TagBlog = () => {
    const tagBlogs = useSelector((state) => state.blogs.tagBlogs);
    const  loading = useSelector((state) => state.blogs.loading);
    const { tag } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getTags(tag))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-4">
            Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          </div>
          {
        loading ? <div style={{margin: 'auto', width: 'max-content ', height: "100vh"}}><Spinner/></div> : 
<>
          {tagBlogs?.map((item) => (
            <div className="col-md-6" key={item?.id}>
              <BlogSection key={item.id} {...item} />
            </div>
          ))}
          </>}
        </div>
      </div>
    </div>
  );
};

export default TagBlog;
