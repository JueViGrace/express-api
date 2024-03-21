import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import serverRoutes from '../routes/server.router';
import dbConnect from './db/data.source';

const appSetup = (): express.Application => {
  const app = express();

  dbConnect()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err: any) => {
      console.error('Error during Data Source initialization', err);
    });

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/api', serverRoutes);
  app.use('/health', async (_req: Request, res: Response) => {
    res.status(200).send({ message: 'health is OK!' });
  });

  return app;
};

export default appSetup;
