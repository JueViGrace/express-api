import execRepository from '../../app/config/db/repository';
import { CustomerEntity } from '../models/entities/customer.entity';
import { Customer } from '../models/interfaces/customer.interface';
import { UpdateCustomer } from '../models/interfaces/update-customer.interface';

const customerRepository = execRepository(CustomerEntity);

const findCustomerById = async (id: string) => {
  return (await customerRepository).findOne({
    where: [{ id }],
    relations: { user: true },
  });
};

const createCustomer = async (body: Customer) => {
  return (await customerRepository).save(body);
};

const updateCustomer = async (id: string, body: UpdateCustomer) => {
  return (await customerRepository).update(id, body);
};

const deleteCustomer = async (id: string) => {
  return (await customerRepository).delete(id);
};

export default {
  findCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
