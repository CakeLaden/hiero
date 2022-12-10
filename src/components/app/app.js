import React from 'react';
import './app.css';

import SignIn from '../signIn';
import SignOut from '../signOut';
import ChatRoom from '../chatRoom';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseConfig } from "../../utilities/constants";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hiero</h1>

        <div className="signOut">{user && <SignOut />}</div>
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
