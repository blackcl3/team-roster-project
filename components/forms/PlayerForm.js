import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../../api/playersData';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamsData';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // eslint-disable-next-line no-undef
      updatePlayer(formInput)
        .then(() => { router.push('/'); });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => { router.push('/'); });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5 playerFormh2">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Player Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Player Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Image URL"
          name="imageURL"
          value={formInput.imageURL}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Player Position" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="teamfirebaseKey"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Team</option>
          {
            // eslint-disable-next-line no-unused-vars
            teams.map((team) => (
              <option
                key={team.teamKey}
                value={team.teamKey}
                selected={obj.teamfirebaseKey === team.teamKey}
              >
                {team.teamCity} {team.teamName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    imageURL: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamfirebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
