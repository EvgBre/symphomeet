import { getSingleMusician, getMusicianAds } from './musicianData';
import { getSingleAd } from './adData';

const getAdDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAd(firebaseKey).then((adObj) => {
    getSingleMusician(adObj.musician_id).then((musicianObject) => resolve({ ...adObj, musicianObject }));
  }).catch(reject);
});

const getMusicianDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleMusician(firebaseKey).then((musicianObject) => {
    getMusicianAds(firebaseKey).then((adsArray) => resolve({ ...musicianObject, adsArray }));
  }).catch(reject);
});

export { getAdDetails, getMusicianDetails };
