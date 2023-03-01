import client from '../utils/client';

const endpoint = client.databaseURL;

const getMusicians = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createMusicians = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians.json`, {
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

const getSingleMusician = (firebaseKey) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-template-curly-in-string
  fetch(`${endpoint}/musicians/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const deleteSingleMusician = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const updateMusician = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians/${payload.firebaseKey}.json`, {
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

const getMusicianAds = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ads.json?orderBy="muscian_id"&equalTo="${firebaseKey}"`, {
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
  getMusicians,
  createMusicians,
  getSingleMusician,
  deleteSingleMusician,
  updateMusician,
  getMusicianAds,
};