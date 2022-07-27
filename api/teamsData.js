import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve((Object.values(response.data))))
    .catch(reject);
});

const getSingleTeam = (teamfirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team/${teamfirebaseKey}.json`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

const getPlayersByTeam = (teamfirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json?orderBy="teamfirebaseKey"&equalTo="${teamfirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/team.json`, teamObj)
    .then((response) => {
      const payload = { teamfirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/team/${response.data.name}.json`, payload)
        .then(resolve);
    })
    .catch(reject);
});

const updateTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/team/${teamObj.teamfirebaseKey}.json`, teamObj)
    .then(() => getTeams(uid).then(resolve))
    .catch(reject);
});

export {
  getTeams, getSingleTeam, getPlayersByTeam, createTeam, updateTeam,
};
