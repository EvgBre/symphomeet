import {
  getSingleMusicianByUid, getSingleMusician, getMusicianAds, deleteSingleMusician,
} from './musicianData';
import { deleteAd, getSingleAd } from './adData';

const viewAdDetails = (adFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAd(adFirebaseKey).then((adObj) => {
    getSingleMusicianByUid(adObj.uid).then((musicianObject) => resolve({ ...adObj, musicianObject }));
  }).catch(reject);
});

const viewMusicianDetails = (musicianFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMusician(musicianFirebaseKey).then((musicianObject) => {
    getMusicianAds(musicianObject.uid).then((ads) => resolve({ ...musicianObject, ads }));
  }).catch((error) => reject(error));
});

const deleteMusicianAds = (firebaseKey) => new Promise((resolve, reject) => {
  getMusicianAds(firebaseKey).then((AdsArray) => {
    console.warn(AdsArray, 'Musician Ads');
    const deleteAdPromises = AdsArray.map((ad) => deleteAd(ad.firebaseKey));

    Promise.all(deleteAdPromises).then(() => {
      deleteSingleMusician(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { viewAdDetails, viewMusicianDetails, deleteMusicianAds };
