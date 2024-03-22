import { RoleTypes } from '../../users/models/enums/role.type';

export interface PayloadToken {
  role: RoleTypes;
  sub: string;
}

export interface SecretJWT {
  secret: string | undefined;
}
