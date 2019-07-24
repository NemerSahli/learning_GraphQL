const graphql = require('graphql');

const { GrapphQLObjectType, GraphQLString } = graphql;

const UserType = new GrapphQLObjectType({
  name: 'UserType',
  fields: {
    email: { type: GraphQLString }
  }
});

module.exports = UserType;
