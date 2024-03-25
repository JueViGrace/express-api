import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import jwtStrategy from '../../auth/strategies/jwt.strategy';
import loginStrategy from '../../auth/strategies/login.strategy';
import serverRoutes from '../routes/server.router';
import dbConnect from './db/data.source';

const appSetup = async (): Promise<express.Application> => {
  const app = express();

  dbConnect()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err: any) => {
      console.error('Error during Data Source initialization', err);
    });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(cors());

  app.use(passport.initialize());

  loginStrategy();
  jwtStrategy();

  app.use('/api', serverRoutes);
  app.use('/health', async (_req: Request, res: Response) => {
    res.status(200).send({ message: 'health is OK!' });
  });

  return app;
};

export default appSetup;
