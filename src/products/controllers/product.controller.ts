import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import productService from '../services/product.service';
import { In, Like } from 'typeorm';
import { pageSize, skip } from '../../shared/utils/constants';

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchQuery = (req.query.searchQuery as string) || '';
    const selectedCategories = (req.query.selectedCategories as string) || '';
    const sortOption = (req.query.sortOption as string) || 'updatedAt';
    const sortAs = (req.query.sortAs as string) || 'DESC';
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    if (selectedCategories) {
      const categoriesArray = selectedCategories
        .split(',')
        .map((category) => category);

      query['where'] = [categoriesArray];
    }

    if (searchQuery) {
      query['where']
        ? (query['where'] = [
            {
              productName: Like(`%${searchQuery}%`),
              category: In([...query['where']]),
            },
            {
              reference: Like(`%${searchQuery}%`),
              category: In([...query['where']]),
            },
          ])
        : (query['where'] = [
            { productName: Like(`%${searchQuery}%`) },
            { reference: Like(`%${searchQuery}%`) },
          ]);
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

    const data = await productService.getPagedProducts(query);

    const total = await productService.getProductCount();

    if (data.length === 0) {
      return httpResponse.NotFound(res, 'Products not found');
    }

    const response = {
      products: data,
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

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.getProductById(id);

    return httpResponse.Ok(res, data);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = await productService.createProduct(req.body);

    return httpResponse.Created(res, data);
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.updateProduct(id, req.body);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to update product');
    }

    return httpResponse.Ok(res, 'Product updated');
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.deleteProduct(id);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to delete product');
    }

    return httpResponse.Ok(res, 'Product deleted');
  } catch (error) {
    return httpResponse.Error(res, error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
