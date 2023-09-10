import { getDb } from "../db/troop15.js";
import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql';
import { idType, nodeInterface } from "./graphql";
export const userType = new GraphQLObjectType({
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
const usersQueryArgs = {
    scout: { type: GraphQLBoolean },
    active: { type: GraphQLBoolean },
};
export const usersQuery = {
    type: new GraphQLList(userType),
    args: usersQueryArgs,
    resolve: async (source, args, context, info) => {
        console.log(`args: ${JSON.stringify(args)}`);
        const filter = {};
        if (args?.scout !== undefined) {
            // @ts-ignore
            filter['scout'] = args.scout;
        }
        if (args?.active !== undefined) {
            // @ts-ignore
            filter['active'] = args.active;
        }
        console.log(`using filter: ${JSON.stringify(filter)}`);
        return await getDb()
            .collection('users')
            .find(filter, { sort: { lastName: 1, firstName: 1, } })
            .toArray();
    }
};
