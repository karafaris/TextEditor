// Importing the 'path' module to work with file paths
const path = require('path');

// Exporting a function that defines a route handler using Express.js
module.exports = (app) =>
  // Defining a route for the root URL '/'
  app.get('/', (req, res) =>
    // Sending the 'index.html' file as a response using the 'res.sendFile' method
    // Joining the directory name with the path to the 'index.html' file to create the full file path
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
  );
