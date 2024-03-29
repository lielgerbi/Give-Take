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
//getUsers
describe('Users Controller', () => {
    test('should get all users ', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/users/')
      .set('authorization', headers.authorization)
      .set('refreshtoken', headers.refreshtoken);
  
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
  });
//getUser- name, password
  describe('Users Controller', () => {
    test('should get user by userName and password with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/users/user')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .query({
            userName: 'user1',
            password: 'password1',
          });
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
       expect(response.body._id).toEqual('65aba8ec47f6e836fd579de6');
    });
  });
//createUser
  describe('Users Controller', () => {
    test('should get usres with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      let newUser={userName:'test32',password:'test',
      firstName:'test',lastName:'test',email:'test', isManager:true,photo:'test'
      }
      // Make a request to your route
      const response = await request(app).post('/users')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send({newUser});

      // Assert the response status and any other expectations
      expect(response.status).toBe(500);
    //   expect(response.body._id).toBeDefined();
    });
  });


//updateUser
describe('Users Controller', () => {
    test('should get usres with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
      // Make a request to your route
      const response = await request(app).post('/users/user')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send({userName:'test',password:'testupdate',
        firstName:'test',lastName:'test'
        });

      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
    });
  });

//getUser- name, password
describe('Users Controller', () => {
    test('should get user by userName and password with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      (jwt.verify as jest.Mock).mockReturnValue(mockUser)
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/users/user')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .query({
            userName: 'notGoodUser',
            password: 'password1',
          });
      // Assert the response status and any other expectations
      expect(response.status).toBe(404);
    });
  });

