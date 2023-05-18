import React from "react";
import CookieConsent from 'react-cookie-consent';

const CookieAccept = () => {

  return (
    <CookieConsent
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
      style={{ background: 'black', zIndex: '9999999999999999' }}
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
      This website uses cookies to enhance user experience. Please see our privacy policy.
    </CookieConsent>
  );
};
export default CookieAccept;