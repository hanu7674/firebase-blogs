import React, {useEffect, useRef, useState} from "react";
import Trending from "./Trending";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreBlogs, getBlogs, getTotalBlogs, getTrendingBlogs } from "../../redux/ActionCreators";
import { useLocation, useNavigate } from "react-router";
import BlogSection from "./BlogSection";
import Spinner from "./Spinner";
import { Button } from "baseui/button";
import { FaSearch } from "react-icons/fa";

import Category from './Category';
import Tags from "./Tags";
import FeatureBlogs from "./FeatureBlogs";
import { InputGroup as IG } from "react-bootstrap";
import { Form } from "react-bootstrap";
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Blogs = () =>{
    const queryString = useQuery();
  const searchQuery = queryString.get("q");
  const search = useRef();
    const blogslist = useSelector((state) => state.blogs.totalBlogs);
    const [searchBlogsData, setSearchBlogsData] = useState([]);
    const blogs = useSelector((state) => state.blogs.blogs);
    const hideMoreButton = useSelector((state) => state.blogs.hide_more_button);
    const loading  = useSelector((state)=> state.blogs.loading);
    const [searchLoading, setSearchLoading]  = useState(false);
    const [categoryCount, setCategoryCount] = useState();
    const [tagsCount, setTagsCount] = useState();
    const dispatch = useDispatch();
  const redirect = useSelector(state => state.redirect.redirectTo)

  const navigate = useNavigate();

  useEffect(()=>{
    if(redirect){
      navigate(redirect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[redirect])
    useEffect(()=>{

        dispatch(getTrendingBlogs());
        dispatch(getTotalBlogs());
        dispatch(getBlogs());
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
            setSearchBlogsData(blogslist?.list)
            const counts = blogslist?.list?.reduce((prevValue, currentValue) => {
                let name = currentValue.category;
                if (!prevValue.hasOwnProperty(name)) {
                  prevValue[name] = 0;
                }
                prevValue[name]++;
                // delete prevValue["undefined"];
                return prevValue;
              }, {});
            if(counts){
                const categoryCount = Object.keys(counts).map((k) => {
                    return {
                      category: k,
                      count: counts[k],
                    };
                  });
            setCategoryCount(categoryCount)
                
            }    
            const tagCounts = {};
            
            blogslist?.tags?.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
            
            const uniqueTags = [...new Set(blogslist?.tags)];
            
            const sortedTagCounts = uniqueTags
              .map(tag => ({ tag: tag, count: tagCounts[tag] }))
              .sort((a, b) => b.count - a.count);
              setTagsCount(sortedTagCounts)
    }, [blogslist]);
  const handleChange = (e) =>{
    e.preventDefault();
    setSearchBlogsData(blogslist?.list)
    if(e.target.value){
      navigate(`/search?q=${e.target.value}`);
      setSearchLoading(true);
      setSearchBlogsData(searchBlogsData?.filter((blog)=>
         blog?.title?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         blog?.postedBy?.displayName?.toLowerCase().includes(e.target.value?.toLowerCase()) 
         // || blog?.tags?
      ));
        setTimeout(() => {
            setSearchLoading(false)
        }, 500);
    }
    else{
        navigate(`/`);
        dispatch(getBlogs())
    }
    search.current = e.target.value

  }
  const handleSearch = (e) =>{
    e.preventDefault();
    setSearchBlogsData(blogslist?.list)
    if(search.current?.length > 0){
      navigate(`/search?q=${search.current}`);
      setSearchLoading(true)
      setSearchBlogsData(
        searchBlogsData?.filter((blog)=>
         blog?.title?.toLowerCase().includes(e.target.value?.toLowerCase()) ||
         blog?.postedBy?.displayName?.toLowerCase().includes(e.target.value?.toLowerCase()) 
         // || blog?.tags?
      ));
        setTimeout(() => {
            setSearchLoading(false)
        }, 500);
    }
    else{
        navigate(`/`);
        dispatch(getBlogs())
    }
  }
    return (
        <>
        
        <div className="container"> 
            <div className="container-fluid mt-5">
                <div className="row">
                <Trending />
                    <div className="col-md-8 mt-4">
            <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
            {
                loading ? <div style={{margin: 'auto', width: 'max-content ', height: "max-content"}}>
                <Spinner/></div> : <>
            {
              searchQuery?.length>0 ? <>
              {searchLoading ? <div style={{margin: 'auto', width: 'max-content ', height: "max-content"}}>
                <Spinner/></div>:
              <>{
                  searchBlogsData?.length >0 ? <>
                              {  searchBlogsData?.map((blog) => (
                  <BlogSection
                    key={blog.id}
                    {...blog}
                  />
                ))}
                  </>: <>
                  <h4>
                    No Blog found with search keyword:{" "}
                    <strong>{searchQuery}</strong>
                  </h4>
                </>
              }</>
              }
              </> : <>
              {
              blogs?.length >0 ? <>
                          {  blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                {...blog}
              />
            ))}
              </> : <>
              <div className="container">
        <p className="text-center">
          Oh! Hanumanth hasn't posted any blogs till now.<br></br>
          Will update if post anything here.
        </p>
      </div></>
            }
              </>
            }
            

            {!hideMoreButton && blogs?.length >1 ? <>
                <div className="mt-3 " style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <Button 
              onClick={() => dispatch(fetchMoreBlogs())}
              >
                Load More
              </Button></div> </> : <></>}
</>
            }
            
          </div>
          <div className="col-md-3 mt-4">
          <div className="blog-heading text-start py-2 mb-4">Search</div>
      {/* <form className="form-inline" onSubmit={handleSubmit}> */}
        <div className="col-12 py-3">
          
        <IG className="mb-3">
        <Form.Control
          placeholder="Search blog"
          value={search.current}
          onChange={handleChange} 
          className="form-control search-input"
          aria-label="Search blog"
          aria-describedby="basic-addon2"
        />
        <Button className="btn btn-secondary search-btn" id="button-addon2" onClick={handleSearch}>
        <FaSearch/>

        </Button>
      </IG>
        </div>
            {/* <Search search={search} handleChange={handleChange}  /> */}
            <div className="blog-heading text-start py-2 mb-4">Tags</div>
            <Tags tags={tagsCount?.slice(0,20)} />
            <FeatureBlogs title={"Most Popular"} blogs={blogs} />
            <Category catgBlogsCount={categoryCount} />
          </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Blogs;