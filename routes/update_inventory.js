import express from 'express';
import connectToMongo from './db_connection.js';

const router = express.Router();

// Route to update availableInventory in Lessons collection
router.put('/M00909858/update_inventory/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the id from the URL
    const { availableInventory } = req.body; 
    const numericId = parseInt(id, 10); 

    console.log(`ID from URL: ${id}`); // Log the id received from the URL

    // Validate that availableInventory is provided
    if (availableInventory === undefined) {
      return res.status(400).json({ error: 'availableInventory must be provided' });
    }

    // Connect to MongoDB
    const { client, database } = await connectToMongo();
    const lessonsCollection = database.collection('Lessons');

    // Check if the document exists before updating
    const lesson = await lessonsCollection.findOne({ id: numericId });
    console.log('Lesson found:', lesson); // Log the lesson document found by id

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    
    // Update the document with the specified id
    const result = await lessonsCollection.updateOne(

      { id: numericId  }, // Filter by the lesson's id parameter
      { $set: { availableInventory: availableInventory } } // Update availableInventory
    );

    client.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'No changes made to the lesson' });
    }

    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.error('Error updating inventory in MongoDB:', error);
    res.status(500).json({ error: 'Failed to update inventory in MongoDB' });
  }
});

export default router;
