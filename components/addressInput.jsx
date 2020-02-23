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
            console.log(JSON.stringify(possiblePlaces));
            setPlaces(possiblePlaces);
          }
        },
        error => {
          // TODO: for no internet
          const defaultPlaces = [
            {
              id: 'NT_.zXhRQ11iG78SyoG3qoHMB_0ID',
              label: "42 Rue Nor'Wes, Bonne-Esperance, QC G0G, Canada",
              address: {
                label: "42 Rue Nor'Wes, Bonne-Esperance, QC G0G, Canada",
                country: 'CAN',
                state: 'QC',
                county: 'Le Golfe-du-St-Laurent',
                city: 'Bonne-Espérance',
                street: "Rue Nor'Wes",
                houseNumber: '42',
                postalCode: 'G0G',
                additionalData: [
                  { value: 'Canada', key: 'CountryName' },
                  { value: 'Québec', key: 'StateName' },
                  { value: 'Le Golfe-du-St-Laurent', key: 'CountyName' }
                ]
              },
              displayPosition: [51.4246133, -57.8307947],
              routePosition: [51.4247401, -57.8308683]
            }
          ];
          console.log('Error: ', error);
          setPlaces(defaultPlaces);
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
