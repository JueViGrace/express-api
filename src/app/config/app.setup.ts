import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import jwtStrategy from '../../auth/strategies/jwt.strategy';
import loginStrategy from '../../auth/strategies/login.strategy';
import serverRoutes from '../routes/server.router';
import dbConnect from './db/data.source';
import dotenvSetup from './dotenv.setup';
import { TypeormStore } from 'connect-typeorm';
import execRepository from './db/repository';
import { SessionsEntity } from '../../shared/models/entities/session.entity';
import passport from 'passport';

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
  loginStrategy();
  jwtStrategy();

  const sessionsRepository = await execRepository(SessionsEntity);

  app.use(
    session({
      secret: dotenvSetup.getEnviroment('SESSION_SECRET'),
      saveUninitialized: true,
      resave: false,
      store: new TypeormStore().connect(sessionsRepository),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  app.use(passport.initialize())
    app.use(passport.session())

  app.use('/api', serverRoutes);
  app.use('/health', async (_req: Request, res: Response) => {
    res.status(200).send({ message: 'health is OK!' });
  });

  return app;
};

export default appSetup;
