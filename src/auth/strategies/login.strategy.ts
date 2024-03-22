import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import authService from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

const login = async (username: string, password: string, done: any) => {
  const user = await authService.validateUser(username, password);

  if (!user) {
    return done(null, false, { message: 'Invalid username or password' });
  }

  return done(null, user);
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
