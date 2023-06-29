import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogSection from "./BlogSection";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/ActionCreators";

const CategoryBlog = () => {
  const categoryBlogs = useSelector((state) => state.blogs.categoryBlogs);
  const  loading = useSelector((state) => state.blogs.loading);
  const { category } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(category))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-4">
            Category: <strong>{category?.toLocaleUpperCase()}</strong>
          </div>
          {
        loading ? <div style={{margin: 'auto', width: 'max-content ', height: "100vh"}}><Spinner/></div> : 
<>
          {categoryBlogs?.map((item) => (
            <div className="col-md-6">
              <BlogSection key={item.id} {...item} />
            </div>
          ))}</>}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
