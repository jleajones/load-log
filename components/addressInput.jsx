import React, { useState } from 'react';
import AutoCompleteInput from './autoCompleteInput';

import { parsePlace } from '../utils/helpers';

const AddressInput = ({ label = 'Address', id = 'address' }) => {
  const [address, setAddress] = useState('');
  const [places, setPlaces] = useState([]);

  const onChange = searchText => {
    if (searchText && window.platform) {
      const platform = window.platform;
      const geocoder = platform.getGeocodingService();

      geocoder.geocode(
        {
          searchText
        },
        result => {
          if (
            result.Response.View[0] &&
            result.Response.View[0].Result.length
          ) {
            const possiblePlaces = result.Response.View[0].Result.map(place =>
              parsePlace(place)
            );
            console.log('Possible places: ', possiblePlaces);
            setPlaces(possiblePlaces);
          }
        },
        error => {
          console.log('Error: ', error);
        }
      );
    }
  };

  const onClick = address => {
    console.log(address);
    setAddress(address);
  };

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <AutoCompleteInput
        onChange={onChange}
        onClick={onClick}
        options={places}
        id={id}
      />
    </div>
  );
};

export default AddressInput;
