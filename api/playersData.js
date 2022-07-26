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
  axios.get(`${dbUrl}/player/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
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

const updatePlayer = (playerObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/player/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers(uid).then(resolve))
    .catch(reject);
});

const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/player/${firebaseKey}.json`)
    .then(() => getPlayers(uid).then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
