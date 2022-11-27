import React, { useRef, useState } from 'react';
import './chatMessage.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import ReactCountryFlag from "react-country-flag"

const flagToLanguageMap = {
  de: "de",
  fr: "fr",
  es: "es",
  us: "en",
};

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

function ChatMessage(props) {
  const { original, translated, uid, photoURL } = props.message;

  const sentByUser = uid === auth.currentUser.uid;

  const messageClass = sentByUser ? 'sent' : 'received';

  const [displayText, setDisplayText] = useState(original);

  const handleFlagClick = (event) => {
    const clickedIconId = event.currentTarget.id;

    if (flagToLanguageMap[clickedIconId]) {
      setDisplayText(translated[flagToLanguageMap[clickedIconId]]);
    }

    // hack to trigger rootclose on overlay and close popover
    document.body.click();
  }

  // display icons for each available language
  const actionsPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        {flagToLanguageMap && Object.entries(flagToLanguageMap).map((lang) => {
          return (
            <ReactCountryFlag 
              key={lang[0]}
              id={lang[0]}
              countryCode={lang[0]}
              className="language-icon" 
              aria-label={lang[1]}
              onClick={handleFlagClick}
            /> 
          )
        })}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`message ${messageClass}`}>
      {photoURL && <img src={photoURL} referrerPolicy="no-referrer" alt="" />}
      <OverlayTrigger trigger="click" placement={sentByUser ? "left" : "right"} overlay={actionsPopover} rootClose>
        <p>{displayText}</p>
      </OverlayTrigger>
    </div>
  )
}

export default ChatMessage;
