import React, { useEffect } from 'react';
import AddressInput from '../components/addressInput';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Dashoboard = () => {
  return (
    <div>
      <Title>This is the Dashboard...</Title>
      <AddressInput label='Start Location'/>
    </div>
  );
};

export default Dashoboard;
