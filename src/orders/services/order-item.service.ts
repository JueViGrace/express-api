import execRepository from '../../app/config/db/repository';
import { OrderItemEntity } from '../models/entities/order-item.entity';
import { OrderItem } from '../models/interfaces/order-items.interface';

const orderItemRepository = execRepository(OrderItemEntity);

const getOrderItems = async () => {
  return;
};

const getOrderItemById = async (id: string) => {
  return;
};

const createOrderItem = async (body: OrderItem) => {
  return (await orderItemRepository).save(body);
};

const updateOrderItem = async (id: string, body: any) => {
  return;
};

const deleteOrderItem = async (id: string) => {
  return;
};

export default {
  getOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
