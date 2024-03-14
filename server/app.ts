import express , { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import users from './routes/user';
import posts from './routes/post';
import file from './routes/file';
import categories from './routes/categories';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();


const setupApp = new Promise<Application>((resolve, reject) => { // Change here
  let db: mongoose.Connection;

  mongoose
    .connect('mongodb://admin:bartar20%40CS@10.10.248.226:21771/', {})
    .then(() => {
      db = mongoose.connection.useDb('give&take');
      console.log('connect to mongo');
      app.use(cors());
      app.use(cors({
        origin: ['http://193.106.55.226', 'http://10.10.248.226'],
        exposedHeaders: ['authorization', 'refreshToken'],
        credentials: true,
    }));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(express.json());
      app.use(express.static('public'));
      app.use(express.static(path.join(__dirname, 'build')));
      app.use(express.static(__dirname, { dotfiles: 'allow' } ));
      app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', "upgrade-insecure-requests");
        next();
      });
      // Swagger UI setup
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
      app.use('/file', file);
      app.use('/users', users);
      app.use('/posts', posts);
      app.use('/categories', categories);
      
      // Serve Swagger UI
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
      resolve(app); // Pass the app object to resolve
    })
    .catch((err) => {
      console.log(err);
    });
});

export default setupApp;