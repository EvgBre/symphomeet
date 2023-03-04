import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAds = (uid) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-template-curly-in-string
  fetch(`${endpoint}/ads.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteAd = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ads/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleAd = (firebaseKey) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-template-curly-in-string
  fetch(`${endpoint}/ads/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const createAd = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ads.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateAd = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ads/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAdMusicians = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians.json?orderBy="ad_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAds,
  deleteAd,
  getSingleAd,
  createAd,
  updateAd,
  getAdMusicians,
};
