const express = require('express');
const users = require('./routes/user');
const posts = require('./routes/post');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace the following connection string with your MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net/';

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB Atlas cluster
client.connect()
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Define routes or start your server here
    app.use('/users', users);
    app.use('/posts', posts);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
  client.on('error', err => {
    console.error('MongoDB Atlas connection error:', err);
  });
  
  client.on('close', () => {
    console.log('MongoDB Atlas connection closed');
  });
  
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const users = require('./routes/user');
// const posts = require('./routes/post');

// mongoose.connect(
//    "mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net/", 
//     {
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     }
// );

// var app = express();

// app.use(express.static('public'))
// app.use(cors());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(express.json());

// app.use('/users', users);
// app.use('/posts', posts);
// app.listen(process.env.PORT);