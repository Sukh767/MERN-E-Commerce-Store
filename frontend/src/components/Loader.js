import React from 'react';
import { Spinner } from 'react-bootstrap';

const loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default loader;
