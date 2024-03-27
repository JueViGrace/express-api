import {
  ExtractJwt,
  Strategy as JwtStr,
  StrategyOptionsWithoutRequest,
  VerifiedCallback,
  VerifyCallback,
} from 'passport-jwt';
import { PayloadToken } from '../interface/auth.interface';
import { PassportUse } from '../utils/passport.use';
import dotenvSetup from '../../app/config/dotenv.setup';
import userService from '../../users/services/user.service';
import { request } from 'express';

const validate = async (payload: PayloadToken, done: VerifiedCallback) => {
  try {
    if (!payload) {
      return done(null, false, { messages: "You're not authenticated" });
    }

    const user = await userService.findUserById(payload.sub);

    if (!user) {
      return done(null, false, { messages: "User doesn't exists" });
    }

    // request.user = user
    return done(null, payload);
  } catch (err) {
    done(err);
  }
};

const jwtStrategy = () => {
  PassportUse<JwtStr, StrategyOptionsWithoutRequest, VerifyCallback>(
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
