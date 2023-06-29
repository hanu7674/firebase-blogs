import React, { useRef, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { Card, Button, Form } from "react-bootstrap";
import { withFirebase } from "../../firebase";
import * as ROUTES from "../constants/routes";
import { doResetPassword } from "../../redux/ActionCreators";
import { SignInLink } from "../SignIn";
import { FaUserCircle } from "react-icons/fa";
import { getUserMetaData } from "../../redux/ActionCreators";
import { notify } from 'reapop';
import Loading from "../Loading/loading";
import Avatar from "react-avatar";

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);
const PasswordForgetFormBase = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(useSelector((state) => state.userState.userMetaData.email) );
  const resetButton = useRef(false)
  const loading = useSelector(state => state.userState.loading)
  const [isVerifyTermsAndConditions, setIsVerifyTermsAndConditions] =
    useState(false);
  const isResetPasswordEmailSent = useSelector(
    (state) => state.authState.isResetPasswordEmailSent
  );
  const usermetadata = useSelector((state) => state.userState.userMetaData);
  const handleEmail =(event) => {
    setEmail(event.target.value)
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
  const isInvalid = email !== null && isVerifyTermsAndConditions
  const getMyInfo = (e) =>{
    e.preventDefault();
    if (emailValidation(email)) {
        dispatch(getUserMetaData(email))
        resetButton.current = true
    } else {
      dispatch(notify({ title: "Hanumanth's blog Webapp", message: "Check your email! and Try again correctly.", status: 'warning'}));
    }
  }
  const onSubmit = (event) => {
    dispatch(doResetPassword(email));
    event.preventDefault();
  };

  return (
    <>
    {
      loading ? <Loading/> : <>
      {isResetPasswordEmailSent ? (
        <>
          <div className="col-md-5 col-sm-10 col-xs-12 col-lg-4  mx-auto mt-5 pt-5">
            <Card body className="text-center border">
            <Card.Title tag="h3 mt-2">PLACEMENT's PORTAL</Card.Title>
            <div>
            <div className="text-secondary m-5" style={{ textAlign: "left" }} 
                      >
            Password Reset E-Mail confirmation sent to: {email}<br></br>
            Check you E-Mails (Spam folder included) for a Password Reset
            E-Mail.
                </div>
                <p className='mt-2'>
    <Link style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
      Click here to login
    </Link>
  </p>
            </div>
</Card>
          </div>
        </>
      ) : (
        <>
          <div
            className="col-md-5 col-sm-10 col-xs-12 col-lg-4  mx-auto mt-5 pt-5"
          >
            <Card body className="text-center border">
              {/* <Logo props={this.props} /> */}
              {/* <p>Logo here</p> */}
              <div>
                <Card.Title tag="h3" className="mt-2">Reset your password</Card.Title>

                <div style={{ textAlign: "left", marginLeft:"15%", marginRight: '15%', marginTop:"10%" }}>
                  <p className="text-secondary"></p>Please enter the valid email address you'd like your password reset information sent to 
                </div>
                <div >
                  <Form onSubmit={onSubmit}>
                    <div
                      className="floating-container"
                    >
                                          {
                      usermetadata.photoURL ? (
                        <Avatar src={usermetadata?.photoURL} name={usermetadata?.firstName +" " +usermetadata?.lastName} round={true} size='95px' />
                        
                      ) : (
                        <Avatar name={usermetadata?.firstName +" " +usermetadata?.lastName} round={true} size='95px'/>
                      )
                    }
                      
                      <div className="mt-4">
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
                      </div>
                      {
                        usermetadata.email && usermetadata.uid ? 
                        <>
                        <div style={{ textAlign: "left" }}>
                          <p>Email: <span style={{fontWeight: 'bold'}}>{usermetadata.email}</span></p>
                          <p>First Name: <span style={{fontWeight: 'bold'}}>{usermetadata.firstName}</span></p>
                          <p>Last Name: <span style={{fontWeight: 'bold'}}>{usermetadata.lastName}</span></p>
                        </div>
                        </> : <></>
                      }
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
                    </div>
                    {
                      resetButton.current ? <div className=" d-flex justify-content-around" style={{ marginLeft:"15%", marginRight: '15%'}}> 
                      <Button onClick={getMyInfo}>Get My info Again</Button>
                      <Button type="submit">
                      Reset My Password
                    </Button>
                    </div> : <><Button disabled={!isInvalid} onClick={getMyInfo}>Get My Info</Button></>
                    }
                    <div className="mt-1">

                    <Link style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
      Back to Login
    </Link></div>
                  </Form>
                </div>
              </div>
              <div></div>
            </Card>
          </div>
        </>
      )}
      </> }
    </>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const mapStateToProps = (state) => ({
  error: state.authState.error,
  redirect: state.redirect.redirectTo,
  isResetPasswordEmailSent: state.authState.isResetPasswordEmailSent,
  usermetadata: state.userState,
});
const PasswordForgetForm = compose(
  withFirebase,
  connect(mapStateToProps)
)(PasswordForgetFormBase);
export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
