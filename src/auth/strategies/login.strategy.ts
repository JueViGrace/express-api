import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import authService from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

const login = async (username: string, password: string, done: any) => {
  try {
    const user = await authService.validateLogin(username, password);

    if (!user) {
      return done(null, false, { messages: 'Incorrect credentials' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const loginStrategy = () =>
  PassportUse<LocalStrategy, Object, VerifyFunction>(
    'login',
    LocalStrategy,
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    login,
  );

export default loginStrategy;
