import express from "express";

// routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const userRoutes = express.Router();

// This will help us connect to the database
import {getDb} from "../db/troop15";


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
    userRoutes.route("/users").get(async function (req, res) {
        let db_connect = getDb();
        const data = await db_connect
            .collection("users")
            .find({})
            .toArray();
        res.json(data);
    });

// This section will help you get a single record by id
userRoutes.route("/user/:id").get((req, res) => {
    let db_connect = getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection("users")
        // .findOne(myquery, function (err, result) {
        //     if (err) throw err;
        //     res.json(result);
        // });
        .findOne(myquery)
        .then(data => res.json(data))
    ;
});

// This section will help you create a new record.
userRoutes.route("/user/add").post(async function (req, response) {
    let db_connect = getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    await db_connect.collection("users").insertOne(myobj);
    // db_connect.collection("users").insertOne(myobj, (err, res) => {
    //     if (err) throw err;
    //     response.json(res);
    // });
});

// This section will help you update a record by id.
userRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = getDb();
    const filter = {_id: ObjectId(req.params.id)};
    const update = {
        $set: {
            annual_fee: req?.body?.annual_fee ? true : false,
        },
    };
    const options = {
        upsert: true,
    };
    db_connect
        .collection("users")
        .updateOne(filter, update, options, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});


// This section will help you update a record by id.
userRoutes.route("/annualfee/:id").post(function (req, response) {
    let db_connect = getDb();
    let myquery = {ttid: req.params.id};
    let newvalues = {
        $set: {
            ttid: req.params.id,
            annualFee: req.body.annualFee || false,
        },
    };
    db_connect
        .collection("users")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
userRoutes.route("/user/:id").delete((req, response) => {
    let db_connect = getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

export default userRoutes;