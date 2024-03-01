const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");
const mongoose = require('mongoose');
const users = require('./routes/user');
const posts = require('./routes/post');
const categories = require("./routes/categories");
const cities = require("./routes/cities")
const socketIo = require("socket.io");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let connectedUsers = 0;
io.on("connection", (socket) => {
  console.log("a user connected");
  connectedUsers++;
  io.emit('signedIn', connectedUsers);
  // socket.on("signIn", () => {
  //   // do shit
  //   console.log('got to sign in');
  //   io.emit('signedIn', connectedUsers);
  // });

  socket.on("disconnect", (reason) => {
    connectedUsers--;
    io.emit('signedIn', connectedUsers);
    console.log('got to sign off');
  });
});
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
mongoose.connect(`mongodb://admin:bartar20%40CS@10.10.248.226:21771/`, {
});
// mongoose.connect(`mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net`, {
// });
const db=mongoose.connection.useDb('give&take')
mongoose.connection.on('connected',()=>{
  console.log("hi")
});
mongoose.connection.on('error',(err)=>{
  console.error(err)
});

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
// Swagger UI setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/users', users);
app.use('/posts', posts);
app.use('/categories' , categories)
app.use('/cities' , cities)
// Start the Express server
app.listen(443, () => {
  console.log(`Server is running on http://localhost:${443}`);
});




// const express = require('express');
// const mongoose = require('mongoose');
// //const app = express();
// mongoose.connect(`mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net`, {
// });
// const db=mongoose.connection.useDb('give&take')
// mongoose.connection.on('connected',()=>{
//   console.log("hi")
// });
// mongoose.connection.on('error',(err)=>{
//   console.error(err)
// });
// const userSchema= new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   userName:String,
//   password:String,
//   firstName:String,
//   lastName:String,
//   birthDate:String,
//   phoneNumber:String,
//   isManager:Boolean
// })

// const UserModel = db.model("Users", userSchema)
// app.get("/getUsers", (req, res) => {
//   UserModel.find({})
//     .then(function(users) {
//       if (users) {
//         res.json(users);
//         console.log(users);
//       } else {
//         res.status(404).send('No users found');
//       }
//     })
//     .catch(function(err) {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     });
// });

// // Start the Express server
// app.listen(3001, () => {
//   console.log(`Server is running on http://localhost:${3001}`);
// });









// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = 3000;

// // MongoDB connection setup
// const mongoURI = 'mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net/';
// const dbName = encodeURIComponent('giveTake/?authSource=admin'); // Specify the database name

// mongoose.connect(`${mongoURI}/${dbName}`, {
// });

// const db = mongoose.connection;



// db.once('open', () => {
//   console.log('Connected to MongoDB');
  
// });


// // Define a Mongoose model for the "users" collection
// const User = mongoose.model('User', {
//   // Define your user schema here
//   // For example:
  
//   // Add more fields as needed
// });

// // Express route to get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require('express');
// // const users = require('./routes/user');
// const posts = require('./routes/post');
// const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');
// const category = require('./models/category');
// // var mongoose = require('./mongoconnection');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Replace the following connection string with your MongoDB Atlas connection string
// const mongoURI = 'mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net/';
// const dbName = 'give&take'; 
// //const client = new MongoClient(`${mongoURI}/${dbName}`, {});
// MongoClient.connect(`${mongoURI}/${dbName}`, { }, (error, client) => {
//   if (error) {
//     return console.log("Connection failed for some reason");
//   }
//   console.log("Connection established - All well");
//   const db = client.db(give&take);
//    // Access the "users" collection
//   const usersCollection = db.collection('Users');

//   // Find all documents in the "users" collection
//   usersCollection.find({}).toArray((err, users) => {
//     if (err) {
//       console.error("Error retrieving users:", err);
//     } else {
//       console.log("All users:", users);
//     }

//         app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//     // Close the MongoDB connection
//     client.close();
// });

// // Connect to the MongoDB Atlas cluster
// client.connect()
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//     console.log(`${mongoURI}/${dbName}`)

//     // Define routes or start your server here
//     // app.use('/users', users);
//     app.use('/posts', posts);
//     app.use('/categories' , category);
//     // Define a Mongoose model for the "users" collection
// const Users = mongoose.model('Users', {
//   // Define your user schema here
//   // For example:
//   name: String,
//   email: String,
//   // Add more fields as needed
// });

// // Express route to get all users
// app.get('/', async (req, res) => {
//   try {
//     const users = await Users.find({}).explain('executionStats');
//     console.log(users);
//     res.json(users);
//   } catch (error) {
//     console.error('Error retrieving users:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
//   client.on('error', err => {
//     console.error('MongoDB Atlas connection error:', err);
//   });
  
//   client.on('close', () => {
//     console.log('MongoDB Atlas connection closed');
//   });
  
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