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

const initialState = {
  firebaseKey: '',
  title: '',
  description: '',
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
  useEffect(() => {
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
    console.warn('handleChange', e);
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
      console.warn('payload', payload);
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
          <FloatingLabel controlId="floatingInput0" label="Snippet File" className="mb-3">
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
        <FloatingLabel className="custom-slider m-4 mb-6" label="BPM">
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
            <option value="A Major">A Major</option>
            <option value="B Major">B Major</option>
            <option value="C Major">C Major</option>
            <option value="D Major">D Major</option>
            <option value="E Major">E Major</option>
            <option value="F Major">F Major</option>
            <option value="G Major">G Major</option>
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
    title: PropTypes.string,
    description: PropTypes.string,
    bpm: PropTypes.number,
    keyOf: PropTypes.string,
    isPublic: PropTypes.bool,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

SnippetForm.defaultProps = {
  obj: initialState,
};

export default SnippetForm;
