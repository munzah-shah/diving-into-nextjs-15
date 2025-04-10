import "server-only";

import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error("MongoDB URI not found!");
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log("CONNECTED TO DATABASE ......");
    return client.db(dbName);
  } catch (error) {
    console.log("NOT CONNECTED!!", error);
  }
}

export async function getCollection(collectionName) {
  const db = await getDB("nextjs-blog-db");

  if (db) return db.collection(collectionName);

  return null;
}
