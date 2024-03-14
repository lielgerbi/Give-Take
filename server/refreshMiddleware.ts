import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

const secretKey = 'secret_key';

const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.headers['refreshtoken'];

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(accessToken as string, secretKey) as { user: any };
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
      const decoded = jwt.verify(refreshToken as string, secretKey) as { user: any };
      const newAccessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

      res
        .header('refreshToken', refreshToken)
        .header('authorization', newAccessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
};

export default authenticate;