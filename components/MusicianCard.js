/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getMusicians } from '../api/musicianData';

export default function MusicianCard({ musicianObj }) {
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
      <Card style={{
        width: '18rem', margin: '10px',
      }}
      >
        <Card.Img variant="top" src={musicianObj.image} alt={musicianObj.name} style={{ width: '175px', height: '175px', margin: 'auto' }} className="rounded-circle mt-3" />
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Card.Title>{musicianObj.name}</Card.Title>
          <Card.Text>{musicianObj.instrument}</Card.Text>
          <div className="d-flex flex-row justify-content-evenly">
            <Link href={`/musician/${musicianObj.firebaseKey}`} passHref>
              <Button className="m-2 flex-grow-1" style={{ maxWidth: '80px' }}>View</Button>
            </Link>
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
};
