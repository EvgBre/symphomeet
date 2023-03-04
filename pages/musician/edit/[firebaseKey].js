import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMusician } from '../../../api/musicianData';
import MusicianForm from '../../../components/forms/MusicianForm';

export default function EditMusician() {
  const router = useRouter();
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMusician(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<MusicianForm obj={editItem} />);
}
