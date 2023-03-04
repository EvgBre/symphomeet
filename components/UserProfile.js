import React from 'react';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <div>
      <h1>Name: {user.displayName}</h1>
      <Image src={user.photoURL} alt="userURL" width="100px" height="100px" />
      <h2>Bio: {user.bio}</h2>
      <h2>Instrument: {user.instrument}</h2>
      <h3>Last Login {user.metadata.lastSignInTime}</h3>
    </div>
  );
}
