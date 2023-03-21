import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello there!</h1>
      <p>Click the button below to join the Classical Community of Nashville!</p>
      <button type="button" className="btn btn-lg copy-btn" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
