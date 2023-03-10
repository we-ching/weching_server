import { Router } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { userEnum } from '../interfaces';

export const authRouter = Router();

authRouter.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get( 
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user === userEnum.GUEST) {
      res.json(req.authInfo);
      return;
    }

    res.json(setUserToken(res, req.user));
  }
);
