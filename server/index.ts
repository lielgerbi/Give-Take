import { Application } from 'express'; // Import Express namespace
import https from 'https';
import http from 'https';
import fs from 'fs';
import setupApp from './app';

setupApp.then((app: Application) => { // Change to Application
  // The setupApp promise resolves when the database connection is successfully established
  
   if(process.env.NODE_ENV=='prod'){
    console.log("app run in prod")
    const option = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    }
    https.createServer(option, app).listen(443, () => {
      console.log(`Server is running on https://193.106.55.226:443`);
    });
   }
   else{
    console.log("app run in dev")
    http.createServer(app).listen(443, () => {
      console.log(`Server is running on http://localhost:443`);
    });
   }
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