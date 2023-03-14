import { getSingleMusician, getMusicianAds, deleteSingleMusician } from './musicianData';
import { deleteAd, getSingleAd } from './adData';

const viewAdDetails = (adFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAd(adFirebaseKey).then((adObj) => {
    getSingleMusician(adObj.uid).then((musicianObject) => resolve({ ...adObj, musicianObject }));
  }).catch(reject);
});

const viewMusicianDetails = (musicianFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMusician(musicianFirebaseKey).then((musicianObject) => {
    getMusicianAds(musicianObject.uid).then((ads) => console.warn[{ ...musicianObject, ads }]);
  }).catch((error) => reject(error));
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
