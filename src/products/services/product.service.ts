import { Like } from 'typeorm';
import execRepository from '../../app/config/db/repository';
import { ProductEntity } from '../models/entities/product.entity';
import { Product } from '../models/interfaces/product.interface';
import { UpdateProduct } from '../models/interfaces/update-product.interface';

const productRepository = execRepository(ProductEntity);

const getProductCount = async () => {
  return (await productRepository).count();
};

const getPagedProducts = async ({ query, sortOption, skip, pageSize }: any) => {
  return (await productRepository).find(
    query,
    //   {
    //   where:
    //     query
    //       ? [
    //           { productName: query },
    //           { reference: query },
    //         ]
    //       : [],
    //   order: {
    //     ['updatedAt']: sortOption === 'lastUpdated' ? 'DESC' : 'ASC',
    //   },
    //   skip: skip,
    //   take: pageSize,
    //   // order: {
    //   //   ['productName']: 'ASC',
    //   // },
    //   // skip: skip,
    //   // take: pageSize,
    // }
  );
};

const getProductById = async (id: string) => {
  return (await productRepository).findOneBy({ id });
};

const searchProducts = async ({ query, sortOption, skip, pageSize }: any) => {
  return (await productRepository).find({
    where: [
      { productName: Like(`%${query}%`) },
      { reference: Like(`%${query}%`) },
    ],
    order: {
      ['updatedAt']: sortOption === 'lastUpdated' ? 'DESC' : 'ASC',
    },
    skip: skip,
    take: pageSize,
  });
};

const createProduct = async (body: Product) => {
  return (await productRepository).save(body);
};

const updateProduct = async (id: string, body: UpdateProduct) => {
  return (await productRepository).update(id, body);
};

const deleteProduct = async (id: string) => {
  return (await productRepository).delete(id);
};

export default {
  getProductCount,
  getPagedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
