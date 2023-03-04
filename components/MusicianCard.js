import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteMusicianAds } from '../api/mergedData';

export default function MusicianCard({ musicianObj, onUpdate }) {
  const deleteThisMusician = () => {
    if (window.confirm(`Delete ${musicianObj.name}?`)) {
      deleteMusicianAds(musicianObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={musicianObj.image} alt={musicianObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{musicianObj.name}</Card.Title>
        <Card.Title>{musicianObj.name}</Card.Title>
        <Card.Text>{musicianObj.instrument}</Card.Text>
        <Card.Text>{musicianObj.bio}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/musician/${musicianObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/musician/edit/${musicianObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMusician} className="m-2">
          REMOVE
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
