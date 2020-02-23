import React, { useState } from 'react';

const AutoCompleteInput = ({ id, onChange, onClick, options }) => {
  const [value, setValue] = useState('');
  const [hideOptions, setHideOptions] = useState(false);
  const handleOnChange = e => {
    setValue(e.target.value);
    onChange(value);
  };

  const buildClickHandler = value => {
    return e => {
      setHideOptions(true);
      setValue(value.label);
      onClick(value);
    };
  };

  return (
    <>
      <input
        id={id}
        name="address"
        type="text"
        onChange={handleOnChange}
        value={value}
      />
      {!hideOptions && options.length > 0 && (
        <ul>
          {options.map(option => (
            <li key={option.id} onClick={buildClickHandler(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutoCompleteInput;
