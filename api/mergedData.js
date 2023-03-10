import { deleteSingleSong, getSnippetsBySong, getSingleSong } from './songData';
import { deleteSingleSnippet, getSingleSnippet } from './snippetData';

const viewSongDetails = (songFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleSong(songFirebaseKey), getSnippetsBySong(songFirebaseKey)])
    .then(([songObject, songSnippetsArray]) => {
      resolve({ ...songObject, snippets: songSnippetsArray });
    }).catch((error) => reject(error));
});

const viewSnippetDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleSnippet(firebaseKey).then((snippet) => {
    getSingleSong(snippet.song_id)
      .then((songData) => resolve({ ...snippet, songData }));
  }).catch(reject);
});

const deleteSongSnippets = (songId) => new Promise((resolve, reject) => {
  getSnippetsBySong(songId).then((snippetsArray) => {
    const deleteSnippetPromises = snippetsArray.map((snippet) => deleteSingleSnippet(snippet.firebaseKey));

    Promise.all(deleteSnippetPromises).then(() => {
      deleteSingleSong(songId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewSongDetails, deleteSongSnippets, viewSnippetDetails };
