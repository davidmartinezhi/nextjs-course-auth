import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbDavid:8JAyZFG2KaJtvtTX@atlascluster.kjefvkf.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
