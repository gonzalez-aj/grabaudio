/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { React, useEffect, useState } from 'react';
import { getSnippets } from '../api/snippetData';
import { getSongs } from '../api/songData';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [totalSnippets, setTotalSnippets] = useState(0);
  const [totalSongs, setTotalSongs] = useState(0);

  useEffect(() => {
    getSongs(user.uid)
      .then((songs) => {
        const noOfSongs = songs.length;
        setTotalSongs(noOfSongs);
      })
      .catch(() => {
      });
  }, [user]);
  useEffect(() => {
    getSnippets(user.uid)
      .then((snippets) => {
        const count = snippets.length;
        setTotalSnippets(count);
      })
      .catch(() => {
      });
  }, [user]);

  return (
    <>
      <Head><title>{user.displayName} Profile</title></Head>
      <div><UserProfile /></div>
      <h2>Total Number of Songs: {totalSongs} </h2>
      <h2>Total Number of Snippets: {totalSnippets}</h2>
    </>
  );
}
