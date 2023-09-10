const express = require("express");

// routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /user.
const routes = express.Router();

// This will help us connect to the database
const dbo = require("../db/troop15");
const dbname = "troop15";

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
routes.route("/user").get(function (req, res) {
    let db_connect = dbo.getDb(dbname);
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
routes.route("/user/:id").get(function (req, res) {
    let db_connect = dbo.getDb(dbname);
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
routes.route("/user/add").post(function (req, response) {
    let db_connect = dbo.getDb(dbname);
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you update a record by id.
routes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb(dbname);
    const filter = { _id: ObjectId(req.params.id) };
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
        .updateOne(filter, update, options,function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});


// This section will help you update a record by id.
routes.route("/annualfee/:id").post(function (req, response) {
    let db_connect = dbo.getDb(dbname);
    let myquery = { ttid: req.params.id };
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
routes.route("/user/:id").delete((req, response) => {
    let db_connect = dbo.getDb(dbname);
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = routes;