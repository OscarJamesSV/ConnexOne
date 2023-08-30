import { Request, Response, NextFunction} from 'express';

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('in the auth middleware');
    const authToken = req.headers.authorization;
    console.log(authToken, 'authToken')
    if (authToken === 'mysecrettoken') {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
  