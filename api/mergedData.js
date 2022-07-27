import { deletePlayer } from './playersData';
import { getSingleTeam, getPlayersByTeam, deleteTeam } from './teamsData';

const viewTeamDetails = (teamfirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamfirebaseKey),
    getPlayersByTeam(teamfirebaseKey)])
    .then(([teamObj, teamPlayersArray]) => {
      resolve({ ...teamObj, players: teamPlayersArray });
    })
    .catch(reject);
});

const deleteTeamPlayers = (teamfirebaseKey) => new Promise((resolve, reject) => {
  getPlayersByTeam(teamfirebaseKey).then((teamPlayersArray) => {
    const deletePlayersPromises = teamPlayersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayersPromises).then(() => {
      // eslint-disable-next-line no-undef
      deleteTeam(teamfirebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { viewTeamDetails, deleteTeamPlayers };
