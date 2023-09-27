import React, { useRef, useState } from 'react';
import './chatRoom.css';

import ChatMessage from '../chatMessage';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import ReactCountryFlag from "react-country-flag";

import { flagToLanguageMap, firebaseConfig } from "../../utilities/constants";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const defaultLanguage = "en"; // TODO: create custom setting for this?

const postConverter = {
  toFirestore(post) {
    return post;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      message: data,
    };
  },
};

function ChatRoom() {
  const dummy = useRef();

  // get message data
  const messagesRef = collection(db, 'messages').withConverter(postConverter);
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messageDocs] = useCollectionData(q);

  // initialize language
  const [globalLanguage, setGlobalLanguage] = useState(defaultLanguage);

  // initialize form
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      original: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <header>
      <div>
          {/* TODO: insert globe icon --> flagToLanguageMap && <span class="language-icon">LANG:</span> */}
          {flagToLanguageMap && Object.entries(flagToLanguageMap).map((lang) => {
            return (
              <ReactCountryFlag 
                key={lang[0]}
                id={lang[0]}
                countryCode={lang[0]}
                className="language-icon" 
                aria-label={lang[1]}
                onClick={(e) => setGlobalLanguage(flagToLanguageMap[e.currentTarget.id])}
                role="button"
              /> 
            )
          })}
        </div>
        <div>{/* Profile / settings? */}</div>
      </header>
      <main>
        {messageDocs && messageDocs.map((messageDoc) => 
          <ChatMessage 
            key={messageDoc.id} 
            message={messageDoc.message} 
            globalLanguage={globalLanguage}
          />
        )}

        <div ref={dummy}></div>
      </main>


      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit" onClick={sendMessage}>SEND</button>
      </form>
    </>
  )
}

export default ChatRoom;
