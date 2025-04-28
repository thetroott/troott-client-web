import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Title>Page not found</Title>
        <Description>
          Sorry, we couldn't find the page you're looking for.
        </Description>
        <HomeButton to="/">
          Back to home
        </HomeButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
`;

const Content = styled.div`
  text-align: center;
  max-width: 480px;
`;

const ErrorCode = styled.h1`
  color: #1d79ff; /* Updated to secondary color */
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #1d79ff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }
`;

export default NotFound;