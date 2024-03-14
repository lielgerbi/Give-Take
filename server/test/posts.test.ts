import request from 'supertest';
import setupApp from '../app';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Application } from 'express';

// Mock the jwt library
jest.mock('jsonwebtoken');
var app :Application;
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
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/posts/')
      .set('authorization', headers.authorization)
      .set('refreshtoken', headers.refreshtoken);
  
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
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      // Make a request to your route
      const response = await request(app).get(`/posts/getPostByUser`)
        .send({ userName:'user1' })
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken);
        
  
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
      
    });
  });

//createPost
  describe('Posts Controller', () => {
    test('should add post with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      let post={_id:'test',categoryName:'test',subCategory:'test',
      details:'test',isAvailable:true ,city:'test',userName:'test', photo:'test',comments:['test']
      }
      let userName = 'test'

      // Make a request to your route
      const response = await request(app).post('/posts')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send({userName,post});

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
    });
  });

//delete

  describe('Posts Controller', () => {
    test('should add post with valid authentication1', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      let post={_id:'65ee26f278fd949a485b5624',categoryName:'test',subCategory:'test',
      details:'test',isAvailable:true ,city:'test',userName:'test', photo:'test',comments:['test']
      }

      // Make a request to your route
      const response = await request(app).post('/posts/delete')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send({post});

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
    });
  });


//updatePost
describe('Posts Controller', () => {
    test('should update post with valid authentication2', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };

      // Make a request to your route
      const response = await request(app).post('/posts/update')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send({_id:'65ee26f278fd949a485b5624',categoryName:'test',subCategory:'test',
        details:'test',isAvailable:true ,city:'test',userName:'test', photo:'test',comments:['test']
        });

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
    });
  });

  

//getPostById
describe('Posts Controller', () => {
    test('should update post with valid authentication2', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };

      // Make a request to your route
      const response = await request(app).get('/posts/getPostID/65ee26f278fd949a485b5624')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken);

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
    });
  });

  //getPostById
describe('Posts Controller', () => {
    test('should update post with valid authentication2', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };

      // Make a request to your route
      const response = await request(app).get('/posts/getPostID/12345')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken);

      // Assert the response status and any other expectations
      expect(response.status).toBe(500);
    });
  });


