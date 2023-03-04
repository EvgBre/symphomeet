import { getSingleMusician, getMusicianAds, deleteSingleMusician } from './musicianData';
import { deleteAd, getSingleAd } from './adData';

const viewAdDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAd(firebaseKey).then((adObj) => {
    getSingleMusician(adObj.musician_id).then((musicianObject) => resolve({ ...adObj, musicianObject }));
  }).catch(reject);
});

const viewMusicianDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleMusician(firebaseKey).then((musicianObject) => {
    getMusicianAds(firebaseKey).then((adsArray) => resolve({ ...musicianObject, adsArray }));
  }).catch(reject);
});

const deleteMusicianAds = (uid) => new Promise((resolve, reject) => {
  getMusicianAds(uid).then((AdsArray) => {
    console.warn(AdsArray, 'Author Books');
    const deleteAdPromises = AdsArray.map((ad) => deleteAd(ad.firebaseKey));

    Promise.all(deleteAdPromises).then(() => {
      deleteSingleMusician(uid).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewAdDetails, viewMusicianDetails, deleteMusicianAds };
