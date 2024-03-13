import { Application } from 'express'; // Import Express namespace

import setupApp from './app';

setupApp.then((app: Application) => { // Change to Application
  // The setupApp promise resolves when the database connection is successfully established
  const server = app.listen(80, () => {
    console.log(`Server is running on http://localhost:${80}`);
  });
}).catch(error => {
  console.error('Error setting up the app:', error);
});


// const setupApp = require('./app');

// // Call the setupApp function to ensure the database connection
// setupApp.then((server) => {
//   // Start the server after the database connection is successfully established
//   server.listen(443, () => {
//     console.log(`Server is running on http://localhost:${443}`);
//   });
// });