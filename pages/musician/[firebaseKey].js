/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewMusicianDetails, deleteMusicianAds } from '../../api/mergedData';
import AdCard from '../../components/AdCard';
import { useAuth } from '../../utils/context/authContext';
import { getSingleMusician } from '../../api/musicianData';

export default function ViewMusician() {
  const { user } = useAuth();
  const [appMusician, setAppMusician] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const getAppMusician = () => {
    getSingleMusician(firebaseKey).then(setAppMusician);
  };
  useEffect(() => {
    getAppMusician();
  }, [firebaseKey]);

  const [ads] = useState([]);
  const getMusicianAds = () => {
    viewMusicianDetails(firebaseKey).then(setAppMusician);
  };
  useEffect(() => {
    getMusicianAds();
  }, [appMusician]);

  const deleteThisMusician = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      deleteMusicianAds(appMusician.firebaseKey);
    }
  };

  return (
    <div className="mt-5 d-flex flex-wrap" style={{ width: 'auto' }}>
      <div className="d-flex flex-column" style={{ flexBasis: '30%' }}>
        <img src={appMusician.image} alt={appMusician.name} style={{ width: '275px', height: '275px' }} className="rounded-circle mt-3" />
      </div>
      <div
        className="text-black ms-5 details"
        style={{
          display: 'flex', flexWrap: 'wrap', flexDirection: 'column', width: '500px',
        }}
      >
        <h5>
          {appMusician?.name}
        </h5>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Musician Instrument:</span> {appMusician.instrument}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Bio:</span> {appMusician.bio}
        </div>
        <div className="d-flex" style={{ width: '70%', justifyContent: 'space-between' }}>
          {user.uid === appMusician.uid ? (
            <Link href={`/musician/edit/${appMusician.firebaseKey}`} passHref>
              <Button className="m-2" style={{ height: '50px', width: '140px' }}>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                  Edit Profile
                </div>
              </Button>
            </Link>
          ) : ''}
          {user.uid === appMusician.uid ? (
            <Button onClick={deleteThisMusician} className="m-2" style={{ height: '50px', width: '140px' }}>
              Delete Account
            </Button>
          ) : ''}
        </div>
      </div>
      <hr style={{ flexBasis: '100%', borderBottom: '1px solid black' }} />
      <div className="d-flex flex-wrap">
        {ads.length === 0 ? (<p>No ads found</p>)
          : (appMusician.ads?.map((ad) => (
            <AdCard key={ad.firebaseKey} adObj={ad} onUpdate={getMusicianAds} />
          )))}
      </div>
    </div>
  );
}
