import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import GlueBottle from '../images/GlueBottle.png';
import { useAuth } from '../utils/context/authContext';
import { deleteSongSnippets } from '../api/mergedData';

function SongCard({ songObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisSong = () => {
    if (window.confirm(`🛑 Sure you wanna delete this song ${songObj.title}? and it's snippets`)) {
      deleteSongSnippets(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="song-card" style={{ width: '20rem', margin: '10px' }}>
        <Image variant="top" src={GlueBottle} alt={songObj.title} />
        <Card.Body>
          <Card.Title>{songObj.title}</Card.Title>

          <p className="card-text bold"> Description: {songObj.description} <br /> Key: {songObj.keyOf} <br /> BPM: {songObj.bpm} </p>
          <p>
            {songObj.isPublic ? '👥' : '🔒'}  {songObj.favorite ? '⭐️' : ''}
          </p>
          <Link href={`/song/${songObj.firebaseKey}`} passHref>
            <Button variant="outline-light" className="m-2">view</Button>
          </Link>
          <Link href={`/song/edit/${songObj.firebaseKey}`} passHref>
            {songObj.uid === user.uid ? (<Button variant="outline-light" className="m-2">edit</Button>) : '' }
          </Link>

          {songObj.uid === user.uid ? (<Button variant="outline-light" className="m-2" onClick={deleteThisSong}>delete</Button>) : ''}

        </Card.Body>
      </Card>
    </>
  );
}

SongCard.propTypes = {
  songObj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    bpm: PropTypes.number,
    isPublic: PropTypes.bool,
    favorite: PropTypes.bool,
    keyOf: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SongCard;
