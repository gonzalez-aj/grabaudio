/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getSongs } from '../../api/songData';
import SongCard from '../../components/SongCard';
import { useAuth } from '../../utils/context/authContext';

export default function YourSongs() {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth();
  const [noSnips, setNoSnips] = useState(false);

  const getAllTheSongs = () => {
    getSongs(user.uid)
      .then((data) => {
        if (data && data.length > 0) {
          setNoSnips(false);
          setSongs(data);
        } else {
          setNoSnips(true);
          setSongs([]);
        }
      })
      .catch(() => {
        setNoSnips(true);
      });
  };

  useEffect(() => {
    getAllTheSongs();
  }, []);
  return (
    <>
      <Head><title>All Your Songs</title></Head>
      <br />
      <h3>These are all of the songs you created:</h3>
      {noSnips && <h4>There are no Songs here, yet!</h4>}
      <div className="d-flex flex-wrap" id="profilesongs">
        {songs.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
        ))}
      </div>
    </>
  );
}
