import { getSingleMusician, getMusicianAds, deleteSingleMusician } from './musicianData';
import { deleteAd, getSingleAd } from './adData';

const viewAdDetails = (adFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAd(adFirebaseKey).then((adObj) => {
    getSingleMusician(adObj.uid).then((musicianObject) => resolve({ ...adObj, musicianObject }));
  }).catch(reject);
});

const viewMusicianDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleMusician(firebaseKey).then((musicianObject) => {
    getMusicianAds(firebaseKey).then((adsArray) => resolve({ ...musicianObject, adsArray }));
  }).catch(reject);
});

const deleteMusicianAds = (uid) => new Promise((resolve, reject) => {
  getMusicianAds(uid).then((AdsArray) => {
    console.warn(AdsArray, 'Musician Ads');
    const deleteAdPromises = AdsArray.map((ad) => deleteAd(ad.firebaseKey));

    Promise.all(deleteAdPromises).then(() => {
      deleteSingleMusician(uid).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewAdDetails, viewMusicianDetails, deleteMusicianAds };
