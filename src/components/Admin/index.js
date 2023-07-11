import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { connect, useDispatch, useSelector } from 'react-redux';
import {  withAuthorization, withEmailVerification } from '../../Session';
import * as ROLES from '../constants/roles';
import { withFirebase } from '../../firebase';
import UserList from './UserList';
import { IoInformationCircle } from 'react-icons/io5';
import {VscChecklist} from 'react-icons/vsc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faUsers } from '@fortawesome/free-solid-svg-icons';
import BlogsList from './BlogsList';
import { addBlog, addFakeBlogs, getSentBlogsToReview, getTemplates, getTotalBlogs, getUsersData, getVisitorsCount, removeFakeBlogs } from '../../redux/ActionCreators';
import { Button } from 'react-bootstrap';
import Chance from 'chance';
import { serverTimestamp } from 'firebase/firestore';
import ReviewBlogs from './ReviewBlogs';
import { useNavigate } from 'react-router';
import TemplatesList from './templatesList';
import { HiTemplate } from 'react-icons/hi';
import { FaEye } from 'react-icons/fa';

const chance = new Chance();

function generateFakeData() {
  const fakeData = {
    title: chance.sentence(),
    id: chance.guid(),
    content: chance.paragraph(),
    category: chance.pickone(['Food', 'Travel', 'Technology', 'Fashion']),
    timestamp: serverTimestamp(),
    isFake: true,
    postedBy: {
      timestamp: serverTimestamp(),
      uid: chance.pickone(['F5FOOQtcnXWyG7qFqD4nFmC9rp32', 'fLqFo6bYlHdD0X45rhcnGluW1At1']),
      email: chance.pickone(['hanumanth.lingala@gmail.com','lhmr78845@gmail.com']),
      phone: chance.phone(),
      firstName: chance.pickone(['Hanumanth', 'Reddy']),
      lastName: chance.pickone(['Lingala']),
      photoURL: chance.avatar(),
    },
    imgUrl: chance.pickone([
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(12).png?alt=media&token=cae8babf-83df-448d-baf1-d2e1f473ad52',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FCapture1.PNG?alt=media&token=ac03062c-6b96-419c-a3b5-988378534ab8',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(1).png?alt=media&token=ed4dbdb8-c92d-48b6-9e15-d6b0b54bb9ae',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(11).png?alt=media&token=448a5f33-49dd-4ef3-9c9f-ca4a97745993',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(211).png?alt=media&token=a11a4db5-0bb0-4597-8636-ec87f833907d',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(84).png?alt=media&token=959552ea-7086-4c16-881c-0befdc0b3c22',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(199).png?alt=media&token=3bac8590-0623-4739-92f0-a294e849752b',
      'https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(176).png?alt=media&token=d5a1b23c-b616-4848-ad68-236513a6e667'
    ]),
    tags: chance.n(chance.word, chance.integer({ min: 1, max: 5 })),
    deleted: false,
    likes: chance.n(chance.guid, chance.integer({ min: 0, max: 50 })),
    trending: chance.pickone(['yes', 'no'])
  };

  return fakeData;
}

const blogData =   {
      "id": "91b7264d-9fb3-5a54-9df5-2a8e99317731",
      "deleted": false,
      "title": "Introducing Our Brand New Blog: Exploring the Intersection of Tech, Sports, and Business",
      "postedBy": {
          "photoURL": "https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/images%2Fprofile%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(14).png?alt=media&token=31b27a6f-9ed9-4d61-9d13-e524f5f7ca75",
          "phone": "+917674070018",
          "lastName": "HANUMANTHA REDDY",
          "firstName": "LINGALA",
          "timestamp": {
              "seconds": 1686580950,
              "nanoseconds": 874000000
          },
          "email": "hanumanth.lingala@gmail.com",
          "uid": "fLqFo6bYlHdD0X45rhcnGluW1At1"
      },
      "timestamp": {
          "seconds": 1686580950,
          "nanoseconds": 874000000
      },
      "tags": [
          "Technology",
          "Gadgets",
          "Innovation",
          " Artificial Intelligence",
          "Blockchain",
          "Product Reviews",
          "Sports",
          "Football",
          "Basketball",
          "Extreme Sports",
          "E-sports",
          "Athlete Spotlights",
          "Business",
          "Entrepreneurship",
          "Leadership",
          "Marketing",
          "Finance",
          "Professional Development",
          "Cryptocurrency",
          "Bitcoin",
          "Blockchain",
          "Decentralized Finance",
          "Market Trends",
          "DeFi"
      ],
      "comments": [],
      "category": "Technology",
      "likes": [
          {
              "firstName": "LINGALA",
              "lastName": "HANUMANTHA REDDY",
              "email": "hanumanth.lingala@gmail.com",
              "photoURL": "https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/images%2Fprofile%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(14).png?alt=media&token=31b27a6f-9ed9-4d61-9d13-e524f5f7ca75",
              "uid": "fLqFo6bYlHdD0X45rhcnGluW1At1",
              "phone": "+917674070018"
          }
      ],
      "content": "<p>Welcome to our newly developed blog! We are thrilled to present a platform that delves into the fascinating worlds of technology, sports, and business. Here, we aim to provide engaging and insightful content that caters to enthusiasts and professionals alike. Let's dive into the diverse categories we will be covering and embark on a journey of discovery together!<br><br>1. <strong>Tech Talk:</strong><br>In this category, we will explore the latest trends, innovations, and breakthroughs in the ever-evolving world of technology. From cutting-edge gadgets to emerging technologies such as artificial intelligence and blockchain, we will keep you informed and captivated. Stay tuned for in-depth analyses, product reviews, and thought-provoking discussions that will expand your knowledge and spark your curiosity.<br>Tags: Technology, Gadgets, Innovation, Artificial Intelligence, Blockchain, Product Reviews<br><br>2.<strong> Sporting Spectacle:</strong><br>Sports bring people together like nothing else. In this category, we will celebrate the thrill and excitement of various sports, from popular ones like football and basketball to niche interests like extreme sports and e-sports. Through match analyses, athlete spotlights, and stories of sporting triumphs, we will explore the passion, dedication, and determination that make sports such a powerful force in our lives.<br>Tags: Sports, Football, Basketball, Extreme Sports, E-sports, Athlete Spotlights<br><br>3. <strong>Business Buzz:</strong><br>From startups to multinational corporations, the world of business is a dynamic and complex landscape. Here, we will delve into the intricacies of entrepreneurship, leadership, marketing, and finance. Whether you're a budding entrepreneur, a seasoned professional, or simply intrigued by the business world, our articles will provide valuable insights, practical tips, and thought-provoking perspectives.<br>Tags: Business, Entrepreneurship, Leadership, Marketing, Finance, Professional Development<br>4. <strong>Crypto Chronicles:</strong><br>The rise of cryptocurrency has revolutionized the financial industry. In this category, we will explore the world of digital currencies, blockchain technology, and the implications they have on various sectors. From analyzing the latest market trends to discussing the potential of decentralized finance (DeFi), we aim to demystify crypto and provide you with valuable information to navigate this exciting landscape.<br><br><strong>Conclusion:</strong><br>As we launch our blog, we invite you to join us on this exciting journey where we explore the realms of technology, sports, business, and crypto. Our aim is to provide informative and engaging content that sparks your imagination, expands your knowledge, and ignites meaningful conversations. Stay tuned for our upcoming articles, packed with valuable insights and captivating stories from these dynamic domains. Get ready to explore the interplay between tech, sports, business, and crypto like never before!<br><br></p>",
      "lastUpdatedBy": {
          "lastName": "HANUMANTHA REDDY",
          "uid": "fLqFo6bYlHdD0X45rhcnGluW1At1",
          "email": "hanumanth.lingala@gmail.com",
          "photoURL": "https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/images%2Fprofile%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2FScreenshot%20(14).png?alt=media&token=31b27a6f-9ed9-4d61-9d13-e524f5f7ca75",
          "firstName": "LINGALA",
          "phone": "+917674070018",
          "timestamps": {
              "seconds": 1686586859,
              "nanoseconds": 919000000
          }
      },
      "imgUrl": "https://firebasestorage.googleapis.com/v0/b/hanumanth-live.appspot.com/o/files%2FfLqFo6bYlHdD0X45rhcnGluW1At1%2F5_Blog_Layout_Best_Practices_From_2016-1%20(1).jpg?alt=media&token=a9bcc511-87ec-4cf4-8287-b1e950992537",
      "trending": "yes"
  }

function generateFakeDataArray(num) {
  const fakeDataArray = [];

  for (let i = 0; i < num; i++) {
    fakeDataArray.push(generateFakeData());
  }

  return fakeDataArray;
}

const AdminPage = () => {
  const authUser = useSelector(state => state.authState?.user);
  const blogs = useSelector(state => state.blogs.totalBlogs?.list);
  const blogsCount = useSelector(state => state.blogs.totalBlogs?.count);
  const templates = useSelector((state) => state.templates?.templates);
  const users = useSelector((state) => state.userState?.users);
  const totalreviewedBlogs = useSelector((state) => state.blogs?.totalreviewedBlogs);
  const visitorCount = useSelector((state) => state?.visitors?.count)
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  useEffect(() => {
      if(authUser?.id){
    setTimeout(()=>{
    dispatch(getTotalBlogs());
    dispatch(getUsersData());
    dispatch(getSentBlogsToReview());
    dispatch(getTemplates());
    dispatch(getVisitorsCount());
  },1000)
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authUser]);
  const handleAddFakeBlogsData = async () => {
    const fakeDataArray = generateFakeDataArray(100);
    dispatch(addFakeBlogs(fakeDataArray))
  }
  const handleAddBlog = () => {
    dispatch(addBlog(blogData))
  }
  const handleRemoveFakeBlogsData = () =>{
    dispatch(removeFakeBlogs())

  }
  const handleTemplates = () =>{ 
    Navigate('/templates')
  }
  return(
  <div className='container mt-5'>
    <h1>Admin Page</h1>
    <span>logged in as : { authUser?.email }</span>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <div className="row mb-3">
                                <div className="mb-3 col-xs-6 col-sm-5 col-md-4 col-lg-3" >
                                    <div className="card  bg-primary bg-gradient text-white shadow" style={{maxHeight : "200px"}}>
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Blogs</p>
                                                    <p className="m-0"><strong>{blogs?.length}</strong></p>
                                                </div>
                                                <div className="col-auto">
                                                  <FontAwesomeIcon icon={faBlog} size='2x'/>
                                                </div>
                                            </div>
                                            <p className="text-white-50 medium m-0">
                                              <IoInformationCircle/>&nbsp; {blogsCount} {blogsCount === 1 ? 'blog is' : 'blogs are'} available as of now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 col-xs-6 col-sm-5 col-md-4 col-lg-3">
                                    <div className="card  bg-success bg-gradient text-white shadow" style={{maxHeight : "200px"}}>
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Users</p>
                                                    <p className="m-0"><strong>{users?.length}</strong></p>
                                                </div>
                                                <div className="col-auto">
                                                <FontAwesomeIcon icon={faUsers} size='2x'/>

                                                </div>
                                            </div>
                                            <p className="text-white-50 medium m-0">
                                            <IoInformationCircle/>&nbsp; {users?.length} {users?.length === 1 ? 'user is' : 'users are'} available as of now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 col-xs-6 col-sm-5 col-md-4 col-lg-3">
                                    <div className="card  bg-info bg-gradient text-white shadow" style={{maxHeight : "200px"}}>
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Unverified Blogs</p>
                                                    <p className="m-0"><strong>{totalreviewedBlogs?.list?.length}</strong></p>
                                                </div>
                                                <div className="col-auto">
                                                  <VscChecklist size={40} />
                                                </div>
                                            </div>
                                            <p className="text-white-50 medium m-0">
                                              <IoInformationCircle/>&nbsp; {totalreviewedBlogs?.list?.length} {totalreviewedBlogs?.list?.length === 1 ? 'blog is' : 'blogs are'} needs to verify as of now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 col-xs-6 col-sm-5 col-md-4 col-lg-3" >
                                    <div className="card bg-secondary bg-gradient text-white shadow" style={{maxHeight : "200px"}}>
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Templates</p>
                                                    <p className="m-0"><strong>{templates?.length}</strong></p>
                                                </div>
                                                <div className="col-auto">
                                                  <HiTemplate size={40} />
                                                </div>
                                            </div>
                                            <p className="text-white-50 medium m-0">
                                               <IoInformationCircle/>&nbsp; {templates?.length} {templates?.length === 1 ? 'template is' : 'templates are'} available as of now.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 col-xs-6 col-sm-5 col-md-4 col-lg-3" >
                                    <div className="card bg-warning bg-gradient text-white shadow" style={{maxHeight : "200px"}}>
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col">
                                                    <p className="m-0">Visitors</p>
                                                    <p className="m-0"><strong>{visitorCount}</strong></p>
                                                </div>
                                                <div className="col-auto">
                                                  <FaEye size={30} />
                                                </div>
                                            </div>
                                            <p className="text-black-50 medium m-0">
                                               <IoInformationCircle/>&nbsp; We have {visitorCount} {visitorCount === 1 ? 'visitor.' : 'visits!.'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <Button onClick={handleAddFakeBlogsData}>Add fake data to the blogs</Button>
    <Button onClick={handleRemoveFakeBlogsData}>Remove fake blogs</Button>
    <Button onClick={handleTemplates}>View Templates</Button>
    <Button onClick={handleAddBlog}>Add Blog</Button>
                             <UserList/>
     <BlogsList />
     <ReviewBlogs/>
      <TemplatesList/>
      </div>
);
}

const mapStateToProps = state => ({
  currentUser: state.authState.currentUser,
  isAdmin: state.authState.user
});
const condition = (authUser) =>
  authUser && !!authUser?.roles[ROLES.ADMIN];
export default compose(
  withEmailVerification,
  withFirebase, 
  withAuthorization(condition),
  connect(mapStateToProps)
)(AdminPage);
