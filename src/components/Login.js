import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css'; // Ensure you have this CSS file for custom styles

const Login = () => {
  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/streamlist-icon-192x192.png`} alt="StreamList Icon" className="login-icon" />
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
};

export default Login;
