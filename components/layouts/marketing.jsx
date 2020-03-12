import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Layout = ({ children }) => <Container>{children}</Container>;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
