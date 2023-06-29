import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import * as ROUTES from "../constants/routes"
import { FaMapMarkerAlt } from "react-icons/fa";
import {FaGithub, FaFacebook, FaGoogle, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp} from "react-icons/fa"
import {FcGoogle, FcPhone} from "react-icons/fc"
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitSubscribe } from "../../redux/ActionCreators";
const Footer = () => {
    const socialMediaLinks = [
        
        {
          name: "Address",
          links: [
            {
                link: "https://goo.gl/maps/6HJvDoi5idceumE19", text: "Pulivendula, Andhra Pradesh, India."
            }
            ],
          icon: <FaMapMarkerAlt size={30}/>,
          backgroundColor: "red",
        },
        {
            name: "Phone",
            links: [{
                link: "tel:+917674070018", text: "+917674070018"}
            ],
            icon: <FcPhone size={30}/>, 
            backgroundColor: "#0077B5",
          },
          {
            name: "Email",
            links: [{link : "mailto:hanumanth.lingala@gmail.com", text: "hanumanth.lingala@gmail.com"},{link: "mailto:hanumanth.lingala@protonmail.com", text: "hanumanth.lingala@protommail.com"}],
            icon: <FcGoogle size={30}/>, 
            backgroundColor: "#2f2f2f",
          }

      ];
      const socialMedia = [
        {
          name: "Github",
          link: "https://github.com/hanu7674",
          icon: <FaGithub size={30}/>, // Reference https://fontawesome.com/icons/github?style=brands
          backgroundColor: "#2f2f2f", // Reference https://simpleicons.org/?q=github
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/hanu7674/",
          icon: <FaLinkedinIn size={30}/>, // Reference https://fontawesome.com/icons/linkedin-in?style=brands
          backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
        },
        //youtube channel link
        // {
        //   name: "YouTube",
        //   link: "https://www.youtube.com/channel/UC_amoXmmxSY9KusoDczDTXQ",
        //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
        //   backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
        // },
        {
          name: "Gmail",
          link: "mailto:hanumanth.lingala@gmail.com",
          icon: <FaGoogle size={30}/>, // Reference https://fontawesome.com/icons/google?style=brands
          backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
        },
        {
          name: "Twitter",
          link: "https://twitter.com/hanu7674",
          icon : <FaTwitter size={30}/>, // Reference https://fontawesome.com/icons/twitter?style=brands
          backgroundColor: "#1DA1F2", // Reference https://simpleicons.org/?q=twitter
        },
        {
          name: "Facebook",
          link: "https://www.facebook.com/hanu7674/",
          icon: <FaFacebook size={30}/>, // Reference https://fontawesome.com/icons/facebook-f?style=brands
          backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
        },
        {
          name: "Instagram",
          link: "https://www.instagram.com/hanu7674/",
          icon: <FaInstagram size={30}/>, // Reference https://fontawesome.com/icons/instagram?style=brands
          backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
        },
        {
            name: "Whatsapp",
            link: "https://wa.me/917674070018?text=Hi, I wanted to connect with you ",
            icon: <FaWhatsapp size={30}/>, // Reference https://fontawesome.com/icons/instagram?style=brands
            backgroundColor: "green", // Reference https://simpleicons.org/?q=instagram
          },
      ];
      const [email, setEmail] = useState('');
      const [name, setName] = useState('');
      const [validated, setValidated] = useState(false);
      const dispatch = useDispatch();
      const handleSubmit = (event) => {
        console.log(email);
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
          event.preventDefault();
          const formData = {
            email: email,
            name: name
          }
          dispatch(submitSubscribe(formData))
          event.stopPropagation();
        }
        setValidated(true);
      };
  return (
    <>
 <footer>

   <div className="content">
     <div className="left box">
     <div className="footer-left" data-aos="fade-right">

<h1><span className="logo-name">Lingala Hanumantha Reddy</span></h1>

<p className="footer-links m-5">
<span>Useful links :</span>
<Link to={ROUTES.EDUCATION} className={'nav-link navbar-link'} >Education</Link>
<Link to={ROUTES.EXPERIENCE} className={'nav-link navbar-link'} >Experience</Link>
<Link to={ROUTES.PROJECTS} className={'nav-link navbar-link'} >Projects</Link>
<Link to={ROUTES.OPEN_SOURCE} className={'nav-link navbar-link'} >Open-Source</Link>
<Link to={ROUTES.CONTACT} className={'nav-link navbar-link'}>Contact</Link>
<Link to={ROUTES.BLOGS} className={'nav-link navbar-link'}>Blogs</Link>

</p>

{/* <p className="footer-company-name">Copyright 2023. All Rights Reserved</p> */}
</div>

     </div>
     <div className="middle box" data-aos="fade-up">
     <div className="topic">Contact Me</div>
     {socialMediaLinks.map((media) => {
        return (
            <div className={media.name} key={media.name} >
            <span key={media.name} >
                
                <span style={{color: media.backgroundColor, width: "38px", height: "38px", lineHeight: "42px"}}>
                {
                    media.icon
                }</span>
                <span style={{display: "inline-block", verticalAlign: "middle", paddingLeft: "15px",}}>
                   {
                    media.name
                } :
                
                
                {
                    media.links?.map((link) =>{
                        return(
                            <a key={link.link} className="text-decoration-none" href={link.link} referrerPolicy="no-referrer" target="_blank" rel="noreferrer">
                                <p style={{ width:"fit-content"}}>{link.text}</p>
                            </a>
                        ) 
                    })
                }
                </span>

            </span>
            </div>
        );
      })}
     </div>
     <div className="right box" data-aos="fade-left">
       <div className="topic">Subscribe to blogs</div>
       
       <div className="m-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Control
        type="text"
        id="inputName"
        className="bg-transparent text-white m-2"
        placeholder="Enter full name" 
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Form.Control
        type="email"
        id="inputemail1"
        className="bg-transparent text-white m-2"
        placeholder="Enter email address" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
        <Button className="subscribe-btn m-2" type="submit">
            Subscribe
         </Button>  
        </Form>
        </div>
        
       <div className="social-icons-bar">
                    <span className="navbar-text">
              <div className="social-icon">
              {socialMedia.map((media) => {
        return (
            <a key={media.link} href={media.link} referrerPolicy="no-referrer" target="_blank" rel="noreferrer">
                <span style={{color: media.backgroundColor}}>
                {
                    media.icon
                }</span>
            </a>
        );
      })}
              </div>
              </span>
                </div>
     </div>
   </div>
   <div className="bottom">
     <p>Copyright © 2023 <i className="fw-bold">@Hanumanth</i> , All rights reserved.</p>
     <span>Best viewing experience at <b>1920*1080</b></span>
   </div>
 </footer>
    </>
  );
};

export default Footer;
