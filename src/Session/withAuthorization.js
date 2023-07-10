import React from 'react';
import * as ROUTES from '../components/constants/routes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { userRef } from '../redux/ActionCreators';
import { getDoc } from 'firebase/firestore';
import Loading from '../components/Loading/loading';
import { withNavigation } from '../components/Admin/hoc';
import { compose } from 'recompose';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: null,
      };
      this.isUnmounted = false;
    }

    componentDidMount() {
      this.listener = (
        onAuthStateChanged(auth, (authUser) => {
          if (authUser) {
            const uid = authUser?.uid;
            getDoc(userRef(uid)).then((snapshot) => {
  if(this.isUnmounted) {
    return;
  }
              const dbUser = snapshot.data();
              // default empty roles
              if (dbUser && dbUser?.roles === undefined) {
                dbUser.roles = {};
              }
              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                roles: { ...authUser?.roles, ...dbUser?.roles },
              };
              this.setState({
                currentUser: authUser
              });
              if (!condition(authUser)) {
                this.props.navigate(ROUTES.LOGIN);
              }
            });
          } else {
            this.props.navigate(ROUTES.LOGIN);
          }
        }));
    }

    componentWillUnmount() {
      this.isUnmounted = true;
      // this.listener();
    }

    render() {
      return (condition(this.state.currentUser) ? <Component {...this.props}/> : <Loading/>);
    }
  }

  return compose(withNavigation)(WithAuthorization);
};

export default withAuthorization;
