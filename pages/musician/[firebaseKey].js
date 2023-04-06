/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewMusicianDetails, deleteMusicianAds } from '../../api/mergedData';
import AdCard from '../../components/AdCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewMusician() {
  const { user } = useAuth();
  const [musicianDetails, setMusicianDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  const viewMusicianAds = () => {
    viewMusicianDetails(firebaseKey).then(setMusicianDetails);
  };

  const deleteThisMusician = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      deleteMusicianAds(user.firebaseKey);
    }
  };

  useEffect(() => {
    viewMusicianDetails(firebaseKey).then(setMusicianDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap" style={{ width: 'auto' }}>
      <div className="d-flex flex-column" style={{ flexBasis: '30%' }}>
        <img src={musicianDetails.image} alt={musicianDetails.name} style={{ width: '300px' }} />
      </div>
      <div
        className="text-black ms-5 details"
        style={{
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', width: '500px',
        }}
      >
        <h5>
          {musicianDetails?.name}
        </h5>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Musician Instrument:</span> {musicianDetails.instrument}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Bio:</span> {musicianDetails.bio}
        </div>
        <div className="d-flex" style={{ width: '70%', justifyContent: 'space-between' }}>
          {user.uid === musicianDetails.uid ? (
            <Link href={`/musician/edit/${musicianDetails.firebaseKey}`} passHref>
              <Button className="m-2" style={{ height: '50px', width: '140px' }}>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                  Edit Profile
                </div>
              </Button>
            </Link>
          ) : ''}
          {user.uid === musicianDetails.uid ? (
            <Button onClick={deleteThisMusician} className="m-2" style={{ height: '50px', width: '140px' }}>
              Delete Account
            </Button>
          ) : ''}
        </div>
      </div>
      <hr style={{ flexBasis: '100%', borderBottom: '1px solid black' }} />
      <div className="d-flex flex-wrap">
        {musicianDetails.ads?.map((ad) => (
          <AdCard key={ad.firebaseKey} adObj={ad} onUpdate={viewMusicianAds} />
        ))}
      </div>
    </div>
  );
}
