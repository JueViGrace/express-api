import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import userService from '../services/user.service';
import { Like } from 'typeorm';
import { skip, pageSize } from '../../shared/utils/constants';
import customerService from '../../customers/services/customer.service';
import { Customer } from './../../customers/models/interfaces/customer.interface';

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

    if (data.length === 0) {
      return httpResponse.NotFound(res, 'Users not found');
    }

    const total = await userService.getUsersCount();

    const response = {
      users: data,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    return httpResponse.Ok(res, response);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await userService.getUserById(id);

    if (!data) {
      return httpResponse.NotFound(res, 'User not found');
    }

    return httpResponse.Ok(res, data);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
      body: { username, email, name, lastname, customer },
    } = req;

    const data = await userService.updateUser(id, {
      username,
      email,
      name,
      lastname,
    });

    const customerData = await customerService.updateCustomer(customer.id, {
      city: customer.city,
      state: customer.state,
      dni: customer.dni,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
    });

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to update user.');
    }

    if (!customerData.affected) {
      return httpResponse.BadRequest(res, 'Failed to update customer data.');
    }

    return httpResponse.Ok(res, 'User updated!');
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingUser = await userService.findUserById(id);

    if (!existingUser) {
      return httpResponse.NotFound(res, 'User not found');
    }

    const data = await userService.deleteUser(id);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to delete user');
    }

    return httpResponse.Ok(res, `User ${id} deleted`);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
