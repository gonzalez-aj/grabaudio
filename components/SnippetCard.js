import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Image from 'next/image';
import rainbowave from '../images/rainbowave.png';
import { deleteSingleSnippet } from '../api/snippetData';
import { useAuth } from '../utils/context/authContext';

function SnippetCard({ snippetObj, onUpdate }) {
  const { user } = useAuth();

  const deleteSnippet = () => {
    if (window.confirm(`🛑 You wanna delete this lil snippet ${snippetObj.title}?`)) {
      deleteSingleSnippet(snippetObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card className="snippet-card" style={{ width: '20rem', margin: '10px' }}>
        <Image variant="top" src={rainbowave} alt={snippetObj?.title} />
        <Card.Body>
          <Card.Title>{snippetObj?.title}</Card.Title>

          <audio controls>
            <source src={snippetObj?.audio_url} />
            <track kind="captions" />
          </audio>

          <p className="card-text bold"> Description: {snippetObj?.description} <br /> Key: {snippetObj?.keyOf} <br /> BPM: {snippetObj.bpm} </p>
          <p>
            {snippetObj.isPublic ? '👥' : '🔒'}  {snippetObj.favorite ? '⭐️' : ''}
          </p>
          <Link href={`/snippet/${snippetObj?.firebaseKey}`} passHref>
            <Button cvariant="outline-dark" className="m-2 snipBtns">view</Button>
          </Link>
          <Link href={`/snippet/edit/${snippetObj?.firebaseKey}`} passHref>
            {snippetObj.uid === user.uid ? (<Button cvariant="outline-dark" className="m-2 snipBtns">edit</Button>) : '' }
          </Link>

          {snippetObj.uid === user.uid ? (<Button cvariant="outline-dark" className="m-2 snipBtns" onClick={deleteSnippet}>delete</Button>) : ''}

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
    song_id: PropTypes.string,
    keyOf: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SnippetCard;
