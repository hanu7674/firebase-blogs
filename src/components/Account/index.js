import React, { Component, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import { withFirebase } from '../../firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { EmailAuthCredential, EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, fetchSignInMethodsForEmail, linkWithCredential, linkWithPopup, unlink } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: new GoogleAuthProvider(),
  },
  {
    id: 'facebook.com',
    provider: new FacebookAuthProvider(),
  },
  {
    id: 'twitter.com',
    provider: new TwitterAuthProvider(),
  },
  {
    id: 'github.com',
    provider: new GithubAuthProvider(),
  },
];

const AccountPage = () => {
  const authUser = useSelector((state) => state.authState.user)
  const currentAuthUser = useSelector((state) => state.authState.currentUser)
  return(
  <div className='mt-5'>
    <h1>Account: {authUser?.email}</h1>
    {/* <PasswordForgetForm /> */}
    {/* <PasswordChangeForm /> */}
    <LoginManagement authUser={authUser} currentAuthUser={currentAuthUser} />
  </div>
);
}
const LoginManagementBase = ({authUser, currentAuthUser}) =>{

  const [error, setError] = useState();
  const [activeSignInMethods, setActiveSignInMethods] = useState([])

  const fetchSignInMethods = () => {
    fetchSignInMethodsForEmail(auth, authUser?.email)
    .then(activeSignInMethods =>
      setActiveSignInMethods(activeSignInMethods)
    )
    .catch(error => setError(error));
  }
  useEffect(() =>{
    fetchSignInMethods()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSocialLoginLink = ({provider}) => {
    linkWithPopup(currentAuthUser, provider)
      .then(() => fetchSignInMethods())
      .catch(error => {
        setError(error)
        console.log(error);
      });
  };

  const onDefaultLoginLink = ({password}) => {
    const cred = new EmailAuthCredential();
    const credential = cred.providerId(
      this.props.authUser.email,
      password,
    );
    linkWithCredential(authUser, credential)
      .then( () => {fetchSignInMethods()})
      .catch(error => setError(error));
  };

  const onUnlink = ({providerId}) => {
       unlink(authUser,providerId)
      .then(() => {fetchSignInMethods()})
      .catch(error => setError(error));
  };
    return (
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id,
            );

            return (
              <li key={signInMethod.id}>
                {signInMethod.id === 'password' ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={onDefaultLoginLink}
                    onUnlink={onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={onSocialLoginLink}
                    onUnlink={onUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  }


const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.id}
    </button>
  );

const  DefaultLoginToggle = ( {
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onUnlink,
  onLink
}) => {
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const isInvalid =
  passwordOne !== passwordTwo || passwordOne === '';
  const onSubmit = (event) => {
    event.preventDefault();

    onLink(passwordOne);
    setPasswordOne('');
    setPasswordTwo('');
  };

    return isEnabled ? (
      <button
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </button>
    ) : (
      <form onSubmit={onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(text) =>setPasswordOne(text.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(text) =>setPasswordTwo(text.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />

        <button disabled={isInvalid} type="submit" >
          Link {signInMethod.id}
        </button>
      </form>
    );
  }


const LoginManagement = withFirebase(LoginManagementBase);

const mapStateToProps = state => ({
  authUser: state.authState.currentUser,
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
