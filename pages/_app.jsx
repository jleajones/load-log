import App from 'next/app';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3'
  }
};

const Container = styled.main`
  font-size: 12px;
  font-family: 'Courier New';
  * {
    font-family: 'Courier New';
    box-sizing: border-box;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
}
