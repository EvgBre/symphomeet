import React, { useEffect, useState } from 'react';
import { getMusicians } from '../api/musicianData';
// import { useAuth } from '../utils/context/authContext';
import MusicianCard from '../components/MusicianCard';

export default function ShowMusicians() {
  const [musicians, setMusicians] = useState([]);

  const getAllMusicians = () => {
    getMusicians().then(setMusicians);
  };

  useEffect(() => {
    getAllMusicians();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div>
        {musicians.map((musician) => (
          <MusicianCard key={musician.firebaseKey} musicianObj={musician} onUpdate={getAllMusicians} />
        ))}
      </div>
    </div>
  );
}
