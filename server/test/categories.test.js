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
//getCategories
describe('Categories Controller', () => {
    test('should get categories with valid authentication', async () => {
      // Mock the decoded user
      const mockUser = { id: '123', username: 'testuser' };
      jwt.verify.mockReturnValue({ user: mockUser });
  
      // Mock the request headers
      const headers = {
        authorization: 'validAccessToken',
        refreshtoken: 'validRefreshToken',
      };
  
      // Make a request to your route
      const response = await request(app).get('/categories/')
        .set('Authorization', headers.authorization)
        .set('Refreshtoken', headers.refreshtoken);
  
      // Assert the response status and any other expectations
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
  });