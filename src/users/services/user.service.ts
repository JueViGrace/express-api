import { DeleteResult, UpdateResult } from 'typeorm';
import execRepository from '../../app/config/db/repository';
import { UserEntity } from '../models/entities/user.entity';
import { UpdateUser } from '../models/interfaces/update-user.interface';
import { User } from '../models/interfaces/user.interface';

const userRepository = execRepository(UserEntity);

const getUsers = async (): Promise<UserEntity[]> => {
  return (await userRepository).find();
};

const getUserById = async (id: string): Promise<UserEntity | null> => {
  return (await userRepository).findOneBy({ id });
};

const findUserByEmail = async (email: string): Promise<UserEntity | null> => {
  return (await userRepository).findOne({ where: [{ email }] });
};

const createUser = async (body: User): Promise<UserEntity> => {
  return (await userRepository).save(body);
};

const updateUser = async (
  id: string,
  body: UpdateUser,
): Promise<UpdateResult> => {
  return (await userRepository).update(id, body);
};

const deleteUser = async (id: string): Promise<DeleteResult> => {
  return (await userRepository).softDelete(id);
};

export default {
  getUsers,
  getUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
