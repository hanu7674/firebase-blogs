import React, {  useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import Like from "./Like";
import FeatureBlogs from "./FeatureBlogs";
import RelatedBlog from "./RelatedBlog";
import Tags from "./Tags";
import { useSelector, connect, useDispatch } from "react-redux";
import { compose } from "recompose";
import { getBlogDetails, getRecentBlogs, getRelatedBlogs, handleLike } from "../../redux/ActionCreators";
import { withFirebase } from "../../firebase";
import { withAuthentication } from "../../Session";
import parse from "html-react-parser";
import { handleAddComment, handleDeleteComment, handleEditComment, handleReplyComment, setBlogComments } from "../../redux/ActionCreators";
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import "./index.css";
import { SuperSEO } from 'react-super-seo';
import { excerpt } from "./utility";
import Loading from "../Loading/loading";
import { TbError404 } from "react-icons/tb";
import { Button, Popover, Whisper, AvatarGroup, Avatar as Ravatar } from "rsuite";
import Share from "./Share";
import Avatar from "react-avatar";
import Timestamp from "react-timestamp"
import { Image } from "react-bootstrap";
import {FaShareSquare} from 'react-icons/fa'

const Detail = () => {
  const user = useSelector((state) => state.authState.user);
  const userId = user?.id ? user?.id  : null;
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.blogDetails);
  const blogAuthor = useSelector((state) => state.blogs.author);
  const likes = useSelector((state) => state?.blogs?.blogDetails?.likes);
  const relatedBlogs = useSelector((state) => state.blogs.relatedBlogs);
  const recentBlogs = useSelector((state) => state.blogs.recentBlogs);
  // const [comments, setComments] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const commentsData = useSelector((state) => state?.blogs?.comments);
  const [author, setAuthor] = useState([])
  const currentUser = { 
    currentUserId: user?.id,
    currentUserImg: user?.photoURL ? user?.photoURL : null,
    currentUserProfile: `/user/profile/${user?.id}`,
    currentUserFullName: user?.firstName + ' ' + user?.lastName,
  }
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)
    dispatch(getRecentBlogs())
    localStorage.setItem('redirectUrl', window.location.pathname);
    if(id){ 
    dispatch(getBlogDetails(id));
    dispatch(setBlogComments(id));
    } 
    setTimeout(() =>{
    setLoading(false);
    },1000)
  },
   // eslint-disable-next-line react-hooks/exhaustive-deps
   [id, user]);
  useEffect(()=>{
    if(blog?.title){
    dispatch(getRelatedBlogs(blog))
    if(!blogAuthor || blogAuthor === null){
      setAuthor(blog?.postedBy);
    }
    else{
      setAuthor(blogAuthor)
    }
    // setComments(commentsData);

    const keys = [];
    keys.push(blog?.title);
    blog?.tags?.map((tag)=>(
      keys.push(tag)
    ))
    keys.push(blog.postedBy?.displayName);
    setKeywords(keys.join(", "))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blog])
  if (!blog) {
    return (
      <div className="mt-5 pt-5">
        <div className="m-5 text-center border-bottom border-top border-warning-subtle">
            <div className="text-center m-0">
              <span>
              <TbError404 size={300}/>
              </span>
            </div>
            <div className="pt-0 fs-2">
              Oops! Blog not found
            </div>
            <p className="pt-0 fs-3 mb-3">
              Sorry, but the blog you are looking for is not found. Please, make sure you have typed the correct URL.
            </p>
        </div>
        <div className="m-5 d-flex justify-content-center gap-4 align-items-center align-content-center text-center">
          
        <Button color="violet" appearance="primary" onClick={() =>navigate("/")}>Go to Home</Button>
        <Button color="violet" appearance="primary" onClick={() =>navigate("/blogs")}>View list of blogs</Button>
          
        </div>
             </div>
    );
  }
  const handleLikes = () =>{ 
    dispatch(handleLike(id)) 
  }
  const handleCommentSubmit = (data) => {
    dispatch(handleAddComment(id, data))
  }

const handleReplySubmit = (data) => {  
  dispatch(handleReplyComment(id, data))
}
const handleEdit = (data) => {
  dispatch(handleEditComment(id,data))
  
};


const handleDelete = (data) => {
  dispatch(handleDeleteComment(id, data))
}
  return (
    <div className="mt-5">
      <SuperSEO
  title={blog?.title}
  description={blog?.title} property={blog?.content ? <>{excerpt(parse(blog?.content), 120)}</> : ''}
  lang="en"
  openGraph={{
    ogImage: {
      ogImage: `${blog?.imgUrl}`,
      ogImageAlt: `${blog?.title}`,
      ogImageWidth: 1200,
      ogImageHeight: 630,
      ogImageType: 'image/jpeg',
    },
  }}
  twitter={{
    twitterSummaryCard: {
      summaryCardImage: `${blog?.imgUrl}`,
      summaryCardImageAlt: `${blog?.title}`,
      summaryCardSiteUsername: 'hanu7674',
    },
  }}
>
<meta name="keywords" content={keywords}/>
  </SuperSEO>
  {loading ? <div style={{height: '100vh'}}><Loading/></div> : 
      <>

      <div className="container mt-5 pt-5">
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
            <div className="container padding">
            <div className="container d-flex justify-content-left gap-3 align-items-left align-content-left">            
          {
                                    author?.photoURL ? (
                                      <Avatar src={author?.photoURL} name={null} round={true} size='55px' alt={author?.firstName+ " " + author?.lastName} />
                                      
                                    ) : (
                                      <Avatar name={author?.firstName +" " +author?.lastName} round={true} size='55px' alt={author?.firstName+ " " + author?.lastName}/>
                                    )
                                  }
  <div>
    <div className="fw-bold">
      <Link to={`/user/profile/${author?.id ? author?.id : author?.uid}`} className=" text-dark">
      {author?.firstName+ " " + author?.lastName}
      </Link>
    </div >
    <span className="meta-info">{author?.tagLine ? <span>{author?.tagLine}</span> : null}</span>
    </div>
        </div>
        <div className=" d-flex mt-2 justify-content-left gap-3 align-items-left align-content-left">
          <span className="container fs-1 fw-bolder mt-2 text-capitalize">{blog?.title}</span>
        </div>
        <div>
        <span className="container fs-6 mt-2 mb-3 text-capitalize meta-info">Published <Timestamp relative date={blog?.postedBy?.timestamp?.toDate().toDateString()} /></span>
        </div>
              <div className="row mx-0">
                <div className="col-md-8">
                  <span>
                    {
                      blog?.imgUrl ? <Image src={blog?.imgUrl} fluid/> : null
                    }
                  </span>
                  <div className="text-start mt-4">
                    {blog?.content ? <>{parse(blog.content)}</> : null}
                  </div>
                  <div className="text-start mt-3">
                    <Tags tags={blog?.tags} />
                  </div>
                  <div className="mt-4 mb-4 p-5 border-top border-bottom text-center">
                  <div>Enjoy this post? Give <span className="fw-bold">{author?.firstName +" " +author?.lastName}</span> a like if it's helpful.
                  </div>
                  <div className="gap-4 mt-2">
                  <Like blogId={id} likes={likes} userId={userId} handleLikes={handleLikes} /> &nbsp;
                  <Whisper trigger="click"
                  placement="bottom"
                  speaker={
                  <Popover arrow={false}>
                    <Share shareUrl={window.location} title={blog?.title} image={blog?.imgUrl}/>
                  </Popover>}
    >
      <Button>  
        <FaShareSquare size={24}/><span className="pt-1">&nbsp;SHARE</span>
      </Button>
    </Whisper>
                  </div>
                  <div className=" mt-4 container d-flex justify-content-center align-items-center align-content-center">
                  
                  <AvatarGroup stack>
      {likes ? 
      <>{ 
      likes
        .filter((user, i) => i < 10)
        .map(user => (
          <Ravatar circle key={user?.firstName +" " +user?.lastName} src={user.photoURL} alt={user?.firstName +" " +user?.lastName} />
        )) }
        {
          likes.length > 10 ? <Ravatar circle style={{ background: '#111' }}>
          + {likes.length - 10}
        </Ravatar> : null
        } </>
      : null }
    </AvatarGroup>
                    </div>
                  </div>
                    
                  <br/>
                  <CommentSection
      currentUser={userId ? { ...currentUser } : null}
      inputStyle={{ border: '1px solid red' }}
      formStyle={{ backgroundColor: 'white' }}
      cancelBtnStyle={{
        border: '1px solid gray',
        backgroundColor: 'gray',
        color: 'white',
        padding: '7px 15px'
      }}
      hrStyle={{ border: '0.5px solid red' }}
      advancedInput={true}
      replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
      onSubmitAction={handleCommentSubmit}
      onReplyAction={handleReplySubmit}
      // logs current comments data here
      // currentData={(data) => {
      //   console.log('current data', data)
      // }}
      onDeleteAction={handleDelete}
      onEditAction={handleEdit}
      logIn = {{
        loginLink: '/login',
        signupLink: '/signup'
      }}
      key={id}
      commentData={commentsData?.length > 0 ? commentsData : []}
    />
                </div>
                <div className="col-md-3">

                  <div className="blog-heading text-start mb-4">
                    <p>Tags</p>
                  </div>
                  <Tags tags={blog?.tags} />
                  <FeatureBlogs title={"Recent Blogs"} blogs={recentBlogs} />
                </div>
              </div>
              <RelatedBlog id={id} blogs={relatedBlogs} />
            </div>
          </div>
      </div>
        </>}
        </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.authState.currentUser,
  user: state.userState.user,
});
export default compose(
  connect(mapStateToProps),
  withFirebase,
  withAuthentication
)(Detail);
