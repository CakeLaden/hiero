import React, { useEffect, useState } from 'react';
import './chatMessage.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import ReactCountryFlag from "react-country-flag"

import { flagToLanguageMap, firebaseConfig } from "../../utilities/constants";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function ChatMessage(props) {
  const { globalLanguage, message } = props;
  const { translated, uid, photoURL } = message;

  const sentByUser = uid === auth.currentUser.uid;

  const messageClass = sentByUser ? 'sent' : 'received';

  const getDefaultTextFromMessage = (msg) => msg?.translated?.[globalLanguage] ?? msg.original;

  const [displayText, setDisplayText] = useState(getDefaultTextFromMessage(message));

  /* used when chat room updates the global language */
  useEffect(() => {
    setDisplayText(getDefaultTextFromMessage(message));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translated, globalLanguage]);

  const handleFlagClick = (event) => {
    const clickedIconId = event.currentTarget.id;

    if (flagToLanguageMap[clickedIconId] && translated?.[flagToLanguageMap[clickedIconId]]) {
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
              role="button"
            /> 
          )
        })}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`message ${messageClass}`} role="button">
      {photoURL && <img src={photoURL} referrerPolicy="no-referrer" alt="" />}
      <OverlayTrigger trigger="click" placement={sentByUser ? "left" : "right"} overlay={actionsPopover} rootClose>
        <p>{displayText}</p>
      </OverlayTrigger>
    </div>
  )
}

export default ChatMessage;
