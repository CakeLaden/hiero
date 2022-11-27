import React, { useRef, useState } from 'react';
import './chatRoom.css';

import ChatMessage from '../chatMessage';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

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
const db = getFirestore(app);
const auth = getAuth(app);

const postConverter = {
  toFirestore(post) {
    return { author: post.author, title: post.title };
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
      <main>
        {messageDocs && messageDocs.map((messageDoc) => <ChatMessage key={messageDoc.id} message={messageDoc.message} />)}

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
