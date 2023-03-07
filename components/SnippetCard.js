import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import songluetransparent from '../images/songluetransparent.png';
import { deleteSingleSnippet } from '../api/snippetData';
import { useAuth } from '../utils/context/authContext';

function SnippetCard({ snippetObj, onUpdate }) {
  const { user } = useAuth();
  const deleteSnippet = () => {
    if (window.confirm(`Sure you wanna delete this lil snippet ${snippetObj.title}?`)) {
      deleteSingleSnippet(snippetObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '20rem', margin: '10px' }}>
        <Image variant="top" src={songluetransparent} alt={snippetObj.title} />
        <Card.Body>
          <Card.Title>{snippetObj.title}</Card.Title>

          <audio controls>
            <source src={snippetObj.audio_url} />
            <track kind="captions" />
          </audio>

          <p className="card-text bold"> Description: {snippetObj.description} <br /> Key: {snippetObj.keyOf} <br /> BPM: {snippetObj.bpm} </p>
          <Link href={`/snippet/${snippetObj.firebaseKey}`} passHref>
            <Button variant="outline-dark" className="m-2">view</Button>
          </Link>
          <Link href={`/snippet/edit/${snippetObj.firebaseKey}`} passHref>
            {snippetObj.uid === user.uid ? (<Button variant="outline-dark" className="m-2">edit</Button>) : '' }
          </Link>

          {snippetObj.uid === user.uid ? (<Button variant="outline-dark" className="m-2" onClick={deleteSnippet}>delete</Button>) : ''}

        </Card.Body>
      </Card>
    </>
  );
}

SnippetCard.propTypes = {
  snippetObj: PropTypes.shape({
    audio_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    bpm: PropTypes.number,
    name: PropTypes.string,
    isPublic: PropTypes.bool,
    favorite: PropTypes.bool,
    keyOf: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SnippetCard;
