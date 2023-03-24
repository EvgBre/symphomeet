/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteMusicianAds } from '../api/mergedData';
import { getMusicians } from '../api/musicianData';

export default function MusicianCard({ musicianObj, onUpdate }) {
  const { user } = useAuth();
  const [, setAppMusician] = useState([]);
  const getAppMusician = () => {
    getMusicians().then((musicianArr) => {
      const appMusicianObj = musicianArr.find(() => musicianObj.uid === user.uid);
      setAppMusician(appMusicianObj);
    });
  };
  useEffect(() => {
    getAppMusician();
  }, [user]);

  const deleteThisMusician = () => {
    if (window.confirm(`Delete ${musicianObj.name}?`)) {
      deleteMusicianAds(musicianObj).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={musicianObj.image} alt={musicianObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{musicianObj.name}</Card.Title>
        <Card.Text>{musicianObj.instrument}</Card.Text>
        <Card.Text>{musicianObj.bio}</Card.Text>
        <Link href={`/musician/${musicianObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/musician/edit/${musicianObj.firebaseKey}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMusician} className="m-2">
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

MusicianCard.propTypes = {
  musicianObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    instrument: PropTypes.string,
    bio: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
