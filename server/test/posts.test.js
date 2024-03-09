const setupApp = require('../app');
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

// Mock the jwt library
jest.mock('jsonwebtoken');
var app;
beforeAll(async()=>{
    app = await setupApp;
})

afterAll(async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed successfully');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  });
//getPosts
describe('Posts Controller', () => {
    test('should get posts with valid authentication', async () => {
        console.log(app);
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/posts/')
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken);
  
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
  });
///getPostByUser
  describe('Posts Controller', () => {
    test('should get post by user id with valid authentication', async () => {
        console.log(app);
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      // Make a request to your route
      const response = await request(app).get(`/posts/getPostByUser`)
        .send({ userName:'user1' })
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken);
        
  
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
      
    });
  });

//createPost
  describe('Users Controller', () => {
    test('should add post with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      let post={categoryName:'test',subCategory:'test',
      details:'test',isAvailable:true ,city:'test'
      }
      let userName = 'test'

      // Make a request to your route
      const response = await request(app).post('/posts')
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken)
        .send({userName,post});

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response._body._id).toBeDefined();
    });
  });

//delete

  describe('Users Controller', () => {
    test('should add post with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      let post={_id:'65eb61f102e74adac8ec1716',categoryName:'test',subCategory:'test',
      details:'test',isAvailable:true ,city:'test'
      }

      // Make a request to your route
      const response = await request(app).post('/posts/delete')
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken)
        .send({post});

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
    });
  });


//updatePost
describe('Users Controller', () => {
    test('should update post with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };

      // Make a request to your route
      const response = await request(app).post('/posts/update')
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken)
        .send({_id:'65eb61f102e74adac8ec1716',categoryName:'test1',subCategory:'test',
        details:'test',isAvailable:true ,city:'test'
        });

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
    });
  });



