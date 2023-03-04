import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAd } from '../../../api/adData';
import AdForm from '../../../components/forms/AdForm';

export default function EditAd() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAd(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<AdForm obj={editItem} />);
}
