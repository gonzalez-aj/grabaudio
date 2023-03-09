import React, { useEffect, useState } from 'react';
import { getPublicSongs } from '../api/songData';
import SongCard from '../components/SongCard';

export default function SharedSounds() {
  const [publicSongs, setPublicSongs] = useState([]);

  const getAllPublicSongs = () => {
    getPublicSongs().then(setPublicSongs);
  };

  useEffect(() => {
    getAllPublicSongs();
  }, []);
  return (
    <div className="public-card-container, d-flex flex-wrap">
      {publicSongs.map((publicsong) => (
        <SongCard key={publicsong.firebaseKey} songObj={publicsong} onUpdate={getAllPublicSongs} />
      ))}
    </div>
  );
}
