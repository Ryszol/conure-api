import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
import { resolver } from "graphql-sequelize";
import mutations from "./mutations";
import types, { User as UserType } from "./typeDef";
import models from "..";
import { User } from "../models";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    fields: {
      posts: {
        args: {
          id: {
            type: GraphQLInt
          }
        },
        type: new GraphQLList(types.Post),
        resolve: resolver(models.Posts)
      },
      users: {
        args: {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          }
        },
        type: new GraphQLList(types.User),
        resolve: resolver(models.Users, {
          before: (findOptions, args, context) => {
            findOptions.attributes.pop()
            return findOptions
          }
        })
      },
      categories: {
        args: {
          id: {
            type: GraphQLInt
          }
        },
        type: new GraphQLList(types.Category),
        resolve: resolver(models.Categories)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...mutations
    }
  })
});

export default schema;
