import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from 'firebase/app';
import { useFormik } from 'formik';

import { verifyPhoneNumber } from './redux/actions/authActions';

function PhoneVerificationPage() {
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      phoneNumber: ''
    },
    onSubmit: async values => {
      try {
        const verification = await auth().verifyPhoneNumber(values.phoneNumber);
        setVerificationId(verification.verificationId);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, code);
      await auth().signInWithCredential(credential);
      dispatch(verifyPhoneNumber());
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!verificationId ? (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          <button type="submit">Send Verification Code</button>
        </form>
      ) : (
        <div>
          <label htmlFor="code">Verification Code:</label>
          <input
            id="code"
            name="code"
            type="tel"
            onChange={e => setCode(e.target.value)}
            value={code}
          />
          <button type="button" onClick={handleVerifyCode}>
            Verify Code
          </button>
        </div>
      )}
    </div>
  );
}

export default PhoneVerificationPage;
