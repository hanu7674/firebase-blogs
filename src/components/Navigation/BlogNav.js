/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'recompose';
import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../../firebase';
import { logOut } from '../../redux/ActionCreators';
import Logo from "../../Assets/images/logo/logo-transparent-png.png";

// CSS
import './index.css'
import { chosenTheme } from './theme';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCode, faContactCard, faGauge, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import NotificationOverlay from '../Blogs/Notification/NotificationOverlay';
const onMouseEnter = (event, color) => {
  const el = event.target;
  el.style.backgroundColor = color;
};
const onMouseOut = (event) => {
  const el = event.target;
  el.style.backgroundColor = "transparent";
};

const BlogNavigation = ({ user }) =>
<div className='postion-fixed'>{
  user ? (
    <NavigationAuth user={user} />
  ) : (
    <NavigationNonAuth />
  )
}</div>;
  

const NavigationAuth = ({ user }) => {
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
    }
    const onScroll = () => {
      if (window.scrollY > 10) {
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
        <Navbar fixed='top' collapseOnSelect expand="lg" className={scrolled ? "scrolled" : "blog-nav"}>
      <Container>
      <Navbar.Brand>
        <Link to={'/'} 
            className={activeLink === ROUTES.HOME ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.HOME)}
            >
              <div >
            <img style={{height: "64px", width: "200px"}} src={Logo}/>
</div>
          </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav responsive-navbar-nav" />
        <Navbar.Collapse id="  basic-navbar-nav responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav >
                                  </Nav>
                                  <NotificationOverlay/>
          <Nav>
            <NavDropdown
              align="end"
              
              title={
                user.photoURL ? (
                  <Avatar src={user?.photoURL} name={null} round={true} size='35px' />
                  
                ) : (
                  <Avatar name={user?.firstName +" " +user?.lastName} round={true} size='35px'/>
                )
              }
              id="collasible-nav-dropdown"
              drop="down"
            >
              
                  <Link
                className="dropdown-item"
                to={`user/profile/${user.id}`}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                <FontAwesomeIcon icon={faUser}scale={15}/> &nbsp;
                My Profile
              </Link>
              <Link
                className="dropdown-item"
                to={ROUTES.POST_BLOG}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                <FontAwesomeIcon icon={faBlog}scale={15}/> &nbsp;
                Post blog
              </Link>
              {
                user?.roles?.["ADMIN"] ? <><Link
                className="dropdown-item"
                to={ROUTES.ADMIN}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                <FontAwesomeIcon icon={faGauge}scale={15}/> &nbsp;
                Dashboard
              </Link> 

              <Link
                className="dropdown-item"
                to={ROUTES.TEMPLATES}
                  style={{ color: theme.text }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                <FontAwesomeIcon icon={faCode} scale={15}/> &nbsp;Templates
              </Link></>
              : null
            }
            <Link to={ROUTES.CONTACT} 
              className="dropdown-item"
                style={{ color: theme.text }}
                onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                onMouseOut={(event) => onMouseOut(event)}>
                  <FontAwesomeIcon icon={faContactCard}scale={15}/> &nbsp;
                  Contact</Link>


                  <Link
                className="dropdown-item"
                
                onClick={logout}
                  style={{ color: theme.text, fontWeight: "bold" }}
                  onMouseEnter={(event) => onMouseEnter(event, theme.highlight)}
                  onMouseOut={(event) => onMouseOut(event)}
              >
                <FontAwesomeIcon icon={faSignOutAlt} scale={15}/> &nbsp;
                Logout
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
    }
    const onScroll = () => {
      if (window.scrollY > 10) {
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
      <Navbar fixed='top' collapseOnSelect expand="lg" className={scrolled ? "scrolled" : "blog-nav"}>
      <Container>
        <Navbar.Brand>
          <Link to={'/'} 
            className={activeLink === ROUTES.LANDING ? 'nav-link active navbar-link ' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.LANDING)}
            >
              <div >
            <img style={{height: "64px", width: "200px"}} src={Logo}/>
</div>
          </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav responsive-navbar-nav" />
        <Navbar.Collapse id="  basic-navbar-nav responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
              <Link to={ROUTES.LANDING} className={activeLink === ROUTES.BLOGS ? '  active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink(ROUTES.LANDING)} >Home</Link>
              <Link to={ROUTES.CONTACT} className={activeLink === 'projects' ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Link>
              <Link to={ROUTES.LOGIN} className={activeLink === 'login' ? 'nav-link active navbar-link' : 'nav-link navbar-link'} onClick={() => onUpdateActiveLink('login')}>Login</Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
};

const mapStateToProps = state => ({
  user: state.authState.user
});

export default compose(withFirebase,connect(mapStateToProps))(BlogNavigation);
