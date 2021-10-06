import React from 'react';
import { Link } from 'react-router-dom';
import { StyledErrorPage } from './StyledErrorPage';

const ErrorPage = () => {
  return (
    <StyledErrorPage>
      <h2 className="error-text">404 Not Found!</h2>
      <Link to="/">
        <span className="home">go home...</span>
      </Link>
    </StyledErrorPage>
  );
};

export default ErrorPage;
