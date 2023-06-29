import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { onAuthStateChanged } from 'firebase/auth';
import { withFirebase } from '../firebase';
import { auth } from '../firebase/firebase';
import { getCurrentUserData } from '../redux/ActionCreators';



const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.onSetAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount() {
      this.listener = onAuthStateChanged(auth,
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.onSetAuthUser(authUser);
          if(authUser){
            this.props.getUserdata(authUser.uid);
          }
        },
        () => {
          localStorage.removeItem('authUser');
          this.props.onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: currentUser =>
      dispatch({ type: 'SET_CURRENT_USER', payload: currentUser, }),
    getUserdata: userId => dispatch(getCurrentUserData(userId))
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
