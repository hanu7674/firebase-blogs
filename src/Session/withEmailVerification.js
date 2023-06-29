import React from 'react';
import { compose } from 'recompose';
import { connect, useDispatch, useSelector } from "react-redux";

import { withFirebase } from '../firebase';
import { doSendEmailVerification } from '../redux/ActionCreators';
const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified
const withEmailVerification = Component => {
  const WithEmailVerification = () => {
    const authUser = useSelector(state => state.authState.currentUser);
    const isEmailVerificationSent = useSelector(state => state.authState.isEmailVerificationSent)
    const dispatch = useDispatch();
    const onSendEmailVerification = () => {
      console.log(needsEmailVerification(authUser));
        dispatch(doSendEmailVerification(authUser))
      // sendEmailVerification(this.props.authUser)
      // .then(()=> this.setState({ isSent: true }))
      // this.props.firebase
      //   .doSendEmailVerification()
      //   .then(() => this.setState({ isSent: true }));
    };
      return (needsEmailVerification(authUser) ? (
        <div className='container'>
          {isEmailVerificationSent ? (
            <p>
              E-Mail confirmation sent: Check you E-Mails (Spam folder
              included) for a confirmation E-Mail. Refresh this page
              once you confirmed your E-Mail.
            </p>
          ) : (
            <p>
              Verify your E-Mail: Check you E-Mails (Spam folder
              included) for a confirmation E-Mail or send another
              confirmation E-Mail.
            </p>
          )}

          <button
            type="button"
            onClick={onSendEmailVerification}
            disabled={isEmailVerificationSent}
          >
            Send confirmation E-Mail
          </button>
        </div>
      ) : (
        <Component  />
      )
      );      
  }

  const mapStateToProps = state => ({
    authUser: state.authState.currentUser,
    isEmailVerificationSent: state.authState.isEmailVerificationSent
  });

  return compose(
    withFirebase,
    connect(mapStateToProps),
  )(WithEmailVerification);
};

export default withEmailVerification;
