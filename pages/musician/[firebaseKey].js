/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMusicianDetails } from '../../api/mergedData';
import AdCard from '../../components/AdCard';

export default function ViewMusician() {
  const [musicianDetails, setMusicianDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;
  const viewMusicianAds = () => {
    viewMusicianDetails(firebaseKey).then(setMusicianDetails);
  };

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMusicianDetails(firebaseKey).then(setMusicianDetails);
  }, [firebaseKey]);
  console.warn('View', musicianDetails);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={musicianDetails.image} alt={musicianDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {musicianDetails?.name}
        </h5>
        Musician Instrument: <a href={musicianDetails.instrument}>{musicianDetails.instrument}</a>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        {musicianDetails.ads?.map((ad) => (
          <AdCard key={ad.firebaseKey} adObj={ad} onUpdate={viewMusicianAds} />
        ))}
      </div>
    </div>
  );
}
