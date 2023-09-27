import React from 'react';
import './app.css';

import UserContext from '../../auth/context';
import SignIn from '../signIn';
import SignOut from '../signOut';
import ChatRoom from '../chatRoom';

import { AuthContext, AuthProvider } from '../../auth/context';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

//const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);

function App() {

  //const [user] = useAuthState(auth);

  const user = AuthContext();

  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>Hiero</h1>

          <div className="signOut">{user && <SignOut />}</div>
        </header>

        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </AuthProvider>
  );
}

export default App;
