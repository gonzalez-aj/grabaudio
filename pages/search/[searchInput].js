/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSnippets } from '../../api/snippetData';
import SnippetCard from '../../components/SnippetCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchResult() {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchResults = () => {
    getSnippets(user.uid).then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter(
        (snippets) => snippets.title.toLowerCase().includes(searchInput)
      || snippets.description.toLowerCase().includes(searchInput)
      || snippets.keyOf.toLowerCase().includes(searchInput)
      || snippets.bpm.toString().includes(searchInput),
      );
      setSearchResults(filterResults);
    });
  };

  useEffect(() => {
    getSearchResults();
    return () => {
      setSearchResults([]);
    };
  }, [searchInput]);
  return (
    <div>
      <div className="d-flex flex-wrap">
        {searchResults.map((obj) => (
          <SnippetCard key={obj.firebaseKey} snippetObj={obj} onUpdate={getSearchResults} />
        ))}
      </div>
    </div>
  );
}
