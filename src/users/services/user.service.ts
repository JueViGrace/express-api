import { DeleteResult, Not, UpdateResult } from 'typeorm';
import execRepository from '../../app/config/db/repository';
import { UserEntity } from '../models/entities/user.entity';
import { UpdateUser } from '../models/interfaces/update-user.interface';
import { User } from '../models/interfaces/user.interface';
import bcrypt from 'bcrypt';
import { RoleTypes } from '../models/enums/role.type';

// TODO: REMOVE ROLE FROM REQUESTS

const userRepository = execRepository(UserEntity);

const getUsersCount = async (): Promise<number> => {
  return (await userRepository).count();
};
const getUsers = async (query: any): Promise<UserEntity[]> => {
  console.log(query);

  return (await userRepository).find(query);
};

const getUserById = async (id: string): Promise<UserEntity | null> => {
  return (await userRepository).findOneBy({ id, role: Not(RoleTypes.ADMIN) });
};

const findUserById = async (id: string): Promise<UserEntity | null> => {
  return (await userRepository).findOneBy({ id });
};

const findUserByEmail = async (email: string): Promise<UserEntity | null> => {
  return (await userRepository)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where({ email })
    .getOne();
};

const findUserByUsername = async (
  username: string,
): Promise<UserEntity | null> => {
  return (await userRepository)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where({ username })
    .getOne();
};

const createUser = async (body: User): Promise<UserEntity> => {
  const newUser = (await userRepository).create(body);

  const hash = await bcrypt.hash(newUser.password, 10);

  return (await userRepository).save({
    ...newUser,
    password: hash,
    role: RoleTypes.USER,
  });
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
  getUsersCount,
  getUsers,
  getUserById,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
