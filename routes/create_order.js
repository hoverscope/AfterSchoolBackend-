import express from 'express';
import connectToMongo from './db_connection.js';

const router = express.Router();
router.post('/M00909858/orders', async (req, res) => {
    try {
      console.log('Request body:', req.body);  // Log the body
  
      const { name, phone, items, totalAmount, date } = req.body;
  
      if (!name || !phone || !items || !totalAmount || !date) {
        return res.status(400).json({ error: 'All fields must be provided' });
      }
  
      const { client, database } = await connectToMongo();
      const ordersCollection = database.collection('Orders');
  
      const orderData = { name, phone, items, totalAmount, date };
      await ordersCollection.insertOne(orderData);
  
      client.close();
  
      res.status(201).json({ message: 'Order placed successfully', order: orderData });
    } catch (error) {
      console.error('Error placing order in MongoDB:', error);
      res.status(500).json({ error: 'Failed to place order in MongoDB' });
    }
  });
  

export default router;
