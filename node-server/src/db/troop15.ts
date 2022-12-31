import {Callback, Db, MongoClient} from "mongodb";

const dbUrl = process.env.ATLAS_URI ?? '';
const client = new MongoClient(dbUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

let _db: Db;

export function connectToServer(callback: Callback<MongoClient>) {
    client.connect((err, db) => {
        // Verify we got a good "db" object
        if (db) {
            _db = db.db("troop15");
            console.log("Successfully connected to MongoDB.");
        }
        return callback(err);
    });
}

export function getDb() {
    return _db;
}