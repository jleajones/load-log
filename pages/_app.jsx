import App from 'next/app';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
    primaryHover: '#0058C0',
    primaryDisabled: 'rgba(0, 112, 243, 0.6)'
  }
};

const Container = styled.main`
  font-size: 12px;
  font-family: 'Courier New';
  box-sizing: border-box;
  padding: 0 0 0 12px;
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
