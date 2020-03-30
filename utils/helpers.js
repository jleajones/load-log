const parseAddress = address => {
  const parsedAddress = {};
  Object.entries(address).forEach(entry => {
    // eslint-disable-next-line prefer-destructuring
    parsedAddress[entry[0].replace(/^\w/, c => c.toLowerCase())] = entry[1];
  });

  return parsedAddress;
};

const parsePlace = place => {
  return {
    id: place.Location.LocationId,
    label: place.Location.Address.Label,
    address: parseAddress(place.Location.Address),
    displayPosition: [
      place.Location.DisplayPosition.Latitude,
      place.Location.DisplayPosition.Longitude
    ],
    routePosition: [
      place.Location.NavigationPosition[0].Latitude,
      place.Location.NavigationPosition[0].Longitude
    ]
  };
};

const transformLoadAddress = address => ({
  label: address.label,
  country: address.country,
  state: address.state,
  city: address.city,
  county: address.county,
  street: address.street,
  houseNumber: address.houseNumber,
  postalCode: address.postalCode,
  district: address.district
});

const transformLoadLocation = location => ({
  address: transformLoadAddress(location.address),
  displayPosition: {
    longitude: location.displayPosition[0],
    latitude: location.displayPosition[1]
  },
  routePosition: {
    longitude: location.routePosition[0],
    latitude: location.routePosition[1]
  },
  hereId: location.id
});

const transformLoadData = data => ({
  userId: 0,
  startLocation: transformLoadLocation(data.start[0]),
  stops: data.stops.map(stop => transformLoadLocation(stop))
});

export { parsePlace, transformLoadData };
