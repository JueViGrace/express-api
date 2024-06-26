import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import { UserEntity } from '../../users/models/entities/user.entity';
import authService from '../services/auth.service';
import userService from '../../users/services/user.service';
import customerService from '../../customers/services/customer.service';

const login = async (req: Request, res: Response) => {
  try {
    const userEncode = req.user as UserEntity;

    const encode = await authService.generateJWT(userEncode);

    if (!encode) {
      return httpResponse.Unauthorized(
        res,
        "You're not authorized to access this endpoint.",
      );
    }

    res.header('Content-Type', 'application/json');
    res.cookie('accessToken', encode.accessToken, { maxAge: 60000 * 60 });
    res.write(JSON.stringify(encode));
    res.end();
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    await customerService.createCustomer({ user: newUser });

    if (!newUser) {
      return httpResponse.BadRequest(res, 'Failed to create user');
    }

    const encode = await authService.generateJWT(newUser);

    if (!encode) {
      return httpResponse.Error(res, 'Error creating user');
    }

    res.header('Content-Type', 'application/json');
    res.cookie('accessToken', encode.accessToken, { maxAge: 60000 * 60 });
    res.write(JSON.stringify(encode));
    res.end();
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

export default {
  login,
  signUp,
};
