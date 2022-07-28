import { deletePlayer } from './playersData';
import { getSingleTeam, getPlayersByTeam, deleteTeam } from './teamsData';

const viewTeamDetails = (teamfirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamfirebaseKey), getPlayersByTeam(teamfirebaseKey)])
    .then(([teamObj, teamPlayersArray]) => {
      resolve({ ...teamObj, players: teamPlayersArray });
    })
    .catch(reject);
});

const deleteTeamPlayers = (teamKey) => new Promise((resolve, reject) => {
  getPlayersByTeam(teamKey).then((teamPlayersArray) => {
    const deletePlayersPromises = teamPlayersArray.map((player) => deletePlayer(player.firebaseKey));

    Promise.all(deletePlayersPromises).then(() => {
      deleteTeam(teamKey).then(resolve);
    });
  }).catch(reject);
});

export { viewTeamDetails, deleteTeamPlayers };
