import { DeleteResult, Like, UpdateResult } from 'typeorm';
import execRepository from '../../app/config/db/repository';
import { ProductEntity } from '../models/entities/product.entity';
import { Product } from '../models/interfaces/product.interface';
import { UpdateProduct } from '../models/interfaces/update-product.interface';

const productRepository = execRepository(ProductEntity);

const getProductCount = async (): Promise<number> => {
  return (await productRepository).count();
};

const getPagedProducts = async (query: any): Promise<ProductEntity[]> => {
  return (await productRepository).find(query);
};

const getProductById = async (id: string): Promise<ProductEntity | null> => {
  return (await productRepository).findOne({ where: [{ id }] });
};

const findProductByReference = async (reference: string) => {
  return (await productRepository).find({ where: [{ reference }] });
};

const createProduct = async (body: Product): Promise<ProductEntity> => {
  return (await productRepository).save(body);
};

const updateProduct = async (
  id: string,
  body: UpdateProduct,
): Promise<UpdateResult> => {
  return (await productRepository).update(id, body);
};

const deleteProduct = async (id: string): Promise<DeleteResult> => {
  return (await productRepository).delete(id);
};

export default {
  getProductCount,
  getPagedProducts,
  getProductById,
  findProductByReference,
  createProduct,
  updateProduct,
  deleteProduct,
};
