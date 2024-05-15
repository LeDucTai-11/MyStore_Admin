import { GENDER, UserRoles } from '@queries/Staff';
import { TableParams } from 'src/modules/components/common/Table';

export type ShipperList = {};

export type ShipperListParams = TableParams & {
  active?: boolean;
  roles?: string[];
};

export type ShipperResponse = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  address: string;
  userRoles: UserRoles[];
  createdAt: string;
  deletedAt: string;
};

export type AddShipperPayload = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: number | 0 | 1;
  phone: string;
  email: string;
  address: string;
};

export type DeleteShipperPayload = {
  id: string;
};
