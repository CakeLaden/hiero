import React from 'react';
import './signOut.css';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from "../../utilities/constants";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default SignOut;
