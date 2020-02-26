import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from './autoCompleteInput';

import { parsePlace } from '../utils/helpers';

const AddressInput = ({ label, id, name, onUpdate, defaultValue, children }) => {
  const [address, setAddress] = useState({ ...defaultValue });
  const [places, setPlaces] = useState([]);

  const onError = error => {
    console.log('Error: ', error);
  };

  useEffect(() => {
    setAddress({ ...defaultValue });
  }, [defaultValue.label]);

  const onSuccess = result => {
    if (result.Response.View[0] && result.Response.View[0].Result.length) {
      /* eslint implicit-arrow-linebreak: ["error", "below"] */
      const possiblePlaces = result.Response.View[0].Result.map(place =>
        parsePlace(place)
      );
      setPlaces(possiblePlaces);
    }
  };

  const onChange = searchText => {
    if (searchText && window.platform) {
      const { platform } = window;
      const geoCoder = platform.getGeocodingService();
      geoCoder.geocode({ searchText }, onSuccess, onError);
    }
  };

  const onClick = value => {
    setAddress(value);
    onUpdate(name, value);
  };

  return (
    <AutoCompleteInput
      label={label}
      onChange={onChange}
      onClick={onClick}
      options={places}
      id={id}
      name={name}
      placeholder="123 West Broad St, New York, NY 10017, United States"
      defaultValue={address.label}
    >
      {children}
    </AutoCompleteInput>
  );
};

AddressInput.defaultProps = {
  children: null
};

AddressInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node
};

export default AddressInput;
