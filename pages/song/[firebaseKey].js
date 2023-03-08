/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import songluetransparent from '../../images/songluetransparent.png';
import { viewSongDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import { deleteSingleSong } from '../../api/songData';
import ViewYourSnippets from '../../components/ViewSnippets';

export default function ViewSong() {
  const [songDetails, setSongDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewSongDetails(firebaseKey).then(setSongDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title> View {songDetails.title} </title>
      </Head>
      <br />
      <h1>
        Song: {songDetails.title}
      </h1>
      <Card style={{ width: '50rem', margin: '20px' }}>
        <Image variant="top" src={songluetransparent} alt={songDetails.title} />
        <Card.Body>
          <Card.Title>{songDetails.title}</Card.Title>

          <h6>Description:</h6> <p>{songDetails.description}</p>
          <h6>Key:</h6> <p>{songDetails.keyOf}</p>
          <h6>BPM:</h6> <p>{songDetails.bpm}</p>
          <p>
            {songDetails.isPublic ? 'Shared Sound 👥' : 'Private 🔒'}
          </p>
          <p>
            {songDetails.favorite ? 'Favorite ⭐️⭐️⭐️⭐️' : 'Favorite? Nah'}
          </p>

          <Link href={`/song/edit/${songDetails.firebaseKey}`} passHref>
            {songDetails.uid === user.uid ? (<Button variant="outline-dark" className="m-2">edit</Button>) : '' }
          </Link>

          {songDetails.uid === user.uid ? (<Button variant="outline-dark" className="m-2" onClick={deleteSingleSong}>delete</Button>) : ''}
        </Card.Body>
      </Card>
      <ViewYourSnippets />
    </>
  );
}
