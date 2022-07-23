import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeam = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/team.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve((Object.values(response.data))))
    .catch(reject);
});

export default getTeam;
