import React, { useEffect, useState } from 'react';
import { getPublicTeams } from '../api/teamsData';
import TeamCard from '../components/TeamCard';

export default function PublicTeams() {
  const [teams, setTeams] = useState();
  const getAllTeams = () => {
    getPublicTeams().then(setTeams);
  };
  useEffect(() => {
    getAllTeams();
    console.warn(teams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>Public Teams</h2>
      <div className="playerCardContainer">
        {teams?.map((team) => (
          <TeamCard key={team.teamKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
