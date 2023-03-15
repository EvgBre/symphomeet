import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAd, getSingleAd, updateAd } from '../../api/adData';

const initialState = {
  name: '',
  chamber: '',
  description: '',
  public: false,
};

function AdForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { setUser, uid } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, uid]);

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
      updateAd(formInput)
        .then(() => router.push(`/ad/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid };
      createAd(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAd(patchPayload).then(() => {
          getSingleAd(uid).then((adData) => {
            setUser(adData);
            router.push('/ads');
          });
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Ad</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Ad Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CHAMBER INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Ad Chamber" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter chamber preferences..."
          name="chamber"
          value={formInput.chamber}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
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

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="public"
        name="public"
        label="Want others to see?"
        checked={formInput.public}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            public: e.target.checked,
          }));
        }}
      />

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Ad</Button>
    </Form>
  );
}

AdForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    chamber: PropTypes.string,
    public: PropTypes.bool,
    name: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

AdForm.defaultProps = {
  obj: initialState,
};

export default AdForm;
