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
      <Link href="/team/newTeam" passHref>
        <Button variant="primary" className="m-2">
          Add New Team
        </Button>
      </Link>
      <h1>Teams</h1>
      <h3 className="homePageh3">Here are the current teams:</h3>
      <div className="playerCardContainer">
        {teams?.map((team) => (
          <TeamCard key={team.teamfirebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
