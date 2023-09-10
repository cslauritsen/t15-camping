import express from 'express';
const userRoutes = express.Router();
import { getDb } from "../db/troop15.js";
// This section will help you get a list of all the records.
userRoutes.route("/api/users").get(async function (req, res) {
    let db_connect = getDb();
    const data = await db_connect
        .collection("users")
        .find({})
        .toArray();
    res.json(data);
});
// This section will help you get a single record by id
userRoutes.route("/api/user/:id").get((req, res) => {
    let db_connect = getDb();
    let myquery = { _id: req.params.id };
    db_connect
        .collection("users")
        // .findOne(myquery, function (err, result) {
        //     if (err) throw err;
        //     res.json(result);
        // });
        .findOne(myquery)
        .then(data => res.json(data));
});
// This section will help you create a new record.
userRoutes.route("/api/user/add").post(async function (req, response) {
    let db_connect = getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    await db_connect.collection("users").insertOne(myobj);
});
// This section will help you update a record by id.
userRoutes.route("/api/user/:id").post(async (req, response) => {
    const db = getDb();
    const filter = { _id: req.params.id };
    const options = { upsert: true, };
    const update = { $set: {}, };
    ['annualFee', 'active', 'deleted'].forEach(k => {
        if (req.body[k] !== undefined) {
            // @ts-ignore
            update.$set[k] = req.body[k] === "true";
        }
    });
    console.log(`Planned update: ${JSON.stringify(update)}`);
    const result = await db
        .collection("users")
        .updateOne(filter, update, options);
    if (result.matchedCount === 0) {
        console.log(`Update failed, document not found`);
        response.status(404).send();
    }
    else {
        console.log(`${result.modifiedCount} record(s) updated, returning document for ${req.params.id}`);
        db.collection("users").findOne({ _id: req.params.id }).then(doc => response.json(doc));
    }
});
// This section will help you delete a record
userRoutes.route("/api/user/:id").delete((req, response) => {
    const db = getDb();
    db
        .collection("users")
        .deleteOne({ _id: req.params.id })
        .then(result => {
        if (result.deletedCount === 1) {
            response.status(204).send();
        }
        else {
            response.status(404).send();
        }
    });
});
export default userRoutes;
