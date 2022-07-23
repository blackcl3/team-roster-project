/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getSinglePlayer } from '../../../api/playersData';
import PlayerForm from '../../../components/forms/PlayerForm';

export function EditPlayer() {
  const [editItem, setEditItem] = useState({});
}

export default EditPlayer;
