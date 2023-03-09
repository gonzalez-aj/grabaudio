import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSnippetsBySong } from '../api/songData';
import { viewSongDetails } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';
import SnippetCard from './SnippetCard';

export default function ViewYourSnippets() {
  const [songDetails, setSongDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewSongDetails(firebaseKey).then(setSongDetails);
  }, [firebaseKey]);

  const getAllSnippetsBySong = () => {
    getSnippetsBySong(firebaseKey);
  };

  if (user.uid === songDetails.uid) {
    return (
      <div className="d-flex flex-wrap">
        {songDetails.songSnippets?.map((snippet) => (
          <SnippetCard key={snippet.firebaseKey} snippetObj={snippet} onUpdate={getAllSnippetsBySong} />
        ))}
      </div>
    );
  }
  return (
    <div className="d-flex flex-wrap">
      {songDetails.songSnippets?.filter((snippet) => snippet.isPublic).map((snippet) => (
        <SnippetCard key={snippet.firebaseKey} snippetObj={snippet} onUpdate={getAllSnippetsBySong} />
      ))}
    </div>
  );
}
