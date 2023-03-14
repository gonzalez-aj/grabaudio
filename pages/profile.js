/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { React } from 'react';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <Head><title>{user.displayName} Profile</title></Head>
      <div><UserProfile /></div>
      <h2>Total Number of Songs:</h2>
      <h2>Total Number of Snippets:</h2>
    </>
  );
}
