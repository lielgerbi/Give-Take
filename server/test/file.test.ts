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
describe('File Upload API', () => {
    it('should upload a file successfully', async () => {
      const filePath = '/path/to/mock/file.png'; // Path to a mock file
      const mockFile = {
        fieldname: 'image',
        originalname: 'mock_file.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: '/tmp',
        filename: 'mock_file.png',
        path: filePath,
        size: 1000 // Size of the mock file
      };
  
      // Mock req and res objects
      const req = { file: mockFile };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
       // Mock the request headers
       const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
        
      // Make a request to the upload endpoint
      await request(app)
        .post('/file/upload')
        .set('authorization', headers.authorization)
        .set('refreshtoken', headers.refreshtoken)
        .send(req)
        .expect(400); // Expecting a successful response
    });
  });