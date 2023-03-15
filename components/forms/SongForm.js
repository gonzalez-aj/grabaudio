import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { createSong, updateSong } from '../../api/songData';

const initialState = {
  firebaseKey: '',
  title: '',
  description: '',
  bpm: 40,
  keyOf: '',
  isPublic: false,
  favorite: false,
};

function SongForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      updateSong(formInput)
        .then(() => router.push('/profile'));
    } else {
      const payload = {
        ...formInput, uid: user.uid,
      };
      createSong(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateSong(patchPayloadFBK).then(() => {
          router.push('/song/yoursongs');
        });
      });
    }
  };

  return (
    <>
      <Head><title>{obj.firebaseKey ? `Update ${obj.title} Song` : 'Create Song'}</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{obj.firebaseKey ? 'Update' : 'Create'} Song</h2>
        <div className="mt-5" />

        <div className="">Title</div>
        <FloatingLabel controlId="floatingInput1" label="Song Title" className="mb-3">
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
        <FloatingLabel controlId="floatingTextarea" label="Song Description" className="mb-3">
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
        <FloatingLabel className="m-4 mb-6" label="BPM">
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
            <option value="Ab Major">Ab Major</option>
            <option value="A Major">A Major</option>
            <option value="Bb Major">Bb Major</option>
            <option value="B Major">B Major</option>
            <option value="C Major">C Major</option>
            <option value="Cb Major">C#/Db Major</option>
            <option value="D Major">D Major</option>
            <option value="Eb Major">Eb Major</option>
            <option value="E Major">E Major</option>
            <option value="F Major">F Major</option>
            <option value="Fb Major">F#/Gb Major</option>
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

        <Button variant="outline-dark" className="m-2 text-color-drkblu" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Song</Button>
      </Form>
    </>
  );
}

SongForm.propTypes = {
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

SongForm.defaultProps = {
  obj: initialState,
};

export default SongForm;
