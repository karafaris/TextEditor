// Importing the 'express' module to create a web server
const express = require('express');

// Creating an instance of the Express application
const app = express();

// Defining the port number to listen on, using either the environment variable 'PORT' or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Serving static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Enabling parsing of URL-encoded data and JSON data in request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring and using the defined HTML routes by passing the 'app' instance
require('./routes/htmlRoutes')(app);

// Starting the Express server and listening on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
