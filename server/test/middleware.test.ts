import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authenticate from '../refreshMiddleware'; // Import your middleware function

jest.mock('jsonwebtoken'); // Mock the jwt module

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      header: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should return 401 if no tokens are provided', () => {
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Access Denied. No token provided.');
    expect(next).not.toHaveBeenCalled();
  });

  it('should set req.user if access token is valid', () => {
    const decoded = { user: { id: '123' } };
    (jwt.verify as jest.Mock).mockReturnValue(decoded);

    req.headers = { authorization: 'Bearer validAccessToken' };
    authenticate(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 401 if no refresh token is provided', () => {
    const decoded = { user: { id: '123' } };
    (jwt.verify as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    req.headers = { authorization: 'Bearer validAccessToken' };
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Access Denied. No refresh token provided.');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return new access token and user if refresh token is valid', () => {
    const decodedRefreshToken = { user: { id: '123' } };
    const accessToken = 'newAccessToken';
    (jwt.verify as jest.Mock).mockReturnValue(decodedRefreshToken);
    (jwt.sign as jest.Mock).mockReturnValue(accessToken);

    req.headers = { authorization: 'Bearer invalidAccessToken' };
    authenticate(req as Request, res as Response, next);

    expect(res.header).toHaveBeenCalledWith('refreshToken', 'invalidAccessToken');
    expect(res.header).toHaveBeenCalledWith('Authorization', accessToken);
    expect(res.send).toHaveBeenCalledWith(decodedRefreshToken.user);
    expect(res.status).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Invalid Token.');
    expect(next).not.toHaveBeenCalled();
  });
});
