/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getSingleMusicianByUid } from '../api/musicianData';

export default function UserProfile() {
  const { user } = useAuth();
  const [userObject, setUserObject] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;
  const getSingleUser = () => {
    getSingleMusicianByUid(user.uid).then(setUserObject);
  };

  useEffect(() => {
    getSingleUser();
  }, [firebaseKey]);
  return (
    <div>
      <h1>Name: {user.displayName}</h1>
      <Image src={user.photoURL} alt="userURL" width="100px" height="100px" />
      <h2>Bio: {userObject?.bio}</h2>
      <h2>Instrument: {userObject?.instrument}</h2>
      <h3>Last Login {user.metadata.lastSignInTime}</h3>
    </div>
  );
}
