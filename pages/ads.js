/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAds } from '../api/adData';
import { useAuth } from '../utils/context/authContext';
import AdCard from '../components/AdCard';

export default function ShowAds() {
  const [ads, setAds] = useState([]);

  const { user } = useAuth();

  const getAllTheAds = () => {
    getAds(user.uid).then(setAds);
  };

  useEffect(() => {
    getAllTheAds();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/ad/new" passHref>
        <Button>Make an Ad</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {ads.map((ad) => (
          <AdCard key={ad.firebaseKey} adObj={ad} onUpdate={getAllTheAds} />
        ))}
      </div>

    </div>
  );
}
