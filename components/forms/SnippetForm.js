import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createSnippet, updateSnippet } from '../../api/snippetData';
import { storage } from '../../utils/client';
import { getSongs } from '../../api/songData';

const initialState = {
  firebaseKey: '',
  audio_url: '',
  title: '',
  description: '',
  song_id: '',
  keyOf: 'C Major',
  bpm: 40,
  isPublic: false,
  favorite: false,
};

function SnippetForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const didMount = React.useRef(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs(user.uid).then(setSongs);
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);
  useEffect(() => {
    if (didMount.current) {
      const uploadTask = async () => storage.ref(`audio/${audio.name}`).put(audio);
      const delayFunction = async () => {
        // eslint-disable-next-line no-unused-vars
        const delayingUploadTask = await uploadTask();
        storage.ref('audio').child(audio.name).getDownloadURL().then((url) => {
          setAudioUrl(url);
        });
      };
      delayFunction();
    } else { didMount.current = true; }
  }, [audio]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setAudio(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: name === 'bpm' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateSnippet(formInput)
        .then(() => router.push(`/snippet/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, audio_url: `${audioUrl}`,
      };
      createSnippet(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateSnippet(patchPayloadFBK).then(() => {
          setFormInput(initialState);
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Head><title>{obj.firebaseKey ? `Update ${obj.title} Snippet` : 'Create Snippet'}</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{obj.firebaseKey ? 'Update' : 'Create'} Snippet</h2>
        <div className="mt-5" />

        <div className="">Snippet</div>
        {obj.firebaseKey ? '' : (
          <FloatingLabel controlId="floatingInput0" label="" className="mb-3">
            <input
              type="file"
              onInput={handleFileChange}
              required
            />
          </FloatingLabel>
        )}

        <div className="">Title</div>
        <FloatingLabel controlId="floatingInput1" label="Snippet Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a title..."
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div className="">Description</div>
        <FloatingLabel controlId="floatingTextarea" label="Snippet Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div className="">{formInput.bpm} BPM</div>
        <FloatingLabel className="custom-slider m-4 mb-6" label="">
          <input
            type="range"
            min={40}
            max={220}
            step={1}
            name="bpm"
            onChange={handleChange}
            value={parseInt(formInput.bpm, 10)}
          />
          <output htmlFor="fader" />
        </FloatingLabel>

        <div className="">Select Key</div>
        <FloatingLabel controlId="floatingSelect" label="Key of">
          <Form.Select
            placeholder="Pick a Major Key"
            aria-label="Key"
            name="keyOf"
            onChange={handleChange}
            className="mb-3"
            value={formInput.keyOf}
            required
          >
            <option value="A♭ maj">A&#9837; maj</option>
            <option value="A maj">A maj</option>
            <option value="B♭ maj">B&#9837; maj</option>
            <option value="B maj"> B maj</option>
            <option value="C♭ maj">C&#9837; maj</option>
            <option value="C maj">Cmaj</option>
            <option value="C♯ maj">C&#9839; maj</option>
            <option value="D♭ maj">D&#9837; maj</option>
            <option value="D maj">D maj</option>
            <option value="E♭ maj">E&#9837; maj</option>
            <option value="E maj">E maj</option>
            <option value="F maj">F maj</option>
            <option value="F♯ maj">F&#9839; maj</option>
            <option value="G maj">G maj</option>
            <option value="G♭ maj">G&#9837; maj</option>
            <option disabled>───────────</option>
            <option value="A♭ min">A&#9837; min</option>
            <option value="A min">A min</option>
            <option value="B♭ min">B&#9837; min</option>
            <option value="B min">B min</option>
            <option value="C min">C min</option>
            <option value="C♯ min">C&#9839; min</option>
            <option value="D min">D min</option>
            <option value="D♯ min">D&#9839; min</option>
            <option value="D♭ min">D&#9837; min</option>
            <option value="E♭ min">E&#9837; min</option>
            <option value="E min">E min</option>
            <option value="F min">F min</option>
            <option value="F♯ min">F&#9839; min</option>
            <option value="G min">G min</option>
            <option value="G♯ min">g&#9839; min</option>
          </Form.Select>
        </FloatingLabel>

        <div className="">Select Song</div>
        <FloatingLabel controlId="floatingSelect2" label="Song">
          <Form.Select
            placeholder="Pick a Song"
            aria-label="Song"
            name="song_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.song_id}
            required
          >
            <option value="">Select a Song</option>
            {songs.map((song) => (
              <option
                key={song.firebaseKey}
                value={song.firebaseKey}
              >
                {song.title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <Form.Check
          className="mb-3"
          type="switch"
          id="isPublic"
          name="isPublic"
          label="Public?"
          checked={formInput.isPublic}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              isPublic: e.target.checked,
            }));
          }}
        />

        <Form.Check
          className="mb-3"
          type="switch"
          id="favorite"
          name="favorite"
          label="Favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />

        <Button variant="outline-dark" className="m-2 text-color-drkblu" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Snippet</Button>
      </Form>
    </>
  );
}

SnippetForm.propTypes = {
  obj: PropTypes.shape({
    audio_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    bpm: PropTypes.number,
    keyOf: PropTypes.string,
    isPublic: PropTypes.bool,
    favorite: PropTypes.bool,
    song_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

SnippetForm.defaultProps = {
  obj: initialState,
};

export default SnippetForm;
