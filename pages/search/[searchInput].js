/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMusicians } from '../../api/musicianData';
import { getAds } from '../../api/adData';
import MusicianCard from '../../components/MusicianCard';
import AdCard from '../../components/AdCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchResult() {
  // FUNCTION TO GET THE APP USER OBJECT
  const { uid } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getMusicians().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [uid]);

  const [searchAdResults, setSearchAdResults] = useState([]);
  const [searchMusicianResults, setSearchMusicianResults] = useState([]);

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchAdResults = () => {
    getAds().then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((ads) => ads.name.toLowerCase().includes(searchInput)
        || ads.chamber.toLowerCase().includes(searchInput));
      setSearchAdResults(filterResults);
    });
  };
  const getSearchMusicianResults = () => {
    getMusicians().then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((musicians) => musicians.name.toLowerCase().includes(searchInput)
      || musicians.instrument.toLowerCase().includes(searchInput));
      setSearchMusicianResults(filterResults);
    });
  };

  useEffect(() => {
    getSearchAdResults();
    return () => {
      setSearchAdResults([]);
    };
  }, [searchInput]);

  useEffect(() => {
    getSearchMusicianResults();
    return () => {
      setSearchMusicianResults([]);
    };
  }, [searchInput]);

  return (
    <div>
      <h3 className="pageheaderflexwrap">Ads</h3>
      <div className="adcardcontainer">
        {searchAdResults.length === 0 ? (<p>No ads found</p>)
          : (searchAdResults.map((ad) => (
            <AdCard key={ad.firebaseKey} adObj={ad} onUpdate={getSearchAdResults} />
          )))}
      </div>
      <h3 className="pageheaderflexwrap">Musicians</h3>
      <div className="musiciancardcontainer">
        {searchMusicianResults.length === 0 ? (<p>No musicians found</p>)
          : (searchMusicianResults.map((musician) => (
            <MusicianCard key={musician.firebaseKey} musicianObj={musician} onUpdate={getSearchMusicianResults} appUser={appUser} />
          )))}
      </div>
    </div>
  );
}
