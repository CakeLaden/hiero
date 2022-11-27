import React from 'react';
import './app.css';

import SignIn from '../signIn';
import SignOut from '../signOut';
import ChatRoom from '../chatRoom';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

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
