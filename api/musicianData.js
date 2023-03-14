import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getMusicians = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getMusicianLogin = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/musicians.json?orderBy="uid"&equalTo="${uid}"`, {
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
    }).catch(reject);
});

const createMusician = (payload) => new Promise((resolve, reject) => {
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
  fetch(`${endpoint}/musicians/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve({});
      }
    }).catch(reject);
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

const getMusicianAds = (uid) => new Promise((resolve, reject) => {
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
    }).catch(reject);
});
export {
  getMusicians,
  createMusician,
  getSingleMusician,
  deleteSingleMusician,
  updateMusician,
  getMusicianAds,
  getMusicianLogin,
};
