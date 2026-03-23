import dns from "node:dns";
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function configureMongoDns() {
  const servers = process.env.MONGO_DNS_SERVERS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  // Some local networks break Node SRV lookups for Atlas. Allow explicit resolvers when needed.
  if (servers?.length) {
    dns.setServers(servers);
  }
}

export default async function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  configureMongoDns();

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
