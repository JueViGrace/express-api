import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/models/entities/user.entity';
import userService from '../../users/services/user.service';
import { PayloadToken } from '../interface/auth.interface';
import dotenvSetup from '../../app/config/dotenv.setup';
import jwt from 'jsonwebtoken';

const validateLogin = async (username: string, password: string) => {
  const userByEmail = await userService.findUserByEmail(username);
  const userByUsername = await userService.findUserByUsername(username);

  if (userByUsername) {
    const isMatch = await bcrypt.compare(password, userByUsername.password);
    if (isMatch) {
      const { id, role } = userByUsername;

      return { id, role };
    }
  }

  if (userByEmail) {
    const isMatch = await bcrypt.compare(password, userByEmail.password);
    if (isMatch) {
      const { id, role } = userByEmail;
      return { id, role };
    }
  }

  return null;
};

const sign = (payload: jwt.JwtPayload, secret: any) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const generateJWT = async (
  user: UserEntity,
): Promise<{ accessToken: string; user: Partial<UserEntity> } | null> => {
  const userConsult = await userService.findUserById(user.id);

  if (!userConsult) {
    return null;
  }

  const payload: PayloadToken = {
    role: userConsult!.role,
    customerId: userConsult!.customer.id,
    sub: userConsult!.id,
  };

  const { role, ..._user } = userConsult;

  return {
    accessToken: sign(payload, dotenvSetup.getEnviroment('JWT_SECRET')),
    user: _user,
  };
};

export default {
  validateLogin,
  generateJWT,
};
