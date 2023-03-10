/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getSongs } from '../api/songData';
import SongCard from '../components/SongCard';
import UserProfile from '../components/UserProfile';
import { useAuth } from '../utils/context/authContext';

export default function ProfilePage() {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth();

  const getAllTheSongs = () => {
    getSongs(user.uid).then(setSongs);
  };

  useEffect(() => {
    getAllTheSongs();
  }, []);
  return (
    <>
      <div><UserProfile /></div>
      <div className="d-flex flex-wrap" id="profilesongs">
        {songs.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
        ))}
      </div>
    </>
  );
}
