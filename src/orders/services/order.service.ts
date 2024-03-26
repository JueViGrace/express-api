import { UpdateResult } from 'typeorm';
import execRepository from '../../app/config/db/repository';
import { OrderEntity } from '../models/entities/order.entity';
import { Order } from '../models/interfaces/order.interface';
import { UpdateOrder } from '../models/interfaces/update-order';

const orderRepository = execRepository(OrderEntity);

const getOrdersCount = async (customerId: string): Promise<number> => {
  return (await orderRepository).count({
    where: [{ customer: { id: customerId } }],
  });
};

const getOrders = async (query: any): Promise<OrderEntity[]> => {
  return (await orderRepository).find(query);
};

const getOrderById = async (
  id: string,
  customerId: string,
): Promise<OrderEntity | null> => {
  return (await orderRepository).findOneBy({
    id,
    customer: { id: customerId },
  });
};

const createOrder = async (body: Order): Promise<OrderEntity> => {
  return (await orderRepository).save(body);
};

const updateOrder = async (
  id: string,
  body: UpdateOrder,
): Promise<UpdateResult> => {
  return (await orderRepository).update(id, body);
};

const deleteOrder = async (id: string) => {
  return;
};

export default {
  getOrdersCount,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
