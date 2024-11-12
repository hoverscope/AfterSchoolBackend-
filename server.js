  import express from 'express';
  import cors from 'cors';



  const app = express();
  app.use(express.json());  // Add this line to parse JSON bodies



  // Use CORS middleware globally
  app.use(cors());

  app.use(express.static('public'));


  // Import routes
  import lessonsRouter from './routes/lessons.js';
  import create_order from './routes/create_order.js';
  import update_inventory from './routes/update_inventory.js';



  // Logger middleware to log details of each request
  function requestLogger(req, res, next) {
    const currentDateTime = new Date();
    console.log(`[${currentDateTime.toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  }

  // Apply the request logger middleware globally
  app.use(requestLogger);

  // Use routes with a specific prefix
  app.use(lessonsRouter);
  app.use(create_order);
  app.use(update_inventory);


  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
