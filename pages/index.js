import React, { useEffect, useState } from 'react';
import { getPlayers } from '../api/playersData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';

function Home() {
  const [players, setPlayers] = useState();
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };
  useEffect(() => {
    getAllPlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h1>Welcome to HomeTeam, {user.displayName}!</h1>
      <h3>Here are the current players on your team:</h3>
      <div className="playerCardContainer">
        {players?.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </>
  );
}

export default Home;
