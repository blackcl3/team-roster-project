import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchPlayer({ players, setFilteredData }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(results);
  };

  return (
    <>
      <Form className="d-flex">
        <InputGroup>
          <Form.Control type="search" placeholder="Search Player" className="me-2" aria-label="Search" value={searchInput} onChange={handleChange} />
        </InputGroup>
      </Form>
    </>
  );
}

SearchPlayer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredData: PropTypes.func.isRequired,
};
