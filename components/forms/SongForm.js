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
  lyrics: '',
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
        .then(() => router.push('/song/yoursongs'));
    } else {
      // const lyrics = document.getElementById('lyrics')?.value ?? '';
      const lyricsWithLineBreaks = formInput.lyrics.replace(/[\r\n]+/g, '\\n');
      const payload = {
        ...formInput, uid: user.uid, lyrics: lyricsWithLineBreaks,
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

        <div className="">Lyrics</div>
        <FloatingLabel controlId="floatingTextarea2" label="Song Lyrics" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Lyrics"
            style={{ height: '200px' }}
            name="lyrics"
            value={formInput.lyrics}
            onChange={handleChange}
            required
            className="form-lyrics"
          />
        </FloatingLabel>

        <div className="">{formInput.bpm} BPM</div>
        <FloatingLabel className="m-4 mb-6" label="">
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
            <option value="C maj">C maj</option>
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
    lyrics: PropTypes.string,
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
