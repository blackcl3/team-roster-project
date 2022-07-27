import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete the ${teamObj.teamName}?`)) {
      // eslint-disable-next-line no-undef
      deleteTeam(teamObj.teamfirebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.imageURL} alt={teamObj.imageURL} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          The {teamObj.teamCity} {teamObj.teamName}
        </Card.Title>
        <p>City: {teamObj.teamCity}</p>
        <p>Can Anyone View This Team? {teamObj.public ? 'Public' : 'Private'} </p>
        <Link href={`/team/${teamObj.teamfirebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/team/edit/${teamObj.teamfirebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    teamName: PropTypes.string,
    teamCity: PropTypes.string,
    imageURL: PropTypes.string,
    teamfirebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
