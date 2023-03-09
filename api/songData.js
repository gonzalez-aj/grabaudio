import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSongs = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json`, {
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

const getSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${payload.firebaseKey}.json`, {
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

const getSnippetsBySong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/Snippets.json?orderBy="Song_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getPublicSongs = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const publicSongs = Object.values(data).filter((item) => item.isPublic === true);
        resolve(publicSongs);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const faveSongs = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favoriteSong = Object.values(data).filter((item) => item.favorite);
      resolve(favoriteSong);
    })
    .catch(reject);
});

export {
  getSongs,
  getSingleSong,
  createSong,
  updateSong,
  deleteSingleSong,
  getSnippetsBySong,
  getPublicSongs,
  faveSongs,
};
