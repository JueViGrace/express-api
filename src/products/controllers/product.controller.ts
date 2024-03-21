import { Request, Response } from 'express';
import httpResponse from '../../shared/response/http.response';
import productService from '../services/product.service';
import { ArrayContains, Like } from 'typeorm';

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchQuery = (req.query.searchQuery as string) || '';
    const selectedCategories = (req.query.selectedCategories as string) || '';
    const sortOption = (req.query.sortOption as string) || 'lastUpdated';
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    if (selectedCategories) {
      const categoriesArray = selectedCategories
        .split(',')
        .map((category) => category);

      query['where'] = [{ category: ArrayContains(categoriesArray) }];
    }

    if (searchQuery) {
      query['where'] = [
        { productName: searchQuery },
        { reference: searchQuery },
        ...query['where'],
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const data = await productService.getPagedProducts({
      query,
      sortOption,
      skip,
      pageSize,
    });

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

    httpResponse.Ok(res, response);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.getProductById(id);

    if (!data) {
      return httpResponse.NotFound(res, 'Product not found');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = await productService.createProduct(req.body);

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.updateProduct(id, req.body);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to update product');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await productService.deleteProduct(id);

    if (!data.affected) {
      return httpResponse.BadRequest(res, 'Failed to delete product');
    }

    httpResponse.Ok(res, data);
  } catch (error) {
    httpResponse.Error(res, error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
