import Image from 'next/image';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function UserProfile() {
  const { user } = useAuth();
  const CSTLastSignInTime = new Date(user.metadata.lastSignInTime).getTime() + 60 * 1000;
  const CSTString = new Date(CSTLastSignInTime).toLocaleString();

  return (
    <>
      <div id="profileSection">
        <br />
        <h2>Profile:</h2>
        <h3>{user.displayName}</h3>
        <Image src={user.photoURL} alt="userURL" width="150px" height="150px" id="profilepicture" />
        <h5>Email: {user.email}</h5>
        <h5>Last Time On SonGlue: {CSTString} (CT)</h5>
        <Button type="button" size="lg" variant="outline-dark" className="btn-lg hoverbtn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <br />
    </>
  );
}
