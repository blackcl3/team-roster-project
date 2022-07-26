import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamsData';

export function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { teamKey } = router.query;

  useEffect(() => {
    getSingleTeam(teamKey).then(setEditItem);
  }, [teamKey]);

  return (<TeamForm obj={editItem} />);
}

export default EditTeam;
