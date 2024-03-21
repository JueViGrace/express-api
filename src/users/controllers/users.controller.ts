import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import userService from '../services/user.service';

const getUsers = async (_req: Request, res: Response) => {
  try {
    const data = await userService.getUsers();

    if (data.length === 0) {
      return httpResponse.NotFound(res, 'Users not found');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await userService.getUserById(id);

    if (!data) {
      return httpResponse.NotFound(res, 'User not found');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);

    if (user) {
      return httpResponse.BadRequest(res, 'This user already exists');
    }

    const data = await userService.createUser(req.body);

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await userService.updateUser(id, req.body);

    if (!data.affected) {
      return httpResponse.NotFound(res, 'Failed to update user');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await userService.deleteUser(id);

    if (!data.affected) {
      return httpResponse.NotFound(res, 'Failed to delete user');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
