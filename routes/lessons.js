// Importing necessary modules
import express from 'express';
import connectToMongo from './db_connection.js';

const router = express.Router();

// Define the /M00909858/lessons route to fetch lessons data from MongoDB
router.get('/M00909858/lessons', async (req, res) => {
  try {
    // Connect to MongoDB
    const { client, database } = await connectToMongo();
    
    // Access the 'Lessons' collection in the database
    const lessonsCollection = database.collection('Lessons');
    
    // Fetch all lessons from the collection
    const lessons = await lessonsCollection.find({}).toArray();
    
    // Close the connection to MongoDB
    client.close();

    // Send the lessons data as the response
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch lessons from MongoDB' });
  }
});

export default router;
