/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteAd } from '../api/adData';
import { useAuth } from '../utils/context/authContext';
import { getMusicians } from '../api/musicianData';

function AdCard({ adObj, onUpdate }) {
  const { user } = useAuth();
  const [appMusician, setAppMusician] = useState([]);
  const getAppMusician = () => {
    getMusicians().then((musicianArr) => {
      const appMusicianObj = musicianArr.find((musicianObj) => musicianObj.uid === user.uid);
      setAppMusician(appMusicianObj);
    });
  };
  useEffect(() => {
    getAppMusician();
  }, [user]);

  const deleteThisAd = () => {
    if (window.confirm(`Delete ${adObj.name}?`)) {
      deleteAd(adObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{adObj.name}</Card.Title>
        <p className="card-text bold">{adObj.chamber}</p>
        <Link href={`/ad/${adObj.firebaseKey}`} passHref>
          <Button className="view-button m-2">View Details</Button>
        </Link>
        <Link href={`/ad/edit/${adObj.firebaseKey}`} passHref>
          {adObj.uid === appMusician.uid ? (<Button className="edit-button">Edit</Button>) : ''}
        </Link>
        {adObj.uid === appMusician.uid ? (
          <Button onClick={deleteThisAd} className="delete-button m-2">
            Delete
          </Button>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

AdCard.propTypes = {
  adObj: PropTypes.shape({
    chamber: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdCard;
