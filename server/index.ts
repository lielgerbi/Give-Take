import { Application } from 'express'; // Import Express namespace
import https from 'https';
import fs from 'fs';
import setupApp from './app';

setupApp.then((app: Application) => { // Change to Application
  // The setupApp promise resolves when the database connection is successfully established
  
  // if(process.env.NODE_ENV== 'prod'){
    const option = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    }
    console.log(option.key)
    https.createServer(option, app).listen(443, () => {
      console.log(`Server is running on https://localhost:${443}`);
    });
  // }
  
  // const server = app.listen(443, () => {
  //   console.log(`Server is running on https://localhost:${443}`);
  // });
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