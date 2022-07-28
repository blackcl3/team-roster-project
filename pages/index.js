import React from 'react';
import { useAuth } from '../utils/context/authContext';
import TeamPage from './teams';

function Home() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="homePageh1">Welcome to HomeTeam, {user.displayName}!</h1>
      <TeamPage />
    </>
  );
}

export default Home;
