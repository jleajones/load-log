import { ApolloServer } from 'apollo-server-micro';
import { loader } from '../../apollo/dataLoader';
import { schema } from '../../apollo/schema';

const server = new ApolloServer({
  schema,
  context: (ctx) => ({
    ...ctx,
    loader
  })
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({
  path: `/api/graphql`
});
