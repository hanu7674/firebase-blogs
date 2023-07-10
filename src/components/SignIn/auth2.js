import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, ListGroup, Spinner,Button,
    Alert,
    Modal,
    Form as Rform, } from "react-bootstrap";
import { mfaAuth, phoneOTPGenerator, confirmMFAAuth } from "../../redux/ActionCreators";
import { ERROR_CODE_TOO_MANY_ATTEMPTS, ERROR_MSG_TOO_MANY_ATTEMPTS } from "../../redux/ActionTypes";
import Logo from "../../Assets/images/logo/logo-transparent-png.png";

const Auth2 = () => {
  const multifactors = useSelector((state) => state.authState.multifactors);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedAuth, setSelectedAuth] = useState("");
  const dispatch = useDispatch();
  const LinkWithPhone = ({ show2, onHide2 }) => {

    const loading = useSelector((state) => state.authState.sendingOtp);
    const error = useSelector((state) => state.authState.isMFAReCaptchaError);
    const [show, setShow] = useState(true);
    const [otp, setOtp] = useState("");
    const session = useSelector((state) => state.authState.multifactors.obj.session);
    const confirmObj = useSelector((state) => state.authState.mfaReCaptchaObject);
    const otpObj = useSelector((state) => state.authState.otpObject);

    let errorMessage = '';
    useEffect(() => {
      setTimeout(async () => {
        await dispatch(mfaAuth());
      }, 2000);
    }, []);
    const handleSubmit = async (values) => {
      values.preventDefault();
      if (confirmObj && session) {
        await dispatch(phoneOTPGenerator(selectedAuth, session,confirmObj))
            }
            else{
            errorMessage = "Oh Ooops! Something happened. Please try again after some time.";
            }
    };
    if(error & (error.code === ERROR_CODE_TOO_MANY_ATTEMPTS)){
      errorMessage = ERROR_MSG_TOO_MANY_ATTEMPTS;
    }
    else if (error & (error.code === "auth/credential-already-in-use")) {
      errorMessage = "Account already linked with Google account";
    } else if (error & (error.code === "auth/requires-recent-login")) {
      errorMessage = "Please login again and then try again!";
    }
    else{
      errorMessage = error? error.message : "";
    }
    const handleSubmitOTP = (e) => {
      e.preventDefault();
      if(otp === "" || otp === null ){
        errorMessage = "OTP is required!"
      }
      else{
        dispatch(confirmMFAAuth(otp,otpObj, multifactors.obj ))
      }
    };
    return (
      <Modal
        show={show2}
        onHide={onHide2}
        keyboard={false}
        data-aos="fade-up"
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter1"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter1">
            Multi Factor Authentication (MFA) with the Phone number
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Alert variant="danger" dismissible onClose={() => setShow(false)} show={show}>{errorMessage}</Alert>
        {
          otpObj? 
        <Alert variant="success" dismissible onClose={() => setShow(false)} show={show}>OTP Sent Successfully to {otpObj? otpObj.phone: ""}</Alert>: ""
         } <div className="m-auto">
            <Rform id="verifyPhone" onSubmit={handleSubmit}>
              <div  className="row" id="center-btn">
              Send OTP to this number { selectedAuth.phoneNumber}
              </div>
              <div  id="recaptcha-container-id" />
              <div id="center-btn">
              <Button  className="mt-2 " type="submit" disabled={loading}>
                {
                  loading ? <>
                  <Spinner size="sm" animation="border" role="status" />{" "}
                      Sending OTP...
                  </> : <>
                    {
                      otpObj !== null ? "Resend OTP" : "Send OTP"
                    }
                  
                  </>
                }
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
            <Rform id="verifyPhoneOTP" onSubmit={handleSubmitOTP}>
            <div  className="row" id="center-btn">
              <div  className="col-8">
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

              </div>
              <div id="center-btn">
              <Button  type="submit">Submit OTP</Button>

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
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onHide2}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
    // const li = [
    //     {
    //         "factorId": "phone",
    //         "uid": "3cbaa817-a904-47b0-b004-ea3e0bb33bba",
    //         "enrollmentTime": "Wed, 25 Jan 2023 19:50:03 GMT",
    //         "displayName": "",
    //         "phoneNumber": "+********0018"
    //     },
    //     {
    //         "factorId": "email",
    //         "uid": "3cbaa817-a904-47b0-b004-ea3e0bb33bba",
    //         "enrollmentTime": "Wed, 25 Jan 2023 19:50:03 GMT",
    //         "displayName": "",
    //         "phoneNumber": "+********0018"
    //     },
    //     {
    //         "factorId": "google",
    //         "uid": "3cbaa817-a904-47b0-b004-ea3e0bb33bba",
    //         "enrollmentTime": "Wed, 25 Jan 2023 19:50:03 GMT",
    //         "displayName": "",
    //         "phoneNumber": "+********0018"
    //     }
    // ]
    const onSelectedAuth = (i) =>{
        setSelectedAuth(i)
        setTimeout(()=>{
          setShowPhoneModal(true)
        },1000)
    }
  return (
    <div>
      <div
        className="col-md-5 col-12  mx-auto mt-5"
        data-aos="fade-down"
        data-aos-delay="500"
      >
        <Card body className=" border">
          <div>
          <LinkWithPhone
            show2={showPhoneModal}
            onHide2={() => setShowPhoneModal(false)}
          />
          <div className='mb-2'>
            <img style={{height: "64px", width: "300px"}} src={Logo}/>
</div>
            <Card.Title tag="h3 mt-5" className="text-center">MFA</Card.Title>
           <div className="text-center"> Please select a Multi Factor Authentication (MFA)  method to continue</div> <br></br>
            <div className="text-left mb-3">Your account has these following methods: </div>
            <div className="m-auto col-10">
              {multifactors & multifactors.loading ? (
                <>
                  <Spinner></Spinner>
                </>
              ) : (
                <>
                  {multifactors.obj.hints != null ? <>
                  <ListGroup>
                    {multifactors.obj.hints.map((i, index) => {
                      return (
                        <>
                          <ListGroup.Item
                            action
                            key={index}
                            eventKey={i.factorId}
                            onClick={() => onSelectedAuth(i)}
                            
                          >
                            {i.factorId}
                          </ListGroup.Item>
                        </>
                      );
                    })}
                  </ListGroup></> : <>
                   
                  Nothing found</>}
                  
                </>
              )}

              <div></div>
            </div>
          </div>

          
        </Card>
      </div>
    </div>
  );
};

export default Auth2;
