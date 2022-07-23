import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve((Object.values(response.data)));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player/${firebaseKey}"`)
    .then(resolve)
    .catch(reject);
});

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/player.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/player/${response.data.name}.json`, payload)
        .then(resolve);
    })
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  getSinglePlayer,
};
