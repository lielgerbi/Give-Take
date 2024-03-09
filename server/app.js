const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('http');
const fs = require('fs');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const users = require('./routes/user');
const posts = require('./routes/post');
const file = require('./routes/file')
const categories = require('./routes/categories');
const cities = require('./routes/cities');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const path = require('path');

const app = express();

const options ={
  key: fs.readFileSync('./client-key.pem'),
  cert: fs.readFileSync('./client-cert.pem')
}
const server = https.createServer(options,app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:80',
  },
});
let connectedUsers = 0;

io.on('connection', (socket) => {
  console.log('a user connected');
  connectedUsers++;
  io.emit('signedIn', connectedUsers);

  socket.on('disconnect', (reason) => {
    connectedUsers--;
    io.emit('signedIn', connectedUsers);
    console.log('got to sign off');
  });
});

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const setupApp = new Promise((resolve, reject) => {
  var db = mongoose.connection;
  // mongoose.connect(`mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net`, {
  // })
      mongoose.connect(`mongodb://admin:bartar20%40CS@10.10.248.226:21771/`, {
})

  .then(() => {
    db = db.useDb('give&take')
    console.log("connect to mongo")
    app.use(cors({
      exposedHeaders: ['Authorization', 'refreshToken'],
      credentials: true,
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('public'))
    // Swagger UI setup
    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    app.use('/file', file)
    app.use('/users', users);
    app.use('/posts', posts);
    app.use('/categories', categories);
    app.use('/cities', cities);

    app.post('/refresh', (req, res) => {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
      }

      try {
        const decoded = jwt.verify(refreshToken, secretKey);
        const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

        res
          .header('Authorization', accessToken)
          .send(decoded.user);
      } catch (error) {
        return res.status(400).send('Invalid refresh token.');
      }
    });
    resolve(app);
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = setupApp;


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require("http");
// const mongoose = require('mongoose');
// const users = require('./routes/user');
// const posts = require('./routes/post');
// const categories = require("./routes/categories");
// const cities = require("./routes/cities")
// const socketIo = require("socket.io");
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpecs = require('./swagger');
// const { resolve } = require('path');
// const { rejects } = require('assert');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });
// let connectedUsers = 0;
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   connectedUsers++;
//   io.emit('signedIn', connectedUsers);

//   socket.on("disconnect", (reason) => {
//     connectedUsers--;
//     io.emit('signedIn', connectedUsers);
//     console.log('got to sign off');
//   });
// });
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// // mongoose.connect(`mongodb://admin:bartar20%40CS@10.10.248.226:21771/`, {
// // });
// mongoose.connect(`mongodb+srv://lielgerbi2000:135792468i@cluster0.b7saegs.mongodb.net`, {
// });
// const db=mongoose.connection.useDb('give&take')
// mongoose.connection.on('connected',()=>{
//   console.log("hi")
// });
// mongoose.connection.on('error',(err)=>{
//   console.error(err)
// });

// app.use(cors({
//   exposedHeaders: ["Authorization","refreshToken"],
//   credentials: true,
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(express.json());
// // Swagger UI setup
// // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// app.use('/users', users);
// app.use('/posts', posts);
// app.use('/categories' , categories);
// app.use('/cities' , cities);
// app.post('/refresh', (req, res) => {
//   const refreshToken = req.cookies['refreshToken'];
//   if (!refreshToken) {
//     return res.status(401).send('Access Denied. No refresh token provided.');
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, secretKey);
//     const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

//     res
//       .header('Authorization', accessToken)
//       .send(decoded.user);
//   } catch (error) {
//     return res.status(400).send('Invalid refresh token.');
//   }
// });

// // Start the Express server
// app.listen(443, () => {
//   console.log(`Server is running on http://localhost:${443}`);
// });

  //   mongoose.connect(`mongodb://admin:bartar20%40CS@10.10.248.226:21771/`, {
// });
