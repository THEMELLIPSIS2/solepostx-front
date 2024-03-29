import React from "react";
import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';
const CookieAccept = () => {

  return (
    <CookieConsent

    onAccept={() => {  
      return gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });  
    }}
      enableDeclineButton
      onDecline={() => {
      }}
      flipButtons
      location="bottom"
      declineButtonText="Decline"
      buttonText="Accept"

      cookieName="localConsent"

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

      This website uses cookies to enhance user experience. Please see our <Link href="/privacy">privacy policy</Link>.

    </CookieConsent>
  );
};
export default CookieAccept;