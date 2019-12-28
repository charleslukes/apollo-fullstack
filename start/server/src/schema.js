const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch

    # Queries for the current user
    me: User
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch!]!
  }

  type Mutation {
    # if false booking trip failed, check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse

    # if false cancellation trip failed, check errors
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
