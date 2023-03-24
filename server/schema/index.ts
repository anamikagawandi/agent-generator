import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

export const schema: GraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello, world!";
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addMessage: {
        type: GraphQLString,
        args: {
          message: { type: GraphQLString },
        },
        resolve: (_root, args) => {
          return `Message added: ${args.message}`;
        },
      },
    },
  }),
});
