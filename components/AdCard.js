import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteAd } from '../api/adData';

function AdCard({ adObj, onUpdate }) {
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
          <Button className="view-button m-2">VIEW</Button>
        </Link>
        <Link href={`/ad/edit/${adObj.firebaseKey}`} passHref>
          <Button className="edit-button">EDIT</Button>
        </Link>
        <Button onClick={deleteThisAd} className="delete-button m-2">
          DELETE
        </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdCard;
