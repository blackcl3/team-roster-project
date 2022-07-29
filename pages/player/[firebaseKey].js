import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewPlayerDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function IndividualPlayerPage() {
  const router = useRouter();
  const [playerDetails, setPlayerDetails] = useState({});
  const { firebaseKey } = router.query;

  function getPlayerDetails() {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }

  useEffect(() => {
    getPlayerDetails();
    console.warn(playerDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div className="playerDetailsContainer container">
        <PlayerCard
          playerObj={playerDetails}
          onUpdate={() => {
            viewPlayerDetails(firebaseKey.then(setPlayerDetails));
          }}
        />
        <div className="playerDetailsTeamText">
          <h2>Team: {playerDetails.teamObj?.teamName}</h2>
          <h3>City: {playerDetails?.teamObj?.teamCity}</h3>
        </div>
      </div>
    </>
  );
}
