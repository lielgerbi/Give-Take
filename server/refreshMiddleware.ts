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
        .header('Authorization', newAccessToken)
        .send(decoded.user);
    } catch (error) {
      return res.status(400).send('Invalid Token.');
    }
  }
};

export default authenticate;





// const jwt = require('jsonwebtoken');
// const secretKey = 'secret_key';

// const authenticate = (req, res, next) => {
//   const accessToken = req.headers['authorization'];
//   const refreshToken = req.headers['refreshtoken'];

//   if (!accessToken && !refreshToken) {
//     return res.status(401).send('Access Denied. No token provided.');
//   }

//   try {
//     const decoded = jwt.verify(accessToken, secretKey);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     if (!refreshToken) {
//       return res.status(401).send('Access Denied. No refresh token provided.');
//     }

//   try {
//       console.log("4")
//       const decoded = jwt.verify(refreshToken, secretKey);
//       const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });

//       res
//         .header('refreshToken', refreshToken)
//         .header('Authorization', accessToken)
//         .send(decoded.user);
//     } catch (error) {
//       return res.status(400).send('Invalid Token.');
//     }
//   }
// };
// module.exports = authenticate;

// const jwt = require('jsonwebtoken');


// const refreshMiddleware = async (req, res, next) => {
//   const refreshToken = req.body.refreshToken || req.query.refreshToken || req.headers['x-refresh-token'];
//   console.log(req)
//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Refresh token is missing' });
//   }

//   try {
//     const user = await User.findOne({ 'refreshTokens': refreshToken });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid refresh token' });
//     }

//     // Verify and decode refresh token
//     jwt.verify(refreshToken, 'your_refresh_secret', (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Invalid refresh token' });
//       }

//       // Generate a new access token
//       const newAccessToken = jwt.sign({ userId: decoded.userId, username: decoded.username }, 'your_access_secret', {
//         expiresIn: '15m',
//       });

//       req.accessToken = newAccessToken;
//       next();
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = refreshMiddleware;
