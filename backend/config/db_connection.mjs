import { MongoClient } from 'mongodb';
import 'dotenv/config'

const client = new MongoClient(process.env["ATLAS_URI"]);
const defaultDB = process.env["ATLAS_DEFAULT_DB"] || "myFirstDatabase";

export const connection = async() => {
    try {
        await client.connect();
        return client.db(defaultDB);
    } catch (e) {
      console.error(e);
    }
}