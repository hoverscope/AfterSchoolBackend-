// In update_inventory.js (or any other appropriate file name)
import express from 'express';
import connectToMongo from './db_connection.js';

const router = express.Router();

// Route to update availableInventory in Lessons collection
router.put('/M00909858/update_inventory', async (req, res) => {
  try {
    const { id, availableInventory } = req.body;

    // Validate that both id and availableInventory are provided
    if (id === undefined || availableInventory === undefined) {
      return res.status(400).json({ error: 'Both id and availableInventory must be provided' });
    }

    // Connect to MongoDB
    const { client, database } = await connectToMongo();
    const lessonsCollection = database.collection('Lessons');

    // Update the document with the specified id
    const result = await lessonsCollection.updateOne(
      { id: id }, // Filter by the lesson's id field
      { $set: { availableInventory: availableInventory } } // Update availableInventory
    );

    client.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found or no changes made' });
    }

    res.status(200).json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.error('Error updating inventory in MongoDB:', error);
    res.status(500).json({ error: 'Failed to update inventory in MongoDB' });
  }
});

export default router;
