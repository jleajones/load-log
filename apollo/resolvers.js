import { db } from './db';

const getLoads = async ({ first, skip }) =>
  db
    .select('*')
    .from('load')
    .limit(Math.min(first, 50))
    .offset(skip);

const getLoadById = async ({ id }) =>
  db
    .select('*')
    .from('load')
    .where({ id })
    .first();

const getLocationByHereId = async ({ hereId }) =>
  db
    .select('id')
    .from('location')
    .where({ here_id: hereId })
    .first();

const addPosition = async ({ longitude, latitude, type }) =>
  db('position')
    .insert({
      longitude,
      latitude,
      type
    })
    .returning(['id']);

const addAddress = async ({
  houseNumber,
  postalCode,
  district,
  street,
  city,
  county,
  state,
  country,
  label
}) =>
  db('address')
    .insert({
      house_number: houseNumber,
      postal_code: postalCode,
      district,
      street,
      city,
      county,
      state,
      country,
      label
    })
    .returning(['id']);

const addLocation = async location => {
  const newDisplayPosition = await addPosition({
    longitude: location.displayPosition.longitude,
    latitude: location.displayPosition.latitude,
    type: 'display'
  });

  const newRoutePosition = await addPosition({
    longitude: location.routePosition.longitude,
    latitude: location.routePosition.latitude,
    type: 'route'
  });

  const newAddress = await addAddress({
    houseNumber: location.address.houseNumber,
    postalCode: location.address.postalCode,
    district: location.address.district,
    street: location.address.street,
    city: location.address.city,
    county: location.address.county,
    state: location.address.state,
    country: location.address.country,
    label: location.address.label
  });

  return db('location')
    .insert({
      label: location.address.label,
      address_id: newAddress[0].id,
      display_position_id: newDisplayPosition[0].id,
      route_position_id: newRoutePosition[0].id,
      here_id: location.hereId
    })
    .returning(['id']);
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    loads: (_parent, { first, skip } /* , _context */) =>
      getLoads({ first, skip }),
    load: (_parent, { id } /* , _context */) => getLoadById({ id })
  },
  Load: {
    id: (load /* , _args, _context */) => load.id,
    user: (load, _args, { loader }) => loader.user.load(load.user_id),
    startLocation: (load, _args, { loader }) =>
      loader.location.load(load.start_location),
    stops: (load, _args, { loader }) => {
      return load.stops.split(',').map(stop => {
        const stopId = parseInt(stop, 10);
        return loader.location.load(stopId);
      });
    }
  },
  Location: {
    id: (location /* , _args, _context */) => location.id,
    hereId: (location /* , _args, _context */) => location.here_id,
    address: (location, _args, { loader }) =>
      loader.address.load(location.address_id),
    displayPosition: (location, _args, { loader }) =>
      loader.position.load(location.display_position_id),
    routePosition: (location, _args, { loader }) =>
      loader.position.load(location.route_position_id)
  },
  Address: {
    id: (address /* , _args, _context */) => address.id,
    houseNumber: (address /* , _args, _context */) => address.house_number,
    postalCode: (address /* , _args, _context */) => address.postal_code
  },
  Position: {
    id: (position /* , _args, _context */) => position.id
  },
  User: {
    id: (user /* , _args, _context */) => user.id
  },
  Mutation: {
    createUser: async (_parent, { email, password } /* , _context */) => {
      try {
        const newUser = await db('l_user')
          .insert({
            email,
            password
          })
          .returning(['id', 'email', 'password']);

        return newUser[0];
      } catch (e) {
        return e;
      }
    },
    createLoad: async (
      _parent,
      { startLocation, stops, userId } /* , _context */
    ) => {

      /*
       * GET/CREATE START LOCATION
       */
      let finalStart;
      try {
        finalStart = await getLocationByHereId({
          hereId: startLocation.hereId
        });

        if (!finalStart) {
          try {
            const newLocation = await addLocation(startLocation);
            if (newLocation.length) {
              [finalStart] = newLocation;
            }
          } catch (e) {
            console.log('error: ', e);
          }
        }
      } catch (e) {
        console.log('error: ', e);
      }

      /*
       * GET/CREATE ALL STOP LOCATIONS
       */
      return Promise.all(
        stops.map(async location => {
          let finalStop;
          try {
            finalStop = await getLocationByHereId({
              hereId: location.hereId
            });

            if (!finalStop) {
              try {
                const newLocation = await addLocation(location);
                if (newLocation.length) {
                  [finalStop] = newLocation;
                }
              } catch (e) {
                console.log('error: ', e);
              }
            }
          } catch (e) {
            console.log('error: ', e);
          }
          return finalStop;
        })
      ).then(async data => {
        const newLoad = await db('load')
          .insert({
            user_id: userId,
            start_location: finalStart.id,
            stops: data.map(stop => stop.id).join(', ')
          })
          .returning(['id', 'user_id', 'start_location', 'stops']);
        return newLoad[0];
      });
    }
  }
};
