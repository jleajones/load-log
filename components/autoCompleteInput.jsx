import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Component = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

const Container = styled.ul`
  position: absolute;
  z-index: 999;
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
    padding: 0.6em;
    font-size: 0.9em;
    border-top: solid 1px #e2e2e2;

    &: hover {
      background: #f6f6f6;
    }
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75em;
  font-size: 0.9em;
`;

const Input = styled.input`
  width: 100%;
  border: solid 1px #ddd;
  padding: 4px 20px 4px 14px;
  line-height: 28px;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ::placeholder {
    color: #e2e2e2;
  }
`;

const InputContainer = styled.div`
  display: flex;
`;

const AutoCompleteInput = ({
  id,
  label,
  onChange,
  onClick,
  options,
  placeholder,
  name,
  defaultValue,
  children
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
      <InputContainer>
        <Input
          id={id}
          type="text"
          onChange={handleOnChange}
          value={value}
          placeholder={placeholder}
          name={name}
        />
        {children}
      </InputContainer>
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
  placeholder: 'Start typing...',
  children: null
};

AutoCompleteInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default AutoCompleteInput;
