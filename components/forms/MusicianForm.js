import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createMusician, updateMusician } from '../../api/musicianData';

const initialState = {
  firebaseKey: '',
  name: '',
  bio: '',
  image: '',
  instrument: '',
  uid: '',
};

export default function MusicianForm({ obj }) {
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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMusician(formInput)
        .then(() => router.push(`/musician/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMusician(payload).then(() => {
        router.push('/musicians');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Musician</h2>

      <FloatingLabel controlId="floatingInput1" label="Musician Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Musician Instrument" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="instrument"
          value={formInput.instrument}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Musician Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Author Bio" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Bio"
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT MUSICIAN  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Musician</Button>
    </Form>
  );
}

MusicianForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    instrument: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
  }),
};

MusicianForm.defaultProps = {
  obj: initialState,
};
