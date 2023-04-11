import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form className='d-flex ' onSubmit={submitHandler}>
      <Form.Control
        className='rounded me-2'
        type='search'
        placeholder='Search'
        aria-label='Search'
        onChange={(e) => setKeyword(e.target.value)}></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        className='mx-3 p-2 rounded'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
