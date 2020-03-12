import React, { useState} from 'react';
import styled from 'styled-components';

import Layout from '../components/layouts/dashboard';
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
  const [data, setData ] = useState({});
  const handleSave = data => {
    setData(data);
    console.log('handleSave::', data);
  };

  return (
    <Layout>
      <Container>
        <LoadProvider>
          <LoadInput saveLoad={handleSave} />
          <Map />
        </LoadProvider>
        <pre>{JSON.stringify(data)}</pre>
      </Container>
    </Layout>
  );
};

export default Dashboard;
