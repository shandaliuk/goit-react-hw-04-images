import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Header,
  Form,
  SubmitButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SubmitButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SubmitButton>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
