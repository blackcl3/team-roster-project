import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function IndividualTeamPage() {
  const router = useRouter();
  const [teamDetails, setTeamDetails] = useState({});
  const { teamfirebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(teamfirebaseKey).then(setTeamDetails);
  }, [teamfirebaseKey]);
  return (
    <>
      <div>{teamDetails.teamName}</div>
      <div>{teamDetails.teamCity}</div>
      <div className="playerCardContainer">
        {teamDetails.players?.map((player) => (
          <PlayerCard
            key={player.firebaseKey}
            playerObj={player}
            onUpdate={() => {
              viewTeamDetails(teamfirebaseKey).then(setTeamDetails);
            }}
          />
        ))}
      </div>
    </>
  );
}
