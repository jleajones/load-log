const parseAddress = address => {
  const parsedAddress = {};
  Object.entries(address).forEach(entry => {
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

export {
  parsePlace
};
