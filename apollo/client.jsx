import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
// TODO: only for ApolloClient - investigate swapping to axios
import fetch from 'isomorphic-unfetch';

let APOLLO_CLIENT = null;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined';
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!APOLLO_CLIENT) {
    APOLLO_CLIENT = createApolloClient(initialState);
  }

  return APOLLO_CLIENT;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
// eslint-disable-next-line import/prefer-default-export
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    );
    return (
      <ApolloProvider client={client}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  WithApollo.defaultProps = {
    apolloClient: null,
    apolloState: null
  };

  WithApollo.propTypes = {
    apolloClient:  PropTypes.shape(),
    apolloState:  PropTypes.shape()
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  // Allow Next.js to remove getInitialProps from the browser build
  if (typeof window === 'undefined') {
    if (ssr) {
      WithApollo.getInitialProps = async ctx => {
        const { AppTree } = ctx;

        let pageProps = {};
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        }

        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        const apolloClientAppTree = initApolloClient();

        try {
          // Run all GraphQL queries
          // eslint-disable-next-line global-require
          await require('@apollo/react-ssr').getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClientAppTree
              }}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();

        // Extract query data from the Apollo store
        const apolloState = apolloClientAppTree.cache.extract();

        return {
          ...pageProps,
          apolloState
        };
      };
    }
  }

  return WithApollo;
}
