import express from 'express';
import connectToMongo from './db_connection.js';

const router = express.Router();

// Route for searching lessons
router.get('/M00909858/search_lessons', async (req, res) => {
    try {
        const { client, database } = await connectToMongo();
        const lessonsCollection = database.collection('Lessons');
        const { query } = req.query;

        console.log('Search query:', query); // Log the query

        if (!query) {
            await client.close();
            return res.status(400).json({ error: 'Search query must be provided' });
        }

        const searchRegex = new RegExp(query, 'i');
        const searchQuery = {
            $or: [
                { title: { $regex: searchRegex } },
                { icon: { $regex: searchRegex } },
                { location: { $regex: searchRegex } }
            ]
        };

        console.log('Search MongoDB query:', JSON.stringify(searchQuery, null, 2));

        const lessons = await lessonsCollection.find(searchQuery).toArray();
        console.log('Search results:', lessons);

        await client.close();

        res.status(200).json(lessons);
    } catch (error) {
        console.error('Error searching lessons:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
