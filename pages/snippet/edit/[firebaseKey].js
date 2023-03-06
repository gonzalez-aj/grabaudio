import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleSnippet } from '../../../api/snippetData';
import SnippetForm from '../../../components/forms/SnippetForm';

export default function EditSnippet() {
  const [editSnippet, setEditSnippet] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSnippet(firebaseKey).then(setEditSnippet);
  }, [firebaseKey]);

  return (<SnippetForm obj={editSnippet} />);
}
