/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'recompose';
import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from "react-icons/fa";
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../../firebase';
import { logOut } from '../../redux/ActionCreators';
// CSS
import './index.css'
import { chosenTheme } from './theme';

const onMouseEnter = (event, color) => {
  const el = event.target;
  el.style.backgroundColor = color;
};
const onMouseOut = (event) => {
  const el = event.target;
  el.style.backgroundColor = "transparent";
};

const Navigation = ({ authUser,user }) =>
<div className='postion-fixed'>{
  authUser ? (
    <NavigationAuth authUser={authUser} user={user} />
  ) : (
    <NavigationNonAuth />
  )
}</div>;
  

const NavigationAuth = ({ authUser, user }) => {
  const dispatch = useDispatch();
  const theme = chosenTheme;
  const logout = (e) =>{
    dispatch(logOut());
    e.preventDefault();
    
  }
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const url = useLocation();
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  useEffect(() => {
    if(url.pathname.split('/')[1] !== activeLink){
      setActiveLink(url.pathname);
      console.log(url.pathname);

    }
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  
  return(
    <>
    
    <Navbar collapseOnSelect expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
      <Navbar.Brand><Link to={'/'} 
            className={activeLink === ROUTES.HOME ? 'nav-link active navbar-link text-white' : 'nav-link navbar-link text-white'} onClick={() => onUpdateActiveLink(ROUTES.HOME)}
            >
          <span> &lt;</span>
               <span className="logo-name" >
                  Lingala Hanumantha Reddy
                </span>
                <span >/&gt;</span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav responsive-navbar-nav" />
        <Navbar.Collapse id="  basic-navbar-nav responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav >
          <Link to={ROUTES.EDUCATION} className={activeLink === ROUTES.EDUCATION ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.EDUCATION)}>Education</Link>
              <Link to={ROUTES.EXPERIENCE} className={activeLink === ROUTES.EXPERIENCE? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.EXPERIENCE)}>Experience</Link>
                        </Nav>
          <Nav>
            <NavDropdown
              align="end"
              bsPrefix={{

              }}
              title={
                authUser.photoURL ? (
                  <img
                    src={authUser.photoURL}
                    alt={authUser.displayName}
                    className="nav-user-avatar"
                    referrerPolicy="no-referrer"
                    // onError={(event) => {
                    // 	event.target.src =
                    // 		"https://firebasestorage.googleapis.com/v0/b/placement-7674.appspot.com/o/fa-user-circle.png?alt=media&token=b14d09fb-745a-4438-9850-b3f6e0eafd90";
                    // 	event.onerror = null;
                    // }}
                  />
                ) : (
                  <FaUserCircle></FaUserCircle>
                )
              }
              id="collasible-nav-dropdown"
              drop="down"
            >
              
                  <Link
                className="dropdown-item"
                to={`${ROUTES.ACCOUNT}/${user ? user.username : ""}`}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                My Profile
              </Link>
              <Link to={ROUTES.PROJECTS}
              className="dropdown-item"
                style={{ color: theme.text }}
                onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                onMouseOut={(event) => onMouseOut(event)}
                >Projects</Link>
              <Link to={ROUTES.OPEN_SOURCE} 
              className="dropdown-item"
                style={{ color: theme.text }}
                onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                onMouseOut={(event) => onMouseOut(event)}>Open-Source</Link>
              <Link to={ROUTES.CONTACT} 
              className="dropdown-item"
                style={{ color: theme.text }}
                onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                onMouseOut={(event) => onMouseOut(event)}>Contact</Link>

              <Link
                className="dropdown-item"
                to={ROUTES.POST_BLOG}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                Post blog
              </Link>
                  <Link
                className="dropdown-item"
                
                onClick={logout}
                activeStyle={{ fontWeight: "bold" }}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                logout
              </Link>
                            
              {/* </div> */}
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
};

const NavigationNonAuth = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const url = useLocation();
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  useEffect(() => {
    if(url.pathname.split('/')[1] !== activeLink){
      setActiveLink(url.pathname);
      console.log(url.pathname);

    }
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  return(
    <>
      <Navbar collapseOnSelect expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand><Link to={'/'} 
            className={activeLink === ROUTES.HOME ? 'nav-link active navbar-link text-white' : 'nav-link navbar-link text-white'} onClick={() => onUpdateActiveLink(ROUTES.HOME)}
            >
          <span> &lt;</span>
               <span className="logo-name" >
                  Lingala Hanumantha Reddy
                </span>
                <span >/&gt;</span></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav responsive-navbar-nav" />
        <Navbar.Collapse id="  basic-navbar-nav responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
          <Link to={ROUTES.EDUCATION} className={activeLink === ROUTES.EDUCATION ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.EDUCATION)}>Education</Link>
              <Link to={ROUTES.EXPERIENCE} className={activeLink === ROUTES.EXPERIENCE? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.EXPERIENCE)}>Experience</Link>
              <Link to={ROUTES.PROJECTS} className={activeLink === ROUTES.PROJECTS ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.PROJECTS)}>Projects</Link>
              <Link to={ROUTES.OPEN_SOURCE} className={activeLink === ROUTES.OPEN_SOURCE ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.OPEN_SOURCE)}>Open-Source</Link>
              <Link to={ROUTES.CONTACT} className={activeLink === 'projects' ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Contact</Link>
              <Link to={ROUTES.BLOGS} className={activeLink === ROUTES.BLOGS ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.BLOGS)} >Blogs</Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
};

const mapStateToProps = state => ({
  authUser: state.authState.currentUser,
  user: state.authState.user
});

export default compose(withFirebase,connect(mapStateToProps))(Navigation);
