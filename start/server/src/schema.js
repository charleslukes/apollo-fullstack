const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launches(
      # replace the current launches query with this one.
      """
      The number of result to show must be >= 1 by default = 20
      """
      pageSize: Int

      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
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
    missionPatch(mission: String, size: PatchSize): String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch!]!
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type LaunchConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  type Mutation {
    # if false booking trip failed, check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false cancellation trip failed, check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String #login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
