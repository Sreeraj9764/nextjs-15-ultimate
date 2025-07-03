import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("No mongo db connected");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  } else {
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI, { dbName: "DevFlow" })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
