import DataLoader from 'dataloader';
import { db } from './db';

const load = (tableName, ids) =>
  db
    .select('*')
    .from(tableName)
    .whereIn('id', ids)
    .then(rows => ids.map(id => rows.find(row => row.id === id)));

// eslint-disable-next-line import/prefer-default-export
export const loader = {
  location: new DataLoader(ids => load('location', ids)),
  address: new DataLoader(ids => load('address', ids)),
  position: new DataLoader(ids => load('position', ids)),
  user: new DataLoader(ids => load('l_user', ids))
};
