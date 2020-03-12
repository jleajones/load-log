import React, { useReducer, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import AddressInput from '../addressInput';
import { initialState, reducer } from './reducer';
import { STOPS_MIN_LENGTH, TYPES } from './constants';
import { LoadContext } from './context';

const Container = styled.form`
  min-width: 300px;
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 0 12px 60px 0;
`;

const Button = styled.button`
  padding: 4px 8px;
  font-size: 1.2em;
  background: ${({ theme, outline }) =>
    outline ? '#fff' : theme.colors.primary};
  border: solid 1px ${({ theme }) => theme.colors.primary};
  color: ${({ theme, outline }) => (outline ? theme.colors.primary : '#fff')};
  fill: ${({ theme, outline }) => (outline ? theme.colors.primary : '#fff')};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  svg {
    position: relative;
    top: 2px;
  }

  :focus {
    outline: none;
  }

  :hover {
    background: ${({ theme, outline }) =>
      outline ? theme.colors.primaryHover : theme.colors.primaryHover};
    border: solid 1px ${({ theme }) => theme.colors.primaryHover};
    color: #fff;
    fill: #fff;
  }

  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoadInput = ({ saveLoad }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoadComplete, setIsLoadComplete] = useState(false);

  const { setLoad } = useContext(LoadContext);

  const onUpdate = (name, value) => {
    dispatch({ type: name, payload: value });
  };

  const onAdd = () => {
    dispatch({ type: TYPES.ADD });
  };

  const onRemove = index => {
    dispatch({ type: TYPES.REMOVE, payload: index });
  };

  const onMap = () => {
    setLoad(state);
  };

  const onSave = () => {
    saveLoad(state);
  };

  const hasAllStops = stops => {
    return stops.every(stop => stop.label);
  };

  useEffect(() => {
    if (state.start[0].label && hasAllStops(state.stops)) {
      setIsLoadComplete(true);
    } else {
      setIsLoadComplete(false);
    }
  }, [state]);

  return (
    <Container autoComplete="off">
      <h3>Enter Load:</h3>
      <AddressInput
        label="Departing From"
        id="start"
        name="start"
        onUpdate={onUpdate}
        defaultValue={state.start[0]}
      />
      {state.stops.map((stop, idx) => {
        // TODO: break out to new component
        const key = `stop-${idx}`;
        const onClick = () => {
          onRemove(idx);
        };
        return (
          <AddressInput
            label={`Stop #${idx + 1}`}
            id={`stop-${idx}`}
            name={`stop-${idx}`}
            onUpdate={onUpdate}
            defaultValue={stop}
            key={key}
          >
            {idx >= STOPS_MIN_LENGTH && (
              <div>
                <Button type="button" onClick={onClick}>
                  <ReactSVG src="/remove_circle_outline.svg" />
                </Button>
              </div>
            )}
          </AddressInput>
        );
      })}
      <ButtonContainer>
        <Button type="button" outline onClick={onAdd}>
          Add Stop
        </Button>
        <Button type="button" onClick={onMap} disabled={!isLoadComplete}>
          Map Load
        </Button>
        <Button type="button" onClick={onSave} disabled={!isLoadComplete}>
          Save Load
        </Button>
      </ButtonContainer>
    </Container>
  );
};

LoadInput.propTypes = {
  saveLoad: PropTypes.func.isRequired
};

export default LoadInput;
