import React from 'react';
import Image from 'next/image';
import Cleflogo from '../images/Cleflogo.png';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '75vh',
        padding: '20px',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <div style={{ maxWidth: '100%', marginRight: '20px', marginBottom: '30px' }}>
        <Image src={Cleflogo} alt="SymphoMeet logo" width={425} height={600} />
      </div>
      <h1>Welcome!</h1>
      <p>Click the button below to Sign Up!</p>
      <button type="button" className="btn btn-lg copy-btn" style={{ width: '400px', margin: 'auto' }} onClick={signIn}>
        Join the Community
      </button>
    </div>
  );
}

export default Signin;
