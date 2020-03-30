import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import styled from 'styled-components';

import { withApollo } from '../apollo/withApollo';
import Layout from '../components/layouts/dashboard';
import LoadInput from '../components/LoadInput';
import { LoadProvider } from '../components/LoadInput/context';
import Map from '../components/Map';
import { transformLoadData } from '../utils/helpers';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Title = styled.h1`
//   font-size: 2em;
//   margin: 1em 0;
//   color: ${({ theme }) => theme.colors.primary};
// `;

const LoadMutation = gql`
  mutation CreateLoad(
    $startLocation: LocationInput!
    $stops: [LocationInput!]!
    $userId: ID!
  ) {
    createLoad(startLocation: $startLocation, stops: $stops, userId: $userId) {
      id
    }
  }
`;

const Dashboard = () => {
  const [createLoad, { loadData }] = useMutation(LoadMutation);
  const handleSave = async data => {
    const variables = transformLoadData(data);
    await createLoad({
      variables
    });
    console.log('savedData: ', loadData);
  };

  return (
    <Layout>
      <Container>
        <LoadProvider>
          <LoadInput saveLoad={handleSave} />
          <Map />
        </LoadProvider>
      </Container>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
