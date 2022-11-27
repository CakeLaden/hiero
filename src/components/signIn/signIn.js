import React, { useRef, useState } from 'react';
import './signIn.css';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEEjd8s98FSO8ymagdNVs474LoGVX6aWI",
  authDomain: "hiero-30f14.firebaseapp.com",
  projectId: "hiero-30f14",
  storageBucket: "hiero-30f14.appspot.com",
  messagingSenderId: "342526623589",
  appId: "1:342526623589:web:940a5ce1cb72d641d6ab8c",
  measurementId: "G-TMFQY7PLT2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export default SignIn;
