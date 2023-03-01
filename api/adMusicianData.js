import client from '../utils/client';

const endpoint = client.databaseURL;

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

const createAdMusician = (payload) => new Promise((resolve, reject) => {
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
export {
  getAdMusicians,
  createAdMusician,
};
