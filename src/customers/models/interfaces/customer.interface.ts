import { UserEntity } from '../../../users/models/entities/user.entity';

export interface Customer {
  city?: string;
  state?: string;
  dni?: string;
  address?: string;
  phoneNumber?: string;
  user: UserEntity;
}
