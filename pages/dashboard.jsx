import React from 'react';
import styled from 'styled-components';
import AddressInput from '../components/addressInput';

const Title = styled.h1`
  font-size: 2em;
  margin: 1em 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Dashboard = () => (
  <div>
    <Title>This is the Dashboard...</Title>
    <AddressInput label="Enter Address" />
    <p>Just check if something is under it...</p>
  </div>
);

export default Dashboard;
