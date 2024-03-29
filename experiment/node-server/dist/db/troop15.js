import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
const dbUrl = process.env.ATLAS_URI ?? '';
console.log(`Connecting mongodb URL: ${dbUrl}`);
const client = new MongoClient(dbUrl, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
});
let _db;
export function connectToServer(callback) {
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
