import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';

// eslint-disable-next-line import/prefer-default-export
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
