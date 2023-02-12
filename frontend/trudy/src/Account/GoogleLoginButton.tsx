import React, { useState, useEffect } from 'react';
import axios from "axios";
const GoogleLoginButton: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '475224678108-9p4g9jp6mthogsd88jj53mql70noeaks.apps.googleusercontent.com',
        scope: 'profile email',
      }).then((authInstance) => {
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen((isSignedIn) => {
          setIsSignedIn(isSignedIn);
        });
      });
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      const googleUser = await authInstance.signIn();
      // const googleUser = await authInstance.signIn({
      //   prompt: 'select_account'
      // });
      if(googleUser.isSignedIn()){
      const idToken = googleUser.getAuthResponse().id_token;
      } else {
        console.error('Login was cancel');
      }
      // send the token to your back-end server for verification
      // ...
      
      // const response = await axios.post('/api/', {
      //   idToken
      // });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleSignIn}>
      {isSignedIn ? 'Sign Out' : 'Sign In with Google'}
    </button>
  );
};

export default GoogleLoginButton;
