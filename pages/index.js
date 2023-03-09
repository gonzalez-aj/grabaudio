/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getSnippets } from '../api/snippetData';
import SnippetCard from '../components/SnippetCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [snippets, setSnippets] = useState([]);
  const { user } = useAuth();
  const getAllTheSnippets = () => {
    getSnippets(user.uid).then(setSnippets);
  };

  useEffect(() => {
    getAllTheSnippets();
  }, []);

  return (
    <>
      <h1> Welcome to SonGlue</h1>
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
