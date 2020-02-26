import React from 'react';
import styled from 'styled-components';
import LoadInput from '../components/LoadInput';
import { LoadProvider } from '../components/LoadInput/context';
import Map from '../components/Map';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Title = styled.h1`
//   font-size: 2em;
//   margin: 1em 0;
//   color: ${({ theme }) => theme.colors.primary};
// `;

const Dashboard = () => {
  return (
    <Container>
      <LoadProvider>
        <>
          <LoadInput />
          <Map />
        </>
      </LoadProvider>
    </Container>
  );
};

export default Dashboard;
