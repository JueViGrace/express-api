import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import dbConnect from './data.source';

const execRepository = async <T extends ObjectLiteral>(
  e: EntityTarget<T>,
): Promise<Repository<T>> => {
  const dataSource = await dbConnect();
  return dataSource.getRepository(e);
};

export default execRepository;
