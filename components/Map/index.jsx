import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoadContext } from '../LoadInput/context';

const Container = styled.div`
  width: 75%;
  background: #ccc;
  height: 100vh;
`;

const Map = () => {
  const { load } = useContext(LoadContext);
  console.log('Map:loads::', load);
  return (
    <Container>
      <div />
    </Container>
  );
};

export default Map;
