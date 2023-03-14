/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { faveSongs } from '../../api/songData';
import SongCard from '../../components/SongCard';
import { useAuth } from '../../utils/context/authContext';

export default function FavoriteSongs() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);

  const getAllFaveSongs = () => {
    faveSongs(user.uid).then(setSongs);
  };

  useEffect(() => {
    getAllFaveSongs();
  }, []);

  return (
    <>
      <Head><title> Your Favorite Songs </title></Head>
      <div className="d-flex flex-wrap" id="profilesongs">
        {songs.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllFaveSongs} />
        ))}
      </div>
    </>
  );
}
