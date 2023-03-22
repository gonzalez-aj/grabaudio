/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import GlueBottle from '../../images/GlueBottle.png';
import { viewSongDetails } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import SnippetCard from '../../components/SnippetCard';

export default function ViewSong() {
  const [songDetails, setSongDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { firebaseKey } = router.query;

  const forOnUpdateOfSongs = () => {
    viewSongDetails(firebaseKey).then(setSongDetails);
  };

  useEffect(() => {
    viewSongDetails(firebaseKey).then(setSongDetails);
  }, [firebaseKey]);

  if (user.uid === songDetails.uid) {
    return (
      <>
        <Container fluid>
          <Head>
            <title> View {songDetails.title} </title>
          </Head>
          <br />
          <h1>
            Song: {songDetails.title}
          </h1>
          <Card className="song-card">
            <div>
              <Image className="song-view-glue" variant="top" src={GlueBottle} alt={songDetails.title} />
            </div>
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
              <h6>
                Lyrics:
              </h6>
              <p className="form-lyrics">
                {songDetails.lyrics}
              </p>
              <Link href={`/song/edit/${songDetails.firebaseKey}`} passHref>
                {songDetails.uid === user.uid ? (<Button variant="outline-light" className="m-2">edit</Button>) : '' }
              </Link>

            </Card.Body>
          </Card>
          <hr />
          <h3>These are the snippets from song: {songDetails.title} </h3>
          <div className="d-flex flex-column">
            {songDetails.snippets?.map((snippetObject) => (
              <SnippetCard key={snippetObject.firebaseKey} snippetObj={snippetObject} onUpdate={forOnUpdateOfSongs} />
            ))}
          </div>
        </Container>
      </>
    );
  }
  return (
    <>
      <Head>
        <title> View {songDetails.title} </title>
      </Head>
      <br />
      <h1>
        Song: {songDetails.title}
      </h1>
      <Card className="song-card" style={{ width: '50rem', margin: '20px' }}>
        <div>
          <Image className="song-view-glue" variant="top" src={GlueBottle} alt={songDetails.title} />
        </div>
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
        </Card.Body>
      </Card>
      <hr />
      <h3>These are the snippets from song: {songDetails.title} </h3>

      <div className="d-flex flex-column">
        {songDetails.snippets?.filter((snippetObject) => snippetObject.isPublic).map((snippetObject) => (
          <SnippetCard key={snippetObject.firebaseKey} snippetObj={snippetObject} onUpdate={forOnUpdateOfSongs} />
        ))}
      </div>
    </>
  );
}
