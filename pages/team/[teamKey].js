import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function IndividualTeamPage() {
  const router = useRouter();
  const [teamDetails, setTeamDetails] = useState({});
  const { teamKey } = router.query;

  useEffect(() => {
    viewTeamDetails(teamKey).then(setTeamDetails);
  }, [teamKey]);
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
              viewTeamDetails(teamKey).then(setTeamDetails);
            }}
          />
        ))}
      </div>
    </>
  );
}
