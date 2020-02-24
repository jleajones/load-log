import React from 'react';
import styled from 'styled-components';
// import AddressInput from '../components/addressInput';
import LoadInput from '../components/LoadInput';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Title = styled.h1`
//   font-size: 2em;
//   margin: 1em 0;
//   color: ${({ theme }) => theme.colors.primary};
// `;

const Map = styled.div`
  width: 75%;
  background: #ccc;
  height: 100vh
`;

const Dashboard = () => (
  <>
    <Container>
      <LoadInput />
      <Map>
        <div/>
      </Map>
    </Container>
  </>
);

export default Dashboard;
