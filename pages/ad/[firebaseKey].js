/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAdDetails } from '../../api/mergedData';

export default function ViewAd() {
  const [adDetails, setAdDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  console.warn(adDetails);
  useEffect(() => {
    viewAdDetails(firebaseKey).then(setAdDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-black ms-5 details">
        <h5>
          {adDetails.name} Created by {adDetails.musicianObject[0]?.name}
        </h5>
        Preferred Chamber: <p>{adDetails?.chamber}</p>
        <p>{adDetails.description || ''}</p>
      </div>
    </div>
  );
}
