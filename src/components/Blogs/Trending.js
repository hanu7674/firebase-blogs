import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
import { getTrendingBlogs } from "../../redux/ActionCreators";
import Spinner  from "./Spinner";
const Trending = () => {
    const loading  = useSelector((state)=> state.blogs.loading)
    const blogs = useSelector((state)=> state.blogs.trendingBlogs)
    const options = {
        loop: true,
        animateOut: 'slideOutDown',
    animateIn: 'flipInX',
        lazyContent: true,
        lazyLoad: true,
        autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          400: {
            items: 2,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      };
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTrendingBlogs());
    }, [dispatch])
    return(
        <>
        <div>
        <div>
        <div className="blog-heading text-start py-2 mb-4">Trending</div>
      </div>
      {
        loading ? <div style={{margin: 'auto', width: 'max-content ', height: "max-content"}}><Spinner/></div> : 
        <>{
          blogs?.length >0 ? 
        
      <OwlCarousel  className="owl-theme" {...options}>
        {blogs?.map((item) => (
          <div className="item px-2" key={item.id}>
            <Link to={`/blog/view/${item?.id}`}>
              <div className="trending-img-position">
                <div className="trending-img-size">
                  <img
                    src={item?.imgUrl}
                    alt={item?.title}
                    className="trending-img-relative"
                  />
                </div>
                <div className="trending-img-absolute"></div>
                <div className="trending-img-absolute-1">
                  <span className="text-white">{item.title}</span>
                  <div className="trending-meta-info">
                    {item?.author} - {item?.postedBy.timestamp?.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
      : <>
      <div className="container">
        <p className="text-center">
          Oh! Hanumanth hasn't posted any blogs till now.<br></br>
          Will update if post anything here.
        </p>
      </div>
      </>
      }</>
}
        </div>
        </>
    )
}


export default Trending;