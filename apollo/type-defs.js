import { gql } from 'apollo-server-micro';

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    email: String!
  }

  type Address {
    id: ID!
    label: String!
    country: String!
    state: String!
    city: String!
    street: String!
    houseNumber: String!
    postalCode: String!
    district: String
  }

  type Position {
    id: ID!
    longitude: Float!
    latitude: Float!
  }

  type Location {
    id: ID!
    address: Address!
    displayPosition: Position!
    routePosition: Position!
  }

  type Load {
    id: ID!
    user: User
    startLocation: Location!
    stops: [Location!]!
  }
  
  type Query {
    loads(first: Int = 25, skip: Int = 0): [Load!]!,
    load(id: ID!): Load
  }
`;
