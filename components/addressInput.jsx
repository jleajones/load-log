import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteInput from './autoCompleteInput';

import { parsePlace } from '../utils/helpers';

const AddressInput = ({ label, id }) => {
  const [address, setAddress] = useState('');
  const [places, setPlaces] = useState([]);

  const onError = error => {
    console.log('Error: ', error);
  };

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
    console.log(value);
    setAddress(value);
  };

  return (
    <div>
      <AutoCompleteInput
        label={label}
        onChange={onChange}
        onClick={onClick}
        options={places}
        id={id}
        placeholder="123 West Broad St, New York, NY 10017, United States"
      />
    </div>
  );
};

AddressInput.defaultProps = {
  label: 'address',
  id: 'address'
};

AddressInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string
};

export default AddressInput;
