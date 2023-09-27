import React, { useContext } from 'react';
import './signIn.css';

import { AuthContext } from "../../auth/context";

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { firebaseConfig } from "../../utilities/constants";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignIn() {
  const { user } = useContext(AuthContext);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export default SignIn;
