import { Request, Response } from 'express';
import { In } from 'typeorm';
import { PayloadToken } from '../../auth/interface/auth.interface';
import httpResponse from '../../shared/response/http.response';
import { pageSize, skip } from '../../shared/utils/constants';
import { OrderStatus } from '../models/enums/order-status.enum';
import { OrderItem } from '../models/interfaces/order-items.interface';
import orderService from '../services/order.service';
import orderItemService from '../services/order-item.service';

const getOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user as PayloadToken;
    const selectedStatus = (req.query.selectedStatus as string) || 'all';
    const sortOption = (req.query.sortOption as string) || 'updatedAt';
    const sortAs = (req.query.sortAs as string) || 'DESC';
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    if (selectedStatus) {
      const statusArray = selectedStatus.split(',').map((status) => status);

      query['where'] = [{ status: In(statusArray) }];
    }

    const where = query['where']
      ? (query['where'] = [{ customer: { id: user.sub } }, ...query['where']])
      : [{ customer: { id: user.sub } }];

    query = {
      where,
      order: {
        [sortOption]: sortAs === 'DESC' ? 'DESC' : 'ASC',
      },
      skip: skip(page),
      take: pageSize,
    };

    const data = await orderService.getOrders(query);

    if (data.length === 0) {
      return httpResponse.NotFound(res, 'Orders not found');
    }

    const total = await orderService.getOrdersCount(user.sub);

    const response = {
      orders: data,
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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user as PayloadToken;

    const data = await orderService.getOrderById(id, user.sub);

    if (!data) {
      return httpResponse.NotFound(res, 'Order not found');
    }

    return httpResponse.Ok(res, data);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderItems, customer, paymentMethod } = req.body;

    let totalAmount: number = 0;

    orderItems.map(
      (item: OrderItem) => (totalAmount += item.quantity * item.price),
    );

    const data = await orderService.createOrder({
      totalAmount: totalAmount,
      status: OrderStatus.PLACED,
      customer,
      paymentMethod,
    });

    const orderItemData = await orderItemService.createOrderItem({
      order: { id: data.id },
      ...orderItems,
    });

    if (!data || !orderItemData) {
      return httpResponse.BadRequest(res, 'Failed to create order');
    }

    return httpResponse.Created(res, 'Order created');
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
