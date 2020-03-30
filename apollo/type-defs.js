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
    county: String!
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
    hereId: ID!
  }

  type Load {
    id: ID!
    user: User!
    startLocation: Location!
    stops: [Location!]!
  }

  input AddressInput {
    label: String!
    country: String!
    state: String!
    city: String!
    county: String!
    street: String!
    houseNumber: String!
    postalCode: String!
    district: String
  }

  input PositionInput {
    longitude: Float!
    latitude: Float!
  }
  
  input LocationInput {
    address: AddressInput!
    displayPosition: PositionInput!
    routePosition: PositionInput!
    hereId: ID!
  }
  
  type Query {
    loads(first: Int = 25, skip: Int = 0): [Load!]!,
    load(id: ID!): Load
  }
  
  type Mutation {
    createUser(email: String!, password: String!): User!
    createLoad(startLocation: LocationInput!, stops: [LocationInput!]!, userId: ID!): Load!
  }
`;
