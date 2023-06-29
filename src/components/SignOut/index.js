import React from 'react';
import {auth} from '../../firebase/firebase'
import { withFirebase } from '../../firebase';
import { signOut } from 'firebase/auth';
class SignOutButton extends React.Component{
  render(){
    return(
      <button type="button" onClick={() => signOut(auth)}>
    Sign Out
  </button>
    )
  }
  
}

export default withFirebase(SignOutButton);
