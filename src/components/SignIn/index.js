import React, {  useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { compose } from 'recompose';
import { Card, Form,Button  } from "react-bootstrap";
import {  FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../constants/routes';
import { getUserMetaData, login, OAuthLogin } from '../../redux/ActionCreators';
import { notify } from 'reapop';
import { ReCaptchaV2, EReCaptchaV2Size,
	EReCaptchaV2Theme, } from "react-recaptcha-x";
// CSS
import "./index.css";
import { 
  GoogleLoginButton, GithubLoginButton, 
  // createButton
 } from 'react-social-login-buttons';
import Avatar from 'react-avatar';

// const config = {
//   text: "Log in with Phone",
//   icon: "phone",
//   iconFormat: name => `fa fa-${name}`,
//   style: { background: "#3b5998" },
//   activeStyle: { background: "#293e69" }
// };
// /** My Facebook login button. */
// const MyPhoneAuthLoginButton = createButton(config);

const SignInPage = () => (
  <>
    <SignInForm />
  </>
);
function SignInFormBase() {
  const [email, setEmail] = useState(useSelector((state) => state.userState?.userMetaData?.email))
  const [password, setPassword] = useState('')
  const [passwordFormShow, setPasswordFormShow] = useState(false)
  const navigate = useNavigate();
  const  dispatch = useDispatch();
  const usermetadata = useSelector((state) => state.userState.userMetaData);
  const [token, setToken] = useState(null);
  const redirect = useSelector(state => state.redirect.redirectTo)
	const [tokenError, setTokenError] = useState(null);
  const redirectUrl = localStorage.getItem('redirectUrl');
  const error = useSelector((state) => state.authState.loginError);
  const [loginError, setLoginError] = useState(error ? error : null);
  const currentUser = useSelector((state) => state.authState.currentUser);
  const setErrors = () => {
    setLoginError(null)
  }
  useEffect(()=>{
    setErrors()
    if(redirect){
      navigate(redirect)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    if(currentUser){
      navigate('/')
    }
    return () => {setErrors()}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[redirect, currentUser])

  const handleEmail =(event) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const emailValidation = (email) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
  const v2CallbackA = (token) => {
    if (typeof token === 'string') {
      setToken(token)
    } else if (typeof token === 'boolean' && !token) {
		setToken(null)
	  dispatch(notify({message: "Please Verify you are not robot again!", status:'error'}))
    } else if (token instanceof Error) {
		setToken(null)
      setTokenError(true)
	  dispatch(notify({message: tokenError, status:'error'}))

    }
  }
  const emailNext = (e) => {
    e.preventDefault();
    if (emailValidation(email)) {
        dispatch(getUserMetaData(email))
        setPasswordFormShow(true)        
    } else {
      dispatch(notify({ title: "Hanumanth's Webapp", message: "Check your email! and Try again correctly.", status: 'warning'}));
    }
  }
  const showEmailInput = () => {
    setPasswordFormShow(false)
    setErrors(null)
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    await dispatch(login(email, password, redirectUrl))

  };
    return (
      <>
            <div
          className="col-md-5 col-sm-10 col-xs-12 col-lg-4  mx-auto mt-5 pt-5"
        >
          <Card body className="text-center border">
            {/* <Logo props={this.props} /> */}
            {/* <p>Logo here</p> */}
            <div>
              <Card.Title tag="h3 mt-5">Login</Card.Title>

              <div className="mt-4">
                <Form className=" mt-2" onSubmit={handleSubmit}>
                  {passwordFormShow ? (
                    ""
                  ) : (
                    <>
                      <div
                        className="floating-container"
                      >
                        <GoogleLoginButton  className='mb-3'
                        onClick={() => dispatch(OAuthLogin('google', redirectUrl))}/>
                        <GithubLoginButton className='mb-3'
                        onClick={() => dispatch(OAuthLogin('github', redirectUrl))}/>
                        {/* <MyPhoneAuthLoginButton className='mb-3'
                        onClick={() => dispatch(OAuthLogin('phone', redirectUrl))}/> */}
                Or
                        <div className="mt-3 did-floating-label-content">
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
                      </div>

                      <div className="mb-3 mt-2 row">
                        <div className="col-6 col-md-5 mt-2">
                          <Link className="forgot-email" to="/forget-email">
                            Forgot email?
                          </Link>
                        </div>
                        <div className="offset-md-4 offset-1 col-3">
                          <button
                            className="next-button"
                            onClick={emailNext}
                          >
                            Next
                          </button>
                        </div>
                      </div>
        <SignUpLink />

                    </>
                  )}
                  {passwordFormShow ? (
                    <>
                    {
                      usermetadata.photoURL ? (
                        <Avatar src={usermetadata?.photoURL} name={usermetadata?.firstName +" " +usermetadata?.lastName} round={true} size='95px' />
                        
                      ) : (
                        <Avatar name={usermetadata?.firstName +" " +usermetadata?.lastName} round={true} size='95px'/>
                      )
                    }
                    
                      <div >

                        <div
                          className="email-show mt-3 mb-3"
                          onClick={showEmailInput}
                        >
                          <FaUserCircle className="ml-1" /> {email}{" "}
                          <IoIosArrowDown />
                        </div>
                      </div>
                      <div className="floating-container">
                        <div className="did-floating-label-content">
                          <input
                            className="did-floating-input"
                            type="password"
                            autoComplete='password'
                            placeholder=" "
                            onChange={handlePassword}
                          />
                          <label className="did-floating-label">
                            Enter password
                          </label>
                        </div>
                      </div>
                      {
                        loginError ? <span className='text-danger'>{loginError?.message === "Firebase: Error (auth/missing-password)." ? <>Missing password</> : <>{loginError?.message}</>}</span> : null
                      }
                      <div style={{
						display: "flex",
                        justifyContent: "center",
						alignItems: "center"
					  }}>
						<ReCaptchaV2
            id="forgot-email"
            // className="test"
            data-test-id="forgot-email"
            callback={v2CallbackA}
            theme={EReCaptchaV2Theme.Light}
            size={EReCaptchaV2Size.Normal}
          />
					  </div>
                      <div className="mb-3 mt-5 row">
                        <div className="col-6 col-md-5 mt-2">
                          <Link
                            className="forgot-email"
                            to={{
                              pathname: "/pw-forget",
                              state: {
                                email: email,
                                emailPresents: true,
                              },
                            }}
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="offset-md-4 offset-1 col-3">
                          <Button className="next-button" type='submit' disabled={!token && (password.length != null)}>
                            Login
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </Form>
              </div>
            </div>
            <div> Terms and Conditions (Privacy policy)</div>
          </Card>
        </div>
      </>
      
    );
  
}

const mapStateToProps = state =>(
  {
    error : state.authState.error,
    redirect: state.redirect.redirectTo,
    usermetadata: state.userState.userMetaData,
  }
)
const SignInForm = compose(
  withFirebase, connect(mapStateToProps)
)(SignInFormBase);

const SignInLink = () => (
  <p className='mt-2'>
    Already have an account?{" "}
    <Link style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
      Login in here
    </Link>
  </p>
);


export default SignInPage;

export { SignInForm, SignInLink };
