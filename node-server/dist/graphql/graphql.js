import { GraphQLBoolean, GraphQLID, GraphQLInterfaceType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { usersQuery } from "./user";
export const idType = new GraphQLNonNull(GraphQLID);
export const nodeInterface = new GraphQLInterfaceType({
    name: 'Node', fields: {
        id: {
            type: idType,
            description: "Globally unique identifier for all objects",
        }
    }
});
export const edgeType = new GraphQLObjectType({
    name: 'Edge',
    fields: {
        node: { type: nodeInterface },
        cursor: { type: GraphQLString },
    }
});
export const pageInfoType = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasNextPage: { type: GraphQLBoolean },
        hasPreviousPage: { type: GraphQLBoolean },
        startCursor: { type: GraphQLString },
        endCursor: { type: GraphQLString },
    }
});
export const connectionType = new GraphQLInterfaceType({
    name: 'Connection',
    fields: {
        edges: { type: new GraphQLList(edgeType) },
        pageInfo: { type: pageInfoType },
    },
});
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world',
        },
        users: usersQuery,
    },
});
export const schema = new GraphQLSchema({ query });
