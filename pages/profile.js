/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { React } from 'react';
import UserProfile from '../components/UserProfile';

export default function ProfilePage() {
  return (
    <>
      <Head><title>Your Profile</title></Head>
      <div><UserProfile /></div>
      <h2>Total Number of Songs:</h2>
      <h2>Total Number of Snippets:</h2>
    </>
  );
}
