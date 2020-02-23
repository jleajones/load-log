import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Component = styled.div`
  position: relative;
  max-width: 500px;
  min-width: 300px;
  width: 100%;
`;

const Container = styled.ul`
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  list-style: none;
  background: #eaeaea;
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.primary};
  border-top: none;
  margin: 0;
  padding: 0;

  > li {
    cursor: pointer;
    padding: 0.6rem;
    font-size: 0.9rem;
    border-top: solid 1px #e2e2e2;

    &: hover {
      background: #f6f6f6;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  border: solid 1px #ddd;
  padding: 0.6rem;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AutoCompleteInput = ({
  id,
  label,
  onChange,
  onClick,
  options,
  placeholder
}) => {
  const [value, setValue] = useState('');
  const [hideOptions, setHideOptions] = useState(false);
  const handleOnChange = e => {
    setHideOptions(false);
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const buildClickHandler = option => {
    return () => {
      setHideOptions(true);
      setValue(option.label);
      onClick(option);
    };
  };

  // TODO: account for blur event to hide options (blur might === click so its tricky)
  return (
    <Component>
      <Label htmlFor={id}>{label}:</Label>
      <Input
        id={id}
        name="address"
        type="text"
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
      />
      {!hideOptions && options.length > 0 && (
        <Container>
          {options.map(option => (
            <li
              key={option.id}
              onClick={buildClickHandler(option)}
              role="presentation"
            >
              {option.label}
            </li>
          ))}
        </Container>
      )}
    </Component>
  );
};

AutoCompleteInput.defaultProps = {
  placeholder: 'Start typing...'
};

AutoCompleteInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  placeholder: PropTypes.string
};

export default AutoCompleteInput;
