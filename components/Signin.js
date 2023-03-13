import React from 'react';
import Button from 'react-bootstrap/Button';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center signinbtn"
    >
      <h1>SonGlue</h1>
      <p>login below</p>
      <Button type="button" variant="outline-dark" className="btn-lg hoverbtn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
