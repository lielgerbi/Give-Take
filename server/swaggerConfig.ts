import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Give And Take',
      version: '1.0.0',
      description: 'API documentation for your Node.js application',
    },
    servers: [
      {
        url: 'http://localhost:443', // Update with your server URL
      },
    ],
  },
  apis: ['./routes/*.ts'], // Update with the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;




// // swaggerConfig.js

// const swaggerJsdoc = require('swagger-jsdoc');
// const path = require('path');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Give And Take',
//       version: '1.0.0',
//       description: 'API documentation for your Node.js application',
//     },
//     servers: [
//       {
//         url: 'http://localhost:443', // Update with your server URL
//       },
//     ],
//   },
//   apis: ['./routes/*.ts'], // Update with the path to your route files
// };

// const swaggerSpec = swaggerJsdoc(options);

// module.exports = swaggerSpec;
