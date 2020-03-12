import { db } from './db';

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    loads: (_parent, args /* , _context */) =>
      db
        .select('*')
        .from('load')
        .limit(Math.min(args.first, 50))
        .offset(args.skip),
    load: (_parent, args /* , _context */) =>
      db
        .select('*')
        .from('load')
        .where({ id: args.id })
        .first()
  },
  Load: {
    id: (load /* , _args, _context */) => load.id,
    user: (load, _args, { loader }) => loader.user.load(load.user_id),
    startLocation: (load, _args, { loader }) =>
      loader.location.load(load.start_location),
    stops: (load /* , _args, _context */) =>
      db
        .select('*')
        .from('location')
        .whereIn('id', load.stops.split(','))
  },
  Location: {
    id: (location /* , _args, _context */) => location.id,
    address: (location, _args, { loader }) =>
      loader.address.load(location.address_id),
    displayPosition: (location, _args, { loader }) =>
      loader.position(location.route_position_id),
    routePosition: (location, _args, { loader }) =>
      loader.position.load(location.route_position_id)
  },
  Address: {
    id: (address /* , _args, _context */) => address.id
  },
  Position: {
    id: (position /* , _args, _context */) => position.id
  },
  User: {
    id: (user /* , _args, _context */) => user.id
  }
};
