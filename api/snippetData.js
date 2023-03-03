import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSnippets = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createSnippet = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets.json`, {
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

const getSingleSnippet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleSnippet = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSnippet = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets/${payload.firebaseKey}.json`, {
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

const faveSnippets = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/snippets.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const faveSnip = Object.values(data).filter((item) => item.favorite);
      resolve(faveSnip);
    })
    .catch(reject);
});

export {
  getSnippets,
  getSingleSnippet,
  deleteSingleSnippet,
  updateSnippet,
  createSnippet,
  faveSnippets,
};
