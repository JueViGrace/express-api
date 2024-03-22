import {
  ExtractJwt,
  Strategy as JwtStr,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { PayloadToken } from '../interface/auth.interface';
import { PassportUse } from '../utils/passport.use';
import dotenvSetup from '../../app/config/dotenv.setup';

const validate = (payload: PayloadToken, done: any) => {
  return done(null, payload);
};

const jwtStrategy = () => {
  PassportUse<
    JwtStr,
    StrategyOptionsWithoutRequest,
    (payload: PayloadToken, done: any) => Promise<PayloadToken>
  >(
    'jwt',
    JwtStr,
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: dotenvSetup.getEnviroment('JWT_SECRET') ?? '',
      ignoreExpiration: false,
    },
    validate,
  );
};

export default jwtStrategy;
