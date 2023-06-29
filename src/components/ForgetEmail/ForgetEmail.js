import React, { useState, useRef } from "react";
import "./index.css";
import { Card, Form, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import { getUserMetaDataByUsername } from "../../redux/ActionCreators";
import { ReCaptchaV2, EReCaptchaV2Size,
	EReCaptchaV2Theme, } from "react-recaptcha-x";
import { notify } from "reapop";
import { Link } from "react-router-dom";
const ForgotEmail = () => {
  const isInvalid = useRef(false);
  const isUsernameValid = useRef(useSelector(state => state.userState.isUsernameValid))
  const user = useRef(useSelector(state=> state.userState.user))
	const [username, setUsername] = useState("");
	const dispatch = useDispatch();
	const [token, setToken] = useState();
	const [tokenError, setTokenError] = useState(null);
  const handleUsername = (e) =>{
	setUsername(e.target.value)
  }
  const next = (e) => {
	e.preventDefault();
	dispatch(getUserMetaDataByUsername(username))
	if(isUsernameValid.current && token){
		isInvalid.current = true;
	} 
  };
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
  return (
    <div
      className="col-md-5 col-sm-10 col-xs-12 col-lg-4  mx-auto mt-5 pt-5"
    >
      <Card body className="text-center border">
      <Card.Title tag="h3 mt-5">Forgot your Email</Card.Title>
        <div>
          <div
            style={{
              textAlign: "left",
              marginLeft: "5%",
              marginRight: "5%",
              marginTop: "10%",
            }}
          >
            <p className="text-secondary"></p>Please enter a valid username
            you'd like to know which your email address linked to your username.
          </div>
          <div className="mt-4">
            <div>
              {isInvalid.current && user.current !== null? (
                <>
				Username found 
				with email: {user.current.email}
				</>
              ) : (
                <>
                  <Form>
                    <div
                      className="floating-container"
                    >
                      <div className="mt-1 mb-3">
                        <div className="mt-1 did-floating-label-content">
                          <input
                            className="did-floating-input"
                            type="text"
                            placeholder=" "
                            value={username}
                            onChange={handleUsername}
                          />
                          <label className="did-floating-label">Username</label>
                        </div>
                      </div>
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
                        <div
                          className="col mt-2"
                        >
                          <Link className="forgot-email" to="/login">
                            Back to Login
                          </Link>
                        </div>
                        <div
                          className=" col"
                        >
                          <Button className="next-button" onClick={next} disabled={!token}>
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.userState.error,
  redirect: state.redirect.redirectTo,
  isUsernameValid: state.userState.isUsernameValid,
  user: state.userState.user
});
const ForgotEmailForm = compose(
  withFirebase,
  connect(mapStateToProps)
)(ForgotEmail);

export default withFirebase(ForgotEmailForm);
