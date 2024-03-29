import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import songlueV2 from '../images/songlueV2.png';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center signinbtn signin-container"
    >
      <h1>SonGlue
      </h1>
      <Image src={songlueV2} alt="SonGlue" />
      <Button type="button" variant="outline-dark" className="btn-lg hoverbtn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
