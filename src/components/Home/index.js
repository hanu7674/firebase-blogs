import React from 'react';
import { compose } from 'recompose';
import { connect, useSelector } from 'react-redux';

import {  withEmailVerification } from '../../Session';
import { withFirebase } from '../../firebase';

const HomePage = () => {

  const currentUser = useSelector((state => state.authState.currentUser))
  return (
  <div className='container mt-4 mb-3'>
    <h1>Home page</h1>
      {currentUser && currentUser ? (
        <p>You are logged in as {currentUser.email}</p>
      ) : (
        <p>You are logged out, please sign in.</p>
      )}
    {/* <Messages /> */}
  </div>
);
      }

const mapStateToProps = state => ({
  currentUser: state.authState.currentUser
});
export default compose(
  withEmailVerification,
  withFirebase,
  connect(mapStateToProps)
)(HomePage);
