import React from 'react';
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useParallax, Parallax } from 'react-scroll-parallax';
import "./index.css"
import Typewriter from 'typewriter-effect';
import Lottie from 'react-lottie';
import animationData from '../../Assets/Lotties/home-header.json';
import animationData1 from '../../Assets/Lotties/home-2.json';
import { useNavigate } from 'react-router';
import 'react-multi-carousel/lib/styles.css';
import "react-circular-progressbar/dist/styles.css";
const Landing = () => {
  const navigate = useNavigate();
  const { ref } = useParallax({ speed: 10 });
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  },
};
const roles = [
  {name: "Full-Stack Developer", performance: 80, points: [
    "Proficient in programming languages like Python and JavaScript, and experienced in working with popular frameworks like Laravel and React.",
    "Proven ability to learn new technologies quickly and contribute to the success of the team.",
    "Strong expertise in database design, data retrieval and processing, and web development.",
    "Winner of the 2nd prize in Project Expo-2K19 on the occasion of Engineer’s day organized by CRI, KSRMCE."
  ]},
  {name: "Front-End Developer", performance: 90, points: [
    "Experienced in developing responsive and interactive user interfaces using modern frontend technologies such as React, Vue, and Angular.",
    "Proficient in HTML, CSS, and JavaScript, with a strong understanding of web standards and best practices.",
    "Skilled in implementing designs and UX concepts provided by designers into high-quality, pixel-perfect web pages.",
    "Familiar with popular tools and frameworks such as Bootstrap, Material UI, and Tailwind CSS to create visually appealing and efficient UI components.",
  ]},
  {name: "React Developer", performance: 90, points: [
    "Proficient in React and its ecosystem, including Redux, React Router, and React Native.",
    "Experience in building responsive and scalable web applications using React and other front-end technologies like HTML, CSS, and JavaScript.",
    "Familiarity with modern web development tools such as Webpack, Babel, and Git for efficient and collaborative development workflows.",
    "Strong understanding of core computer science concepts like data structures and algorithms, as well as software engineering best practices such as test-driven development and continuous integration.",
  ]}];
// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 2
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 2
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };
// const skills = [
//   {name: "HTML", performance: 90},
//   {name: "CSS", performance: 90},
//   {name: "Java Script", performance: 90},
//   {name: "React Js", performance: 80},
//   {name: "Git", performance: 80},
//   {name: "Laravel", performance: 60},
//   {name: "Vue Js", performance: 60},
//   {name: "NPM", performance: 80},
//   {name: "SCSS", performance: 0},
// ]
const Component = () => (
  <Parallax translateY={[-20, 20]}>
    <div className='row mt-3 mb-5 pb-5'>
  <div className='col-md-5 col-sm-12  mt-5 pt-5'>
  <div data-aos="zoom-in">
    <Lottie 
	    options={defaultOptions1}
      isClickToPauseDisabled={false}
      
      title="lingala hanumantha reddy's animation skills"
      
      /></div>
  </div>
  <div className='col-md-7 col-sm-12'>
  <div data-aos="zoom-in">
    <div className='mt-5'>
      <h1 className='text-light text-center'>What I Do  ?</h1>
    </div>
    <div className='m-5'>
      <div className='container-fluid card p-2 bg-transparent border-light'>

      
      <Tab.Container id="left-tabs-example" defaultActiveKey="Full-Stack Developer">
      <Row>
      <Col sm={4}>
        
        {
        roles.map((role) => {
          return(
          <Nav variant="pills" key={role.name} className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey={`${role.name}`}>{role.name}</Nav.Link>
            </Nav.Item>
          </Nav>
          )})}
</Col>
        <Col sm={8}>
        {
        roles.map((role) => {
          return(
          <Tab.Content key={role.name}>
            <Tab.Pane eventKey={`${role.name}`}>
              <div key={role.name}>
              <div key={role.name}>{
                role?.points?.map((point) =>{
                  return(
                    <div key={point}>
                    
                      <div>
                        <span>⚡</span>
                      <span>{point}</span>
                      </div>
                    </div>
                  )
                })
              }</div></div>
            </Tab.Pane>
          </Tab.Content>
        )})}
        </Col>
      </Row>
    </Tab.Container>
      </div>
    {/* <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">

      {
        skills.map((role) => {
          return(
          <>
              <div className="item" style={{ width: "150px", height: "150px " }}>
              <AnimatedProgressProvider 
        valueStart={0}
        valueEnd={role.performance}
        duration={1.4}
        easingFunction={easeQuadInOut}
        
      >
        {value => {
          const roundedValue = Math.round(value);
          return (
            <CircularProgressbar
              value={value}
              text={`${roundedValue}%`}
              styles={buildStyles({ pathTransition: "none" })}
              
            />
          );
        }}
              </AnimatedProgressProvider>

                                <h5>{role.name}</h5>
                            </div>
          </>)
        })
      }
              </Carousel> */}

    </div>
    </div>
  </div>
</div>
  </Parallax>
);
const letsConnect = () =>{
  navigate('/connect-with-me')
}
  return(
  <div ref={ref}>
      <div className='row mb-5'>
        <div className='col-md-8 col-sm-12 p-5'>
      <Button size='lg' className='space-btn' variant="outline-light">Welcome to my Portfolio</Button>
        <br></br>        <br></br>

        <span className='fw-bold home-heading-main'>Hi! I'm&nbsp; Hanumantha Reddy
        <Typewriter
  options={{
    strings: ['Full Stack Developer !','Front-End Developer !','React Developer !'],
    autoStart: true,
    loop: true,
  }}
/>
         </span>
         <p className='home-tag-description'>
         I am a highly skilled and passionate full-stack web developer with expertise in modern technologies such as React, Node.js, and MongoDB. With several years of experience delivering high-quality web applications for clients around the world, I am dedicated to creating responsive and engaging user experiences. My portfolio showcases a diverse range of projects that demonstrate my ability to solve complex problems and deliver outstanding results.  
         </p>
         <div>
         <button className='lets-connect-button' variant="outline-none" onClick={letsConnect}>
          <h3 className='text-white'>Let's Connect &nbsp; <BsArrowRightCircle className='forword-arrow-icon'/></h3>
         </button></div>
      </div>
      <div className='col-md-4 col-sm-12'>
        <div data-aos="zoom-in"><Lottie 
	    options={defaultOptions}
      isClickToPauseDisabled={false}
      title="lingala hanumantha reddy's animation skills"
      
      /></div>
      
      </div>

      </div>
         {/* <div className="scroller">&nbsp;
        <span>
          <br/>
          <br/>
          
        </span>
      </div>    */}

<Component/>
  </div>
  )
  };

export default Landing;
