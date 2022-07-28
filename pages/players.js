import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/playersData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';
import SearchPlayer from '../components/SearchPlayer';

export default function PlayerPage() {
  const [players, setPlayers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then((playerArr) => {
      setPlayers(playerArr);
      setFilteredData(playerArr);
    });
  };
  useEffect(() => {
    getAllPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Link href="/player/newPlayer" passHref>
        <Button variant="primary" className="m-2">
          Add New Player
        </Button>
      </Link>
      <SearchPlayer players={players} setFilteredData={setFilteredData} />
      <h3 className="homePageh3">Here are the current players on all your teams:</h3>
      <div className="playerCardContainer">
        {filteredData?.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </>
  );
}
