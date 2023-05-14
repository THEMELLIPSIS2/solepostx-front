import React from "react";
import CookieConsent from 'react-cookie-consent';

const CookieAccept = () => {

  return (
    <CookieConsent
    debug={true}
    onAccept={() => {    
      }}
      enableDeclineButton
      onDecline={() => {
      }}
      flipButtons
      location="bottom"
      declineButtonText="Decline"
      buttonText="Accept"
      cookieName="SolePost Cookie"
      style={{ background: 'black' }}
      buttonStyle={{
        fontSize: '15px',
        backgroundColor: '#d32f2f',
        color: 'white'
      }}
      declineButtonStyle={{
        margin: '10px 10px 10px 0',
        fontSize: '15px',
        backgroundColor: 'gray'
      }}
      expires={450}
    >
      This website uses cookies om nom nom UwU
    </CookieConsent>
  );
};
export default CookieAccept;