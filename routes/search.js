const express = require('express');
const router = express.Router();

const IP_array = [
  "127.0.0.1",
  "80.227.122.14"
];

// Define the /search route
router.get('/', (req, res) => {
    const clientIp = req.ip;

    var userIsAllowed = IP_array.indexOf(req.ip) !== -1;

  if (!userIsAllowed) {
    res.send('Successssss!');
    IP_array.push(clientIp);
  } else {
    res.send('Query parameter did not match.');
  }
});

module.exports = router;
