const setupApp = require('./app');

// Call the setupApp function to ensure the database connection
setupApp.then((server) => {
  // Start the server after the database connection is successfully established
  server.listen(443, () => {
    console.log(`Server is running on http://localhost:${443}`);
  });
});