import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import userService from '../services/user.service';
import { Like } from 'typeorm';
import { skip, pageSize } from '../../shared/utils/constants';

const getUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery = (req.query.searchQuery as string) || '';
    const sortOption = (req.query.sortOption as string) || 'updatedAt';
    const sortAs = (req.query.sortAs as string) || 'DESC';
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    if (searchQuery) {
      query['where'] = [
        {
          username: Like(`%${searchQuery}%`),
        },
        { name: Like(`%${searchQuery}%`) },
        { lastname: Like(`%${searchQuery}%`) },
      ];
    }

    const where = query['where'] ? (query['where'] = [...query['where']]) : [];

    query = {
      where,
      order: {
        [sortOption]: sortAs === 'DESC' ? 'DESC' : 'ASC',
      },
      skip: skip(page),
      take: pageSize,
    };

    const data = await userService.getUsers(query);

    const total = await userService.getUsersCount();

    if (data.length === 0) {
      return httpResponse.NotFound(res, 'Users not found');
    }

    const response = {
      users: data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    httpResponse.Ok(res, response);
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

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const user = await userService.findUserByEmail(req.body.email);

//     if (user) {
//       return httpResponse.BadRequest(res, 'This user already exists');
//     }

//     const data = await userService.createUser(req.body);

//     httpResponse.Ok(res, data);
//   } catch (error) {
//     httpResponse.Error(res, error);
//   }
// };

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return httpResponse.NotFound(res, 'User not found');
    }

    const data = await userService.updateUser(id, req.body);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to update user');
    }

    httpResponse.Ok(res, `User ${id} updated`);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return httpResponse.NotFound(res, 'User not found');
    }

    const data = await userService.deleteUser(id);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to delete user');
    }

    httpResponse.Ok(res, `User ${id} deleted`);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
