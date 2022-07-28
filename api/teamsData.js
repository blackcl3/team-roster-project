import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve((Object.values(response.data))))
    .catch(reject);
});

const getSingleTeam = (teamKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team/${teamKey}.json`)
    .then((response) => resolve((response.data)))
    .catch(reject);
});

const getPlayersByTeam = (teamKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json?orderBy="teamfirebaseKey"&equalTo="${teamKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/team.json`, teamObj)
    .then((response) => {
      const payload = { teamKey: response.data.name };
      axios.patch(`${dbUrl}/team/${response.data.name}.json`, payload)
        .then(resolve);
    })
    .catch(reject);
});

const updateTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/team/${teamObj.teamKey}.json`, teamObj)
    .then(() => getTeams(uid).then(resolve))
    .catch(reject);
});

const deleteTeam = (teamKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/team/${teamKey}.json`)
    .then(() => getTeams(uid).then(resolve))
    .catch(reject);
});

export {
  getTeams, getSingleTeam, getPlayersByTeam, createTeam, updateTeam, deleteTeam,
};
