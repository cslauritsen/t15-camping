import { getDb } from "./db/troop15.js";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInterfaceType, GraphQLID, GraphQLNonNull, GraphQLList, GraphQLBoolean } from 'graphql';
/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const idType = new GraphQLNonNull(GraphQLID);
const nodeInterface = new GraphQLInterfaceType({
    name: 'Node', fields: {
        id: {
            type: idType,
            description: "Globally unique identifier for all objects",
        }
    }
});
const userType = new GraphQLObjectType({
    name: 'User',
    interfaces: [nodeInterface],
    fields: {
        id: { type: idType, resolve: source => source._id },
        lastName: { type: GraphQLString },
        firstName: { type: GraphQLString },
        occupation: { type: GraphQLString },
        _class: { type: GraphQLString },
        patrol: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        scout: { type: GraphQLBoolean },
        annualFee: { type: GraphQLBoolean },
        troopNumber: { type: GraphQLString },
        avatar: { type: GraphQLString },
        workPhone: { type: GraphQLString },
        bornOn: { type: GraphQLString },
        cellPhone: { type: GraphQLString },
        currentPosition: { type: GraphQLString },
        currentRank: { type: GraphQLString },
        currentRankTracker: { type: GraphQLString },
        currentRankTrackerPercentComplete: { type: GraphQLString },
        deleted: { type: GraphQLBoolean },
        email: { type: GraphQLString },
        employer: { type: GraphQLString },
        gender: { type: GraphQLString },
        homePhone: { type: GraphQLString },
        maritalStatus: { type: GraphQLString },
        middleName: { type: GraphQLString },
    }
});
export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world2',
            },
            users: {
                type: new GraphQLList(userType),
                args: {
                    scout: { type: GraphQLBoolean }
                },
                resolve: async (source, args, context, info) => {
                    console.log(`args: ${JSON.stringify(args)}`);
                    const filter = {};
                    if (args?.scout !== undefined) {
                        // @ts-ignore
                        filter['scout'] = args.scout;
                    }
                    console.log(`using filter: ${JSON.stringify(filter)}`);
                    const users = await getDb()
                        .collection('users')
                        .find(filter)
                        .toArray();
                    return users
                        .sort((a, b) => a?.lastName?.localeCompare(b?.lastName) || a?.firstName?.localeCompare(b?.firstName));
                }
            },
        }
    })
});
;
