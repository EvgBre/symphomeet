/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAdDetails } from '../../api/mergedData';

export default function ViewAd() {
  const [adDetails, setAdDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAdDetails(firebaseKey).then(setAdDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={adDetails.image} alt={adDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {adDetails.name} Created by {adDetails.musicianObject?.name}
        </h5>
        Preferred Chamber: <p>{adDetails.musicianObject.chamber}</p>
        <p>{adDetails.description || ''}</p>
      </div>
    </div>
  );
}
