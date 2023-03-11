/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getSnippets } from '../api/snippetData';
import SnippetCard from '../components/SnippetCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [snippets, setSnippets] = useState([]);
  const { user } = useAuth();
  const [noSongs, setNoSongs] = useState(false);

  const getAllTheSnippets = () => {
    getSnippets(user.uid)
      .then((data) => {
        if (data && data.length > 0) {
          setNoSongs(false);
          setSnippets(data);
        } else {
          setNoSongs(true);
          setSnippets([]);
        }
      })
      .catch(() => {
        setSnippets(true);
      });
  };

  useEffect(() => {
    getAllTheSnippets();
  }, []);

  return (
    <>
      <br />
      <h2> Welcome to SonGlue, {user.displayName} </h2>
      <h3>These are all your lil audio snippets:</h3>
      {noSongs && <h4>There are no snippets here, yet!</h4>}
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.firebaseKey} snippetObj={snippet} onUpdate={getAllTheSnippets} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
