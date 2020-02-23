import React, { useEffect, useState } from 'react';

const AddressInput = ({ label = 'Address', id = 'address' }) => {
  const [address, setAddress] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (address && window.platform) {
        const platform = window.platform;
      const geocoder = platform.getGeocodingService();

      geocoder.geocode(
        {
          searchText: address
        },
        result => {
          if (
            result.Response.View[0] &&
            result.Response.View[0].Result.length
          ) {
            const possiblePlaces = result.Response.View[0].Result.map(place => {
              return {
                ...place.Location
              };
            });
            console.log('Possible places: ', possiblePlaces);
            setPlaces(possiblePlaces);
          }
        },
        error => {
          console.log('Error: ', error);
        }
      );
    } else {
      setPlaces([]);
    }
  }, [address]);

  const handleOnchange = e => {
    setAddress(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        name="address"
        type="text"
        onChange={handleOnchange}
        autoComplete="new-password"
      />
      {places.length > 0 && (
        <ul>
          {places.map(place => (
            <li key={place.LocationId}>{place.Address.Label}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
