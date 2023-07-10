import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { compose } from "recompose";
import { connect, useDispatch, useSelector } from "react-redux";
import { OAuthSignup, signup } from "../../redux/ActionCreators";
import { BiErrorCircle } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { withFirebase } from "../../firebase";
import * as ROUTES from "../constants/routes";
import { SignInLink } from "../SignIn";
import {
  ReCaptchaV2,
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
} from "react-recaptcha-x";
import { notify } from "reapop";

import "../index.css";
import Logo from "../../Assets/images/logo/logo-transparent-png.png";

import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const SignUpFormBase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useSelector((state) => state.redirect.redirectTo);
  const [email, setEmail] = useState();
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isVerifyTermsAndConditions, setIsVerifyTermsAndConditions] =
    useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState(false);
  const [token, setToken] = useState();
  const [tokenError, setTokenError] = useState(null);
  const redirectUrl = localStorage.getItem('redirectUrl');
    useEffect(()=>{
    if(redirect){
      navigate(redirect)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[redirect])
  const emailValidation = (email) => {
    var validRegex =
      /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  const isInvalid =
    isSamePassword &&
    emailValidation(email) &&
    firstName !== null &&
    lastName !== null &&
    isVerifyTermsAndConditions &&
    token;

  const v2CallbackA = (token) => {
    if (typeof token === "string") {
      setToken(token);
    } else if (typeof token === "boolean" && !token) {
      setToken(null);
      dispatch(
        notify({
          message: "Please Verify you are not robot again!",
          status: "error",
        })
      );
    } else if (token instanceof Error) {
      setToken(null);
      setTokenError(true);
      dispatch(notify({ message: tokenError, status: "error" }));
    }
  };
  const onSubmit = (event) => {
    const roles = {};
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordOne,
      roles: roles,
    };
    dispatch(signup(data, redirectUrl));
    event.preventDefault();
  };

  const checkPassword = (e) => {
    setPasswordOne(e.target.value);

    if (/\d/.test(e.target.value)) {
      setHasNumber(true);
    }
    if (/[A-Z]/.test(e.target.value)) {
      setHasUpperCase(true);
    }
    if (/[a-z]/.test(e.target.value)) {
      setHasLowerCase(true);
    }
    if (/[?=.*?[#?!@$%^&*-]/.test(e.target.value)) {
      setHasSpecialCharacter(true);
    }
    if (/^.{10,20}$/.test(e.target.value)) {
      setHasLength(true);
    }
  };
  const checkConfirmPassword = (e) => {
    setPasswordTwo(e.target.value);
    if (passwordOne === e.target.value) {
      setIsSamePassword(true);
    }
  };  
  const handleEmail = (e) => {
      setEmail(e.target.value)
  }
 
  return (
    <>
      <div className="col-md-5 col-sm-10 col-xs-12 col-lg-4  mx-auto mt-5 pt-5">

          <Card body className="text-center border">
            {/* <Logo props={this.props} /> */}
            {/* <p>Logo here</p> */}
            <div>
            <div className='mb-2'>
            <img style={{height: "64px", width: "300px"}} src={Logo}/>
</div>
              <Card.Title tag="h3 mt-2">Sign-Up</Card.Title>
              <div className="text-secondary">
                Please fill in this form to create an account!
              </div>
              <div className="mt-1">
                <Form onSubmit={onSubmit}>
                  <div
                    className="floating-container"
                  >
                    <GoogleLoginButton 
                        onClick={() => dispatch(OAuthSignup('google', redirectUrl))}/>
                        <GithubLoginButton 
                        onClick={() => dispatch(OAuthSignup('github',redirectUrl))}/>
                    Or
                    <div className="mt-3">
                        <div className=" mt-1 did-floating-label-content">
                          <input
                            className="did-floating-input"
                            type="text"
                            placeholder=" "
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          <label className="did-floating-label">
                            First Name
                          </label>
                        </div>
                        <div className="mt-1 did-floating-label-content">
                          <input
                            className="did-floating-input"
                            type="text"
                            placeholder=" "
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          <label className="did-floating-label">
                            Last Name
                          </label>
                        </div>
                      <div className="mt-1 did-floating-label-content">
                        <input
                          className="did-floating-input"
                          type="text"
                          placeholder=" "
                          value={email}
                          onChange={handleEmail}
                        />
                        <label className="did-floating-label">
                          Email Address
                        </label>
                      </div>

                      <div className="mt-1 did-floating-label-content">
                        <input
                          className="did-floating-input"
                          type="password"
                          placeholder=" "
                          value={passwordOne}
                          onChange={checkPassword}
                        />
                        <label className="did-floating-label">Password</label>
                      </div>
                      <div className="mt-1 did-floating-label-content">
                        <input
                          className="did-floating-input"
                          type="password"
                          placeholder=" "
                          value={passwordTwo}
                          onChange={checkConfirmPassword}
                        />
                        <label className="did-floating-label">
                          Confirm your password
                        </label>
                      </div>
                      <div className=" row" style={{ textAlign: "left" }}>
            {passwordOne ? (
              <div
                className={`text-${
                  passwordOne === passwordTwo ? "success" : "danger"
                } `}
              >
                <span>
                  {passwordOne === passwordTwo ? (
                    <>
                      {" "}
                      <TiTick /> All good
                    </>
                  ) : (
                    <>
                      {" "}
                      <BiErrorCircle /> Password must include:{" "}
                    </>
                  )}
                </span>
                <ul
                  className="list-group "
                  style={{ "list-style-type": "none", marginLeft: "20px" }}
                >
                  <li className={`text-${hasLowerCase ? "success" : "danger"}`}>
                    {hasLowerCase ? <TiTick /> : <BiErrorCircle />} At least one
                    lowercase letter.{" "}
                  </li>
                  <li className={`text-${hasUpperCase ? "success" : "danger"}`}>
                    {hasUpperCase ? <TiTick /> : <BiErrorCircle />} At least one
                    uppercase letter.
                  </li>
                  <li
                    className={`text-${
                      hasSpecialCharacter ? "success" : "danger"
                    }`}
                  >
                    {hasSpecialCharacter ? <TiTick /> : <BiErrorCircle />} At
                    least one special character.
                  </li>
                  <li className={`text-${hasNumber ? "success" : "danger"}`}>
                    {hasNumber ? <TiTick /> : <BiErrorCircle />} At lease one
                    number.
                  </li>
                  <li className={`text-${hasLength ? "success" : "danger"}`}>
                    {hasLength ? <TiTick /> : <BiErrorCircle />} 10-20
                    characters.
                  </li>
                  <li
                    className={`text-${
                      passwordOne === passwordTwo ? "success" : "danger"
                    }`}
                  >
                    {passwordOne === passwordTwo ? (
                      <TiTick />
                    ) : (
                      <BiErrorCircle />
                    )}{" "}
                    Both Password and Confirm Password's are same
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ReCaptchaV2
                          id="forgot-email"
                          // className="test"
                          data-test-id="forgot-email"
                          callback={v2CallbackA}
                          theme={EReCaptchaV2Theme.Light}
                          size={EReCaptchaV2Size.Normal}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <label className="checkbox-inline">
                        <input
                          type="checkbox"
                          value={isVerifyTermsAndConditions}
                          onChange={(e) =>
                            setIsVerifyTermsAndConditions(e.target.checked)
                          }
                        />{" "}
                        I accept the
                        <a
                          className="text-decoration-none"
                          href="/terms-conditions"
                        >
                          {" "}
                          Terms of Use{" "}
                        </a>{" "}
                        &{" "}
                        <a className="text-decoration-none" href="/conditions">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {
                      isInvalid || token ==null ? null : 
                    <p className="text-danger">Please check the fields again</p>
                    }

                  </div>
                  <Button disabled={!isInvalid} type="submit">
                    Create Account
                  </Button>
                  <SignInLink />
                </Form>
              </div>
            </div>
            <div></div>
          </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.authState.error,
});

const SignUpLink = () => (
  <p>
    Don't have an account?{" "}
    <Link style={{ textDecoration: "none" }} to={ROUTES.SIGN_UP}>
      Sign Up here
    </Link>
  </p>
);

const SignUpForm = compose(
  withFirebase,
  connect(mapStateToProps)
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
