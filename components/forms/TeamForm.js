import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamsData';

const initialState = {
  teamName: '',
  teamCity: '',
  imageURL: '',
  public: true,
};

export default function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
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
    if (obj.teamKey) setFormInput(obj);
  }, [obj, user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.teamKey) {
      // eslint-disable-next-line no-undef
      updateTeam(formInput).then(() => {
        router.push('/teams');
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      // eslint-disable-next-line no-undef
      createTeam(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.teamKey ? 'Update' : 'Create'} Team</h2>
      <FloatingLabel
        controlId="floatingInput1"
        label="Team Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Team Name"
          name="teamName"
          value={formInput.teamName}
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
      <FloatingLabel controlId="floatingInput3" label="Team City" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Team City"
          name="teamCity"
          value={formInput.teamCity}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{obj.teamKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    teamName: PropTypes.string,
    imageURL: PropTypes.string,
    teamCity: PropTypes.string,
    teamKey: PropTypes.string,
    public: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
