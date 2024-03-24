import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import authService from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

const login = async (username: string, password: string, done: any) => {
  const user = await authService.validateUser(username, password);

  if (!user) {
    return done(null, false, { message: 'Incorrect credentials' });
  }

  return done(null, user);
};

const loginStrategy = () =>
  PassportUse<LocalStrategy, Object, VerifyFunction>(
    'local',
    LocalStrategy,
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    login,
  );

export default loginStrategy;
