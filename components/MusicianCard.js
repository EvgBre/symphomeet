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

  const isCurrentUser = musicianObj.uid === user.uid;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
      <Card style={{
        width: '18rem', margin: '10px',
      }}
      >
        <Card.Img variant="top" src={musicianObj.image} alt={musicianObj.name} style={{ height: '200px' }} />
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Card.Title>{musicianObj.name}</Card.Title>
          <Card.Text>{musicianObj.instrument}</Card.Text>
          <div className="d-flex flex-row justify-content-evenly">
            <Link href={`/musician/${musicianObj.firebaseKey}`} passHref>
              <Button className="m-2 flex-grow-1" style={{ maxWidth: '80px' }}>View</Button>
            </Link>
            {isCurrentUser && (
            <>
              <Link href={`/musician/edit/${musicianObj.firebaseKey}`} passHref>
                <Button className="m-2 flex-grow-1" style={{ maxWidth: '80px' }}>Edit</Button>
              </Link>
              <Button onClick={deleteThisMusician} className="m-2 flex-grow-1" style={{ maxWidth: '80px' }}>
                Remove
              </Button>
            </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
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
