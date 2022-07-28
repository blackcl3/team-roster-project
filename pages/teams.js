import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import { getTeams } from '../api/teamsData';

export default function TeamPage() {
  const [teams, setTeams] = useState();
  const { user } = useAuth();
  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };
  useEffect(() => {
    getAllTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>Teams</h2>
      <div className="addteamButtonDiv">
        <Link href="/team/newTeam" passHref>
          <Button variant="primary" className="addteamButton">
            Add New Team
          </Button>
        </Link>
      </div>
      <h3 className="homePageh3">Here are your current teams:</h3>
      <div className="playerCardContainer">
        {teams?.map((team) => (
          <TeamCard key={team.teamKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
