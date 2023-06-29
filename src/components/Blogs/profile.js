import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/loading";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  OTPFailure,
  OTPReset,
  changePassword,
  changeProfileImage,
  fetchSignInMethods,
  getUserData,
  linkWithEmail,
  linkWithGithub,
  linkWithGoogle,
  linkWithPhoneCredential,
  linkWithPhoneOtpGenerator,
  reAuthenticateWithCredential,
  recaptchaVerifier,
  unlinkProvider,
  updateBloggerProfile,
  usernames,
} from "../../redux/ActionCreators";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, Progress, Loader, Modal } from "rsuite";
import { getDocs, query, where } from "firebase/firestore";
import { notify } from "reapop";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { MdErrorOutline, MdManageAccounts } from "react-icons/md";
import { MyCheckbox, MyTextInput, MyTextInputArea } from "../Forms";
import Avatar from "react-avatar";
import { AdvReadMoreMore } from "read-more-more";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faXmark,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faTwitter,
  faMedium,
  faInstagram,
  faKaggle,
  faGithub,
  faGitlab,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FaUserEdit } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Alert,  Form as Rform } from "react-bootstrap";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import {
  ERROR_CODE_TOO_MANY_ATTEMPTS,
  ERROR_MSG_TOO_MANY_ATTEMPTS,
} from "../../redux/ActionTypes";
import {
  GithubLoginButton,
  GoogleLoginButton,
  createButton,
} from "react-social-login-buttons";
import "react-phone-number-input/style.css";
// const AccountSettings = ({user, open, onClose}) =>{
//   return(
//     <>
//     <Modal
//         open={open}
//         onClose={onClose}
//         style={{marginTop: "70px"}}
//       >
//         <Modal.Header>
//           <Modal.Title>Account Settings</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             <div>Change Password</div>

//           </div>
//           {user ?
//           <>{
//             JSON.stringify(user?.id)
//           }</> :
//           <div style={{ textAlign: 'center' }}>
//               <Loader size="md" />
//             </div>
//             }
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={onClose} appearance="primary">
//             Ok
//           </Button>
//           <Button onClick={onClose} appearance="subtle">
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.redirect.redirectTo);
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authState.currentUser);

  const loading = useSelector((state) => state.userState.loading);
  const profile = useSelector((state) => state.userState.user);
  const currentUser = useSelector((state) => state.authState.user);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const usernameRegEx = /^[a-z0-9_-]{3,20}$/;
  const progress = useSelector((state) => state.userState.uploadPercentage);
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const iconMap = {
    facebook: faFacebook,
    linkedin: faLinkedin,
    twitter: faTwitter,
    medium: faMedium,
    instagram: faInstagram,
    kaggle: faKaggle,
    github: faGithub,
    gitlab: faGitlab,
    whatsapp: faWhatsapp,
    portfolio: faGlobe,
  };

  const configMyPhoneAuthLoginButton = {
    text: "Link with Phone",
    icon: "phone",
    iconFormat: (name) => `fa fa-${name}`,
    style: { background: "#3b5998" },
    activeStyle: { background: "#293e69" },
  };
  const configLinkWithPasswordButton = {
    text: "Link with Password",
    icon: "lock",
    iconFormat: (name) => `fa fa-${name}`,
    style: { background: "#85adad" },
    activeStyle: { background: "#527a7a" },
  };
  /** My Facebook login button. */
  const MyPhoneAuthLoginButton = createButton(configMyPhoneAuthLoginButton);
  const LinkWithPasswordButton = createButton(configLinkWithPasswordButton);
  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
    if (id) {
      dispatch(getUserData(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, redirect]);
  const checkUsernameAvailability = (username) => {
    if (username) {
      const q = query(
        usernames(),
        where("username", "==", username?.toLowerCase())
      );
      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach((docs) => {
              if (docs.data().username?.toLowerCase() === profile?.username) {
                setIsUsernameAvailable({
                  validUsername: false,
                  inValidUsernameMsg: " is alredy set as your username!",
                });
              } else {
                setIsUsernameAvailable({
                  validUsername: false,
                  inValidUsernameMsg: " is already taken!",
                });
              }
            });
          } else {
            if (!usernameRegEx.test(username)) {
              setIsUsernameAvailable({
                validUsername: false,
                inValidUsernameMsg: "Please enter a valid username",
              });
            } else {
              setIsUsernameAvailable({
                validUsername: true,
                validUsernameMsg: " is available.",
              });
            }
          }
        })
        .catch((error) => {
          dispatch(notify({ status: "error", message: error.message }));
        });
    } else {
      return;
    }
  };
  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    dispatch(changeProfileImage(fileObj, profile.id, id));
  };

  const LinkWithEmail = ({ show1, onHide1, profile }) => {
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState(profile ? profile.email : "");

    const accountLinked = useSelector((state) => state.authState.isLinked);
    const loading1 = useSelector((state) => state.authState.loading);
    const error1 = useSelector((state) => state.authState.isLinkedError);
    let errorMessage = "";
    if (error1 && error1.code === "auth/credential-already-in-use") {
      errorMessage = "Account already linked with Google account";
    } else if (error1 && error1.code === "auth/requires-recent-login") {
      errorMessage = "Please login again and then try again!";
    } else {
      errorMessage = error1 ? error1.message : "";
    }
    const handleSubmit = (values, { setSubmitting }) => {
      dispatch(linkWithEmail(values.email, values.password));
      setSubmitting(false);
    };
    const handleEnter = () => {
      dispatch(OTPReset());
    };
    return (
      <Modal
        style={{ marginTop: "120px" }}
        onEntering={handleEnter}
        open={show1}
        onClose={onHide1}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter1">
            Link account with Email and Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!accountLinked ? (
            <div className="mx-auto">
              <Formik
                initialValues={{
                  password: "",
                  email: email,
                  acceptedTerms: false, // added for our checkbox
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .transform((value, originalValue) =>
                      originalValue.toLowerCase()
                    )
                    .email("Invalid email addresss`")
                    .required("Required"),
                  password: Yup.string()
                    .min(10, "Must be 10 characters or More")
                    .max(20, "Must be 20 characters or less")
                    .required("Password Required"),
                  acceptedTerms: Yup.boolean()
                    .required("Required")
                    .oneOf([true], "You must accept the terms and conditions."),
                })}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id="linkwithEmail">
                    <MyTextInput
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="abc@xyz.com"
                      disabled
                    />
                    <MyTextInput
                      label="Current Password"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <MyCheckbox name="acceptedTerms">
                      I accept the terms and conditions
                    </MyCheckbox>
                    {error1 ? (
                      <>
                        <div className="error">{errorMessage}</div>
                      </>
                    ) : (
                      <></>
                    )}

                    <Button
                      className="m-auto"
                      type="submit"
                      form="linkwithEmail"
                    >
                      {loading1 ? (
                        <>
                          <Loader /> &nbsp; Linking...
                        </>
                      ) : (
                        <>{accountLinked ? <>Linked</> : "Link Account"}</>
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <>
              <p>Account linked with Email and Password</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide1}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const LinkWithPhone = ({ show2, onHide2, profile }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const loading = useSelector((state) => state.authState.sendingOtp);
    const error = useSelector((state) => state.authState.isOtpError);
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [otp, setOtp] = useState("");
    const confirmObj = useSelector((state) => state.authState.reCaptchaObject);
    const otpObj = useSelector((state) => state.authState.otpObject);
    let errorMessage = "";
    const handleEnter = () => {
      dispatch(OTPReset());
    };
    const handleSubmit = (values) => {
      values.preventDefault();
      if (phoneNumber) {
        if (isValidPhoneNumber(phoneNumber)) {
          if (confirmObj) {
            try {
              dispatch(linkWithPhoneOtpGenerator(phoneNumber, confirmObj));
            } catch (error) {
              dispatch(OTPFailure(error));
            }
          } else {
            errorMessage =
              "Oh Ooops! Something happened. Please try again after some time.";
          }
        } else {
          errorMessage = "Invalid Phone Number!";
        }
      } else {
        errorMessage = "Phone number required";
      }
    };
    if (error & (error.code === ERROR_CODE_TOO_MANY_ATTEMPTS)) {
      errorMessage = ERROR_MSG_TOO_MANY_ATTEMPTS;
    } else if (error & (error.code === "auth/credential-already-in-use")) {
      errorMessage = "Account already linked with Google account";
    } else if (error & (error.code === "auth/requires-recent-login")) {
      errorMessage = "Please login again and then try again!";
    } else {
      errorMessage = error ? error.message : "";
    }

    const handleSubmitOTP = (e) => {
      e.preventDefault();
      if (otp === "" || otp === null) {
        errorMessage = "OTP is required!";
      } else {
        dispatch(linkWithPhoneCredential(otp, otpObj));
      }
    };
    return (
      <Modal
        style={{ marginTop: "120px" }}
        open={show2}
        onClose={onHide2}
        keyboard={false}
        onEntering={handleEnter}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter1"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter1">
            Link account with the Phone number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mx-auto pt-3">
            {errorMessage ? (
              <>
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setShow1(false)}
                  show={show1}
                >
                  {errorMessage}
                </Alert>
              </>
            ) : null}
            {otpObj ? (
              <Alert
                variant="success"
                dismissible
                onClose={() => setShow(false)}
                show={show}
              >
                OTP Sent Successfully to {otpObj ? otpObj.phone : ""}
              </Alert>
            ) : null}
            {!otpObj ? (
              <Rform id="linkwithEmail">
                <div id="center-btn">
                  <div className="form-group focused">
                    <PhoneInput
                      className="form-control-label"
                      placeholder="Enter phone number"
                      value={otpObj ? otpObj.phone : ""}
                      onChange={setPhoneNumber}
                      defaultCountry="IN"
                    />
                  </div>
                </div>
                <div id="recaptcha-container" />
                <div id="center-btn">
                  <Button
                    className="mt-2 "
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader />
                        &nbsp; Sending OTP...
                      </>
                    ) : (
                      <>{otpObj !== null ? "Resend OTP" : "Send OTP"}</>
                    )}
                  </Button>
                </div>

                {/* <Button className="m-auto" type="submit" form="linkwithEmail">
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" role="status" />{" "}
                          Linking...
                        </>
                      ) : (
                        <>{accountLinked ? <>Linked</> : "Link Account"}</>
                      )}
                    </Button> */}
              </Rform>
            ) : (
              <Rform id="linkwithEmailOTPverify">
                <div id="center-btn">
                  <div className="form-group focused">
                    <label className="form-control-label" htmlFor="otp">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-alternative"
                      name="otp"
                      onChange={setOtp}
                    />
                  </div>
                </div>
                <div id="center-btn">
                  <Button onClick={handleSubmitOTP}>Submit OTP</Button>
                </div>

                {/* <Button className="m-auto" type="submit" form="linkwithEmail">
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" role="status" />{" "}
                          Linking...
                        </>
                      ) : (
                        <>{accountLinked ? <>Linked</> : "Link Account"}</>
                      )}
                    </Button> */}
              </Rform>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide2}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const AccountSettings = ({ show, onHide, profile }) => {
    const [showLinkEmailModal, setShowLinkEmailModal] = useState(false);
    const [showLinkPhoneModal, setShowLinkPhoneModal] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState(profile ? profile.email : "");
    const loading = useSelector((state) => state.authState.loading);
    const error = useSelector(
      (state) => state.authState.isPasswordVerifiedError
    );
    const signinMethods = useSelector((state) => state.authState.signinMethods);
    const [showPassword, setShowPassword] = useState(false);
    const [showForm, setShowForm] = useState(true);
    useEffect(() => {
      if (showLinkPhoneModal) {
        setTimeout(() => {
          dispatch(recaptchaVerifier());
        }, 1000);
      } else {
      }
    }, [showLinkPhoneModal]);
    const handleEnter = () => {
      dispatch(fetchSignInMethods(profile?.email));
      dispatch(OTPReset());
    };
    let errorMessage = "";
    if (error & (error.code === "auth/credential-already-in-use")) {
      errorMessage = "Account already linked with Google account";
    } else if (error & (error.code === "auth/requires-recent-login")) {
      errorMessage = "Please login again and then try again!";
    } else if (error & (error.code === "auth/wrong-password")) {
      errorMessage = "Wrong Password and then try again!";
    } else {
      errorMessage = error ? error.message : "";
    }
    const handleSubmit = (values, { setSubmitting }) => {
      dispatch(
        reAuthenticateWithCredential(authUser, values.email, values.password)
      );
      setSubmitting(false);
      if (error === null) {
        setShowForm(true);
      }
    };
    const handleSubmitChangePassword = (values, { setSubmitting }) => {
      dispatch(changePassword(authUser, values.password));
      setSubmitting(false);
      if (error) {
        setShowForm(true);
      }
    };
    return (
      <Modal
        open={show}
        onClose={onHide}
        overflow
        style={{ marginTop: "60px" }}
        keyboard={false}
        size="md"
        backdrop="static"
        onEntering={handleEnter}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="text-muted">Change Account Settings</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "50vh", marginBottom: "30px" }}>
          <div className="m-auto">
            <LinkWithEmail
              show1={showLinkEmailModal}
              onHide1={() => setShowLinkEmailModal(false)}
              profile={profile}
            />
            <LinkWithPhone
              show2={showLinkPhoneModal}
              onHide2={() => setShowLinkPhoneModal(false)}
              profile={profile}
            />
            <h6 className="heading-small text-muted mb-4">Link Accounts</h6>
            <div className="mx-auto text-center row">
              {signinMethods?.includes("google.com") ? (
                <>
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                    <GoogleLoginButton
                      className="mb-3"
                      onClick={() => dispatch(unlinkProvider("google.com"))}
                    >
                      <span>Unlink with Google</span>
                    </GoogleLoginButton>
                  </div>
                </>
              ) : (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <GoogleLoginButton
                    className="mb-3"
                    onClick={() => dispatch(linkWithGoogle())}
                  >
                    <span>Link with Google</span>
                  </GoogleLoginButton>
                </div>
              )}
              {signinMethods?.includes("github.com") ? (
                <>
                  <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                    <GithubLoginButton
                      className="mb-3"
                      onClick={() => dispatch(unlinkProvider("github.com"))}
                    >
                      <span>Unlink with Github</span>
                    </GithubLoginButton>
                  </div>
                </>
              ) : (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <GithubLoginButton
                    className="mb-3"
                    onClick={() => dispatch(linkWithGithub())}
                  >
                    <span>Link with Github</span>
                  </GithubLoginButton>
                </div>
              )}
              {signinMethods?.includes("password") ? (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <LinkWithPasswordButton
                    className="mb-3"
                    onClick={() => unlinkProvider("password")}
                  >
                    <span>Unlink with Password</span>
                  </LinkWithPasswordButton>
                </div>
              ) : (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <LinkWithPasswordButton
                    className="mb-3"
                    onClick={() => setShowLinkEmailModal(true)}
                  />
                </div>
              )}
              {signinMethods?.includes("phone") ? (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <MyPhoneAuthLoginButton
                    className="mb-3"
                    onClick={() => unlinkProvider("phone")}
                  >
                    <span>Unlink with Phone </span>
                  </MyPhoneAuthLoginButton>
                </div>
              ) : (
                <div className="col-md-6 col-sm-6 col-xs-12 col-lg-5">
                  <MyPhoneAuthLoginButton
                    className="mb-3"
                    onClick={() => setShowLinkPhoneModal(true)}
                  />
                </div>
              )}
            </div>
            <h6 className="heading-small text-muted mb-4">Change Password</h6>

            <div className="row m-auto">
              <p>
                Before going to change password, First verify current password
                and then change password.{" "}
              </p>

              <div className="col-8">
                {showForm ? (
                  <div className="mx-auto">
                    <Formik
                      initialValues={{
                        password: "",
                        email: email,
                        acceptedTerms: false, // added for our checkbox
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .transform((value, originalValue) =>
                            originalValue.toLowerCase()
                          )
                          .email("Invalid email addresss`")
                          .required("Required"),
                        password: Yup.string()
                          .min(10, "Must be 10 characters or More")
                          .max(20, "Must be 20 characters or less")
                          .required("Password Required"),
                        acceptedTerms: Yup.boolean()
                          .required("Required")
                          .oneOf(
                            [true],
                            "You must accept the terms and conditions."
                          ),
                      })}
                      onSubmit={handleSubmit}
                    >
                      <Form id="verify">
                        <MyTextInput
                          label="Email Address"
                          name="email"
                          type="email"
                          placeholder="abc@xyz.com"
                          disabled
                          value={email}
                        />
                        <MyTextInput
                          label="Current Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <div className="col">
                          {error ? (
                            <>
                              <div className="error">
                                {error.code === "auth/wrong-password"
                                  ? "Wrong Password! "
                                  : error.message}
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <MyCheckbox name="acceptedTerms">
                          I accept the terms and conditions
                        </MyCheckbox>
                        <Button
                          disabled={loading}
                          className="m-auto"
                          type="submit"
                          form="verify"
                        >
                          {loading ? (
                            <>
                              <Loader /> &nbsp; Verifying...
                            </>
                          ) : (
                            <>Verify password</>
                          )}
                        </Button>
                      </Form>
                    </Formik>
                  </div>
                ) : (
                  <>
                    <div className="mx-auto text-center">
                      <p>Change password </p>
                      <Formik
                        initialValues={{
                          password: "",
                          confirmPassword: "",
                          email: email,
                          acceptedTerms: false, // added for our checkbox
                        }}
                        validationSchema={Yup.object({
                          email: Yup.string()
                            .transform((value, originalValue) =>
                              originalValue.toLowerCase()
                            )
                            .email("Invalid email addresss`")
                            .required("Required"),
                          password: Yup.string()
                            .min(10, "Must be 10 characters or More")
                            .max(20, "Must be 20 characters or less")
                            .matches(/[a-z]/, "At least one lowercase letter")
                            .matches(/[A-Z]/, "At least one uppercase letter")
                            .matches(/[0-9]/, "At least one number")
                            .matches(
                              /[^a-zA-Z0-9]/,
                              "At least one special character"
                            )
                            .required("Password Required"),
                          confirmPassword: Yup.string()
                            .required("Confirm password is required")
                            .oneOf(
                              [Yup.ref("password")],
                              "Passwords must match"
                            ),
                          acceptedTerms: Yup.boolean()
                            .required("Required")
                            .oneOf(
                              [true],
                              "You must accept the terms and conditions."
                            ),
                        })}
                        onSubmit={handleSubmitChangePassword}
                      >
                        <Form id="verify">
                          <div className="col-6">
                            <MyTextInput
                              label="Email Address"
                              name="email"
                              type="email"
                              placeholder="abc@xyz.com"
                              disabled
                              value={email}
                            />
                          </div>
                          <div className="col-6">
                            <MyTextInput
                              label="Password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                            />
                          </div>
                          <div className="col-6">
                            <MyTextInput
                              label="Confirm Password"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                            />
                          </div>
                          <div className="col">
                            <div className="form-group focused">
                              <label
                                className="form-control-label"
                                htmlFor="showPasswordField"
                              >
                                <input
                                  style={{ marginRight: "10px" }}
                                  name="showPasswordField"
                                  onChange={() =>
                                    setShowPassword(!showPassword)
                                  }
                                  type="checkbox"
                                />
                                {showPassword ? "Hide" : "Show"} Password
                              </label>
                            </div>
                          </div>

                          <MyCheckbox name="acceptedTerms">
                            I accept the terms and conditions
                          </MyCheckbox>
                          {error ? (
                            <>
                              <div className="error">{errorMessage}</div>
                            </>
                          ) : (
                            <></>
                          )}

                          <Button
                            disabled={loading}
                            className="m-auto"
                            type="submit"
                            form="verify"
                          >
                            {loading ? (
                              <>
                                <Loader /> &nbsp; Verifying...
                              </>
                            ) : (
                              <>Verify password</>
                            )}
                          </Button>
                        </Form>
                      </Formik>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      {loading ? (
        <div style={{ height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <>
          {showEdit ? (
            <div className="container-fluid mt-5 pt-4">
              <div className="card mb-4">
                <div className="card-header">
                  <div>
                    <span className="float-left">Edit profile</span>
                    <span className="float-right">
                      <Button
                        startIcon={<FcCancel />}
                        color="red"
                        appearance="ghost"
                        onClick={() => setShowEdit(false)}
                      >
                        Cancel
                      </Button>
                    </span>{" "}
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="text-dark text-center ">
                    {currentUser?.id === profile?.id ? (
                      <span className="">My Profile</span>
                    ) : (
                      <span>Profile - {profile?.username}</span>
                    )}
                  </h3>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <div className="card mb-3">
                        <div className="card-header py-3">
                          <h6 className="heading-small text-muted">
                            User Avatar
                          </h6>{" "}
                        </div>
                        <div className="card-body text-center shadow">
                          <div className=" mb-3 mt-4">
                            {profile?.photoURL ? (
                              <Avatar
                                src={profile?.photoURL}
                                name={null}
                                round={true}
                                size="95px"
                                alt={
                                  profile?.firstName + " " + profile?.lastName
                                }
                              />
                            ) : (
                              <Avatar
                                name={
                                  profile?.firstName + " " + profile?.lastName
                                }
                                round={true}
                                size="95px"
                                alt={
                                  profile?.firstName + " " + profile?.lastName
                                }
                              />
                            )}
                          </div>
                          <div className="mb-3">
                            <input
                              type="file"
                              id="profile-image"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                            <label htmlFor="profile-image">
                              <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById("profile-image")
                                    .click()
                                }
                              >
                                Change Photo
                              </button>
                            </label>
                          </div>
                          <div className="mb-0">
                            {progress > 1 && progress < 100 ? (
                              <Progress.Line
                                percent={progress}
                                status={progress === 100 ? "success" : "active"}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="text-primary fw-bold m-0">Projects</h6>
                                </div>
                                <div className="card-body">
                                    <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
                                    <div className="progress progress-sm mb-3">
                                        <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}><span className="visually-hidden">20%</span></div>
                                    </div>
                                    <h4 className="small fw-bold">Sales tracking<span className="float-end">40%</span></h4>
                                    <div className="progress progress-sm mb-3">
                                        <div className="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "40%"}}><span className="visually-hidden">40%</span></div>
                                    </div>
                                    <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
                                    <div className="progress progress-sm mb-3">
                                        <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}><span className="visually-hidden">60%</span></div>
                                    </div>
                                    <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
                                    <div className="progress progress-sm mb-3">
                                        <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: "80%"}}><span className="visually-hidden">80%</span></div>
                                    </div>
                                    <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
                                    <div className="progress progress-sm mb-3">
                                        <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}><span className="visually-hidden">100%</span></div>
                                    </div>
                                </div>
                            </div> */}
                    </div>
                    <div className="col-lg-8">
                      <div className="row mb-3 d-none">
                        <div className="col">
                          <div className="card textwhite bg-primary text-white shadow">
                            <div className="card-body">
                              <div className="row mb-2">
                                <div className="col">
                                  <p className="m-0">Peformance</p>
                                  <p className="m-0">
                                    <strong>65.2%</strong>
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <i className="fas fa-rocket fa-2x"></i>
                                </div>
                              </div>
                              <p className="text-white-50 small m-0">
                                <i className="fas fa-arrow-up"></i>&nbsp;5%
                                since last month
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card textwhite bg-success text-white shadow">
                            <div className="card-body">
                              <div className="row mb-2">
                                <div className="col">
                                  <p className="m-0">Peformance</p>
                                  <p className="m-0">
                                    <strong>65.2%</strong>
                                  </p>
                                </div>
                                <div className="col-auto">
                                  <i className="fas fa-rocket fa-2x"></i>
                                </div>
                              </div>
                              <p className="text-white-50 small m-0">
                                <i className="fas fa-arrow-up"></i>&nbsp;5%
                                since last month
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <div className="card shadow mb-3">
                            <div className="card-header py-3">
                              <h6 className="heading-small text-muted">
                                User information
                              </h6>{" "}
                            </div>
                            <div className="card-body">
                              <Formik
                                initialValues={{
                                  ...profile,
                                  username: profile?.username,
                                  admin: profile?.roles?.ADMIN ? true : false,
                                  publisher: profile?.roles?.PUBLISHER ? true : false,
                                }}
                                validateOnChange={true}
                                validationSchema={Yup.object({
                                  firstName: Yup.string()
                                    .max(15, "Must be 15 characters or less")
                                    .min(3, "Must be 3 characters or more")
                                    .required("First Name is Required"),
                                  lastName: Yup.string()
                                    .max(20, "Must be 20 characters or less")
                                    .min(3, "Must be 3 characters or more")
                                    .required("Last Name is Required"),
                                  email: Yup.string()
                                    .transform((value, originalValue) =>
                                      originalValue.toLowerCase()
                                    )
                                    .email("Invalid email address")
                                    .required("Email is Required"),
                                  username: Yup.string()
                                    .transform((value, originalValue) =>
                                      originalValue.toLowerCase()
                                    )
                                    .max(15, "Must be 15 characters or less")
                                    .min(3, "Must be 3 characters or more")
                                    .matches(usernameRegEx, "Invalid username")
                                    .required("Username is Required"),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                  setTimeout(() => {
                                    dispatch(
                                      updateBloggerProfile(
                                        values,
                                        profile?.id,
                                        profile?.username
                                      )
                                    );
                                    setSubmitting(false);
                                  }, 400);
                                }}
                              >
                                {({ values, setValues, touched, errors }) => (
                                  <Form id="user-info">
                                    <div className="pl-lg-4">
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group focused">
                                            <label
                                              className="form-control-label"
                                              htmlFor="username"
                                            >
                                              Username
                                            </label>
                                            <input
                                              className="form-control form-control-alternative"
                                              defaultValue={values?.username}
                                              onChange={(name) => {
                                                setValues({
                                                  ...values,
                                                  username:
                                                    name.target.value?.toLowerCase(),
                                                });
                                                checkUsernameAvailability(
                                                  name.target.value
                                                );
                                              }}
                                              type="text"
                                              placeholder="Username"
                                              name="username"
                                            />
                                            {isUsernameAvailable?.validUsername ? (
                                              <div className="text-success">
                                                {isUsernameAvailable?.validUsernameMsg ? (
                                                  <>
                                                    <FcCheckmark></FcCheckmark>{" "}
                                                    {values?.username?.toLowerCase()}{" "}
                                                    {
                                                      isUsernameAvailable?.validUsernameMsg
                                                    }
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            ) : (
                                              <div className="text-danger">
                                                {isUsernameAvailable?.inValidUsernameMsg ? (
                                                  <>
                                                    <MdErrorOutline></MdErrorOutline>{" "}
                                                    {values?.username?.toLowerCase()}{" "}
                                                    {
                                                      isUsernameAvailable?.inValidUsernameMsg
                                                    }
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            )}
                                            {touched?.username &&
                                            errors?.username ? (
                                              <div className="error">
                                                {errors?.username}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <MyTextInput
                                          label="Email"
                                          name="email"
                                          type="email"
                                          disabled
                                          placeholder="test@example.com"
                                        />
                                      </div>
                                      <div className="row">
                                        <MyTextInput
                                          label="First Name"
                                          name="firstName"
                                          type="text"
                                          placeholder="Jane"
                                        />

                                        <MyTextInput
                                          label="Last Name"
                                          name="lastName"
                                          type="text"
                                          placeholder="Doe"
                                        />
                                      </div>

                                      {currentUser?.roles["ADMIN"] ? (
                                        <div className="row">
                                          <div className="col-3">
                                          <MyCheckbox name="admin">
                                            admin previlages{" "}
                                          </MyCheckbox>
                                          </div>
                                          <div className="col-3">
                                          <MyCheckbox name="publisher">
                                            Publisher previlages{" "}
                                          </MyCheckbox>
                                          </div>
                                        </div>
                                      ) : null}
                                      
                                    </div>
                                    <div>
                                      <Button id="user-info" type="submit">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="heading-small text-muted">
                                Contact information
                              </h6>
                            </div>
                            <div className="card-body">
                              <Formik
                                initialValues={{
                                  ...profile,
                                  username: profile?.username,
                                }}
                                validateOnChange={true}
                                validationSchema={Yup.object({
                                  address: Yup.string()
                                    .max(50, "Must be 50 characters or less")
                                    .min(5, "Must be 5 characters or more")
                                    .required("Address is Required"),
                                  city: Yup.string()
                                    .max(20, "Must be 20 characters or less")
                                    .min(5, "Must be 5 characters or more")
                                    .required("City is Required"),
                                  country: Yup.string()
                                    .max(20, "Must be 20 characters or less")
                                    .min(3, "Must be 3 characters or more")
                                    .required("Country is Required"),
                                  postalCode: Yup.string()
                                    .max(6, "Must be 6 characters")
                                    .min(6, "Must be 6 characters")
                                    .required("pincode is Required"),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                  setTimeout(() => {
                                    dispatch(
                                      updateBloggerProfile(
                                        values,
                                        profile?.id,
                                        profile?.username
                                      )
                                    );
                                    setSubmitting(false);
                                  }, 400);
                                }}
                              >
                                {({
                                  values,
                                  handleChange,
                                  handleBlur,
                                  setValues,
                                  touched,
                                  errors,
                                }) => (
                                  <Form id="contact-info">
                                    <div className="pl-lg-4">
                                      <div className="row">
                                        <div className="col-6">
                                          <div className="form-group focused">
                                            <label className="form-control-label">
                                              Phone number
                                            </label>
                                            <PhoneInput
                                              className="form-control-label"
                                              placeholder="Enter phone number"
                                              value={values.phoneNumber}
                                              onChange={(value) =>
                                                setValues({
                                                  ...values,
                                                  phoneNumber: value,
                                                })
                                              }
                                              defaultCountry="IN"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="pl-lg-4">
                                      <div className="row">
                                        <MyTextInput
                                          label="Address"
                                          name="address"
                                          type="text"
                                          placeholder="Address"
                                        />
                                      </div>
                                    </div>
                                    <div className="pl-lg-4">
                                      <div className="row">
                                        <MyTextInput
                                          label="City"
                                          name="city"
                                          type="text"
                                          placeholder="City"
                                        />
                                        <MyTextInput
                                          label="Country"
                                          name="country"
                                          type="text"
                                          placeholder="Country"
                                        />
                                        <MyTextInput
                                          label="Postal Code"
                                          name="postalCode"
                                          type="text"
                                          placeholder="postal Code"
                                        />
                                      </div>
                                    </div>
                                    <hr className="my-4"></hr>
                                    <div>
                                      <Button type="submit" id="contact-info">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col">
                          <div className="card shadow mb-5">
                            <div className="card-header py-3">
                              {" "}
                              <h6 className="heading-small text-muted">
                                About me
                              </h6>
                            </div>
                            <div className="card-body">
                              <Formik
                                initialValues={{
                                  ...profile,
                                  username: profile?.username,
                                }}
                                validateOnChange={true}
                                validationSchema={Yup.object({
                                  aboutMe: Yup.string()
                                    .min(3, "Must be 3 characters or more")
                                    .required("About  is Required"),
                                  tagLine: Yup.string()
                                    .max(50, "Must be 50 characters or less")
                                    .min(10, "Must be 10 characters or more")
                                    .required("A Tag line  is Required"),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                  setTimeout(() => {
                                    dispatch(
                                      updateBloggerProfile(
                                        values,
                                        profile?.id,
                                        profile?.username
                                      )
                                    );
                                    setSubmitting(false);
                                  }, 400);
                                }}
                              >
                                <Form id="about">
                                  <div className="pl-lg-4">
                                    <MyTextInputArea
                                      rows="3"
                                      label="A Tag Line"
                                      name="tagLine"
                                      placeholder="Ex: Masters Student at Cleveland State University"
                                    />
                                  </div>
                                  <div className="pl-lg-4">
                                    <MyTextInputArea
                                      rows="4"
                                      label="About Me"
                                      name="aboutMe"
                                      placeholder="A few words about you ..."
                                    />
                                  </div>

                                  <div>
                                    <Button id="about" type="submit">
                                      Save Changes
                                    </Button>
                                  </div>
                                </Form>
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col">
                          <div className="card shadow mb-5">
                            <div className="card-header py-3">
                              {" "}
                              <h6 className="heading-small text-muted">
                                Social Media Links
                              </h6>
                            </div>
                            <div className="card-body">
                              <Formik
                                initialValues={{
                                  ...profile,
                                  username: profile?.username,
                                }}
                                validateOnChange={true}
                                validationSchema={Yup.object().shape({
                                  social: Yup.array().of(
                                    Yup.object().shape({
                                      name: Yup.string().required(
                                        "Name is required!."
                                      ),
                                      link: Yup.string().required(
                                        "Link is required!."
                                      ),
                                    })
                                  ),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                  setTimeout(() => {
                                    dispatch(
                                      updateBloggerProfile(
                                        values,
                                        profile?.id,
                                        profile?.username
                                      )
                                    );
                                    setSubmitting(false);
                                  }, 400);
                                }}
                              >
                                {({ values }) => (
                                  <Form id="about">
                                    <FieldArray name="social">
                                      {({ insert, remove, push }) => (
                                        <div>
                                          {values?.social?.length > 0 &&
                                            values?.social?.map(
                                              (social, index) => (
                                                <div
                                                  className="row"
                                                  key={index}
                                                >
                                                  <div className="col-5">
                                                    <MyTextInput
                                                      label="Social Media name"
                                                      name={`social.${index}.name`}
                                                      placeholder="Ex: Github"
                                                      type="text"
                                                    />
                                                  </div>
                                                  <div className="col-5">
                                                    <MyTextInput
                                                      label="Social Media link"
                                                      name={`social.${index}.link`}
                                                      placeholder="Ex: https://github.com/react"
                                                      type="text"
                                                    />
                                                  </div>
                                                  <div className="col-2">
                                                    <div className="col row">
                                                      &nbsp;
                                                    </div>
                                                    <Button
                                                      type="button"
                                                      className="secondary m-2"
                                                      onClick={() =>
                                                        remove(index)
                                                      }
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faXmark}
                                                      />
                                                    </Button>
                                                  </div>
                                                </div>
                                              )
                                            )}
                                          <div className="d-flex justify-content-center gap-4 align-items-center align-content-center text-center">
                                            <Button
                                              type="button"
                                              className="secondary text-center"
                                              onClick={() =>
                                                push({ name: "", link: "" })
                                              }
                                            >
                                              Add Social link
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </FieldArray>
                                    <div>
                                      <Button id="about" type="submit">
                                        Save Changes
                                      </Button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div>
                    <span className="float-right">
                      <Button
                        startIcon={<IoIosClose size={20} />}
                        color="cyan"
                        appearance="primary"
                        onClick={() => {
                          setShowEdit(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        Close Editor
                      </Button>
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="container mt-5 pt-2 mb-4"
              style={{ height: "100vh" }}
            >
              <AccountSettings
                profile={profile}
                show={showModal}
                onHide={() => setShowModal(false)}
              />
              <div className="container-fluid mt-5 pt-5">
                <div className="row gap-2">
                  <div className=" col-lg-4 col-sm-12 col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col">
                        <div className="card ">
                          <div className="text-center m-3">
                            <div className=" mb-3 mt-4">
                              {profile?.photoURL ? (
                                <Avatar
                                  src={profile?.photoURL}
                                  name={null}
                                  round={true}
                                  size="95px"
                                  alt={
                                    profile?.firstName + " " + profile?.lastName
                                  }
                                />
                              ) : (
                                <Avatar
                                  name={
                                    profile?.firstName + " " + profile?.lastName
                                  }
                                  round={true}
                                  size="95px"
                                  alt={
                                    profile?.firstName + " " + profile?.lastName
                                  }
                                />
                              )}
                            </div>
                            <div className="fw-bold">
                              {profile?.firstName + " " + profile?.lastName}
                            </div>
                            <div>{profile?.email}</div>
                            <div>{profile?.roles && profile?.roles["PUBLISHER"]  ? "Publisher" : ''}</div>
                            <div className="m-auto p-2">
                              <Button
                                color="cyan"
                                appearance="primary"
                                onClick={() => setShowEdit(true)}
                                startIcon={<FaUserEdit size={20} />}
                              >
                                <span className="mt-1">Edit Profile</span>
                              </Button>
                            </div>
                            {currentUser?.id === profile?.id ||
                            currentUser?.roles?.["ADMIN"] ? (
                              <div className="m-auto p-2">
                                <Button
                                  color="cyan"
                                  appearance="primary"
                                  onClick={() => setShowModal(true)}
                                  startIcon={<MdManageAccounts size={20} />}
                                >
                                  <span className="mt-1">Account Settings</span>
                                </Button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-lg-7 col-sm-12 col-md-12 col-xs-12">
                    <div className="row">
                      <div className="col">
                        <div className="card">
                          <div className="m-3">
                            <span className="text-uppercase fs-4 fw-bolder border-bottom">
                              About me
                            </span>
                            <p className="fw-semibold">{profile?.tagLine ? profile?.tagLine : 'Details Not Found: Please update your profile '}</p>
                            <p>
                              {profile?.aboutMe ? (
                                <AdvReadMoreMore
                                  text={profile?.aboutMe}
                                  parseHtml
                                  checkFor={500}
                                  linesToShow={4}
                                />
                              ) : null}
                            </p>
                            <p className="row">
                              {profile?.address ? (
                                <div className="col-md-6 col-12">
                                  <div className="row">
                                    <div className="col-12">
                                      <span className="text-muted">
                                        Address :
                                      </span>
                                    </div>
                                    <div className="col-12">
                                      <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                        href={`https://www.google.com/maps/search/?api=1&query=${
                                          profile?.address +
                                          " " +
                                          profile?.city +
                                          " " +
                                          profile?.country
                                        }`}
                                      >
                                        <FontAwesomeIcon
                                          color="red"
                                          icon={faLocationDot}
                                        />{" "}
                                        &nbsp;
                                        {profile?.address +
                                          " " +
                                          profile?.city +
                                          " " +
                                          profile?.country +
                                          "."}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {profile?.phoneNumber ? (
                                <span className="col-md-6 col-12">
                                  <div className="row">
                                    <div className="col-12">Phone :</div>
                                    <div className="col-12">
                                      <a
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                        href={`tel:${profile?.phoneNumber}`}
                                      >
                                        <FontAwesomeIcon icon={faPhone} />
                                        &nbsp;
                                        {profile?.phoneNumber}
                                      </a>
                                    </div>
                                  </div>
                                </span>
                              ) : null}
                            </p>
                            <p className="row mt-3 d-flex align-items-center gap-4 align-items-center align-content-center text-center">
                              {profile?.social ? (
                                <div className="col">
                                  {profile?.social?.map((social) => {
                                    const Icon =
                                      iconMap[social.name] || faGlobe;
                                    return (
                                      <span className="m-2">
                                        <Link
                                          to={social.link}
                                          key={social.name}
                                        >
                                          <FontAwesomeIcon
                                            icon={Icon}
                                            size="lg"
                                          />
                                        </Link>
                                      </span>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
