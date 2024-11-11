// Importing MongoClient from the 'mongodb' module
import { MongoClient } from 'mongodb';

// Importing the credentials object from the 'credentials.js' file
import credentials from './credentials.js'; 

// MongoDB Atlas server details
const server = "cluster0.gmcxdme.mongodb.net";
const dbName = 'CST3144';

// Encoding the username and password for use in the connection string
const encodedUsername = encodeURIComponent(credentials.userName);
const encodedPassword = encodeURIComponent(credentials.password);

// Constructing the connection string with the encoded username and password
const connectionString = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;

// Async function to connect to the MongoDB Atlas database
async function connectToMongo() {
  try {
    // Connecting to MongoDB Atlas using the connection string
    const client = new MongoClient(connectionString);

    // Await the connection promise
    await client.connect();

    // Accessing the database from the connected client
    const database = client.db(dbName);

    // Returning the connected client and the database
    return { client, database };
  } catch (error) {
    // Handling errors and logging an error message
    console.error('Error connecting to MongoDB Atlas:', error);
    
    // Throwing the error for handling in the calling function
    throw error;
  }
}

// Exporting the connectToMongo function for use in other parts of the application
export default connectToMongo;
