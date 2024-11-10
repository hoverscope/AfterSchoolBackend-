const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use('/image', express.static(path.resolve(__dirname, 'public/images')));

app.use(function(req,res) {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Hello");
})

const searchRouter = require('./routes/search');

app.use('/address', searchRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
