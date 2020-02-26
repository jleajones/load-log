import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {};

export const LoadContext = createContext(initialState);

export const LoadProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <LoadContext.Provider
      value={{
        load: state,
        setLoad: setState
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};

LoadProvider.propTypes = {
  children: PropTypes.node.isRequired
};
