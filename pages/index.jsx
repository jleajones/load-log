import React from 'react';
import gql from 'graphql-tag';
import Link from 'next/link';

import { useQuery } from '@apollo/react-hooks';
// import styled from 'styled-components';
import { withApollo } from '../apollo/withApollo';
import Layout from '../components/layouts/marketing';

const LoadQuery = gql`
  query LoadQuery {
    loads {
      id
      user {
        email
      }
      startLocation {
        address {
          label
        }
      }
      stops {
        address {
          label
        }
      }
    }
  }
`;

const Index = () => {
  const { data } = useQuery(LoadQuery);

  return (
    <Layout>
      <h1>MAKE a big change!</h1>
      <ul>
        <li>
          <Link href="/sign-up">
            <a href="/sign-up">Sign Up</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a href="/dashboard">Dashboard</a>
          </Link>
        </li>
      </ul>

      {data && data.loads && <pre>{JSON.stringify(data)}</pre>}
    </Layout>
  );
};

export default withApollo({ssr: true})(Index);
