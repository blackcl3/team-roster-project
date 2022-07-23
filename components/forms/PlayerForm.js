import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createPlayer } from '../../api/playersData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  position: '',
  imageURL: '',
};

function PlayerForm({ obj }) {
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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>
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
      <FloatingLabel controlId="floatingInput3" label="imageURL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Image URL"
          name="imageURL"
          value={formInput.imageURL}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="playerPosition" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
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
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
