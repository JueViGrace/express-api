import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/models/entities/user.entity';
import userService from '../../users/services/user.service';
import { PayloadToken } from '../interface/auth.interface';
import dotenvSetup from '../../app/config/dotenv.setup';
import jwt from 'jsonwebtoken';
import { User } from '../../users/models/interfaces/user.interface';

const validateUser = async (username: string, password: string) => {
  const userByEmail = await userService.findUserByEmail(username);
  const userByUsername = await userService.findUserByUsername(username);

  if (userByUsername) {
    const isMatch = await bcrypt.compare(password, userByUsername.password);
    if (isMatch) {
      return userByUsername;
    }
  }

  if (userByEmail) {
    const isMatch = await bcrypt.compare(password, userByEmail.password);
    if (isMatch) {
      return userByEmail;
    }
  }

  return null;
};

const sign = (payload: jwt.JwtPayload, secret: any) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const generateJWT = async (
  user: UserEntity,
): Promise<{ accessToken: string; user: Partial<UserEntity> }> => {
  const userConsult = await userService.getUserById(user.id);

  const payload: PayloadToken = {
    role: userConsult!.role,
    sub: userConsult!.id,
  };

  const { password, deletedAt, role, ..._user } = user;

  return {
    accessToken: sign(payload, dotenvSetup.getEnviroment('JWT_SECRET')),
    user: _user,
  };
};

export default {
  validateUser,
  generateJWT,
};
