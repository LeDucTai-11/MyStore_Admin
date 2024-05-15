import { Chip } from '@mui/material';
import { getStartCase, isEmpty } from 'src/modules/shared';
import { ROLE_ID, ROLE_NAME, STATUS, UserRoles } from 'src/queries';

export const UserRoleOptions = [
  {
    label: getStartCase(ROLE_NAME[ROLE_ID._ADMIN]),
    value: ROLE_ID._ADMIN,
  },
  {
    label: getStartCase(ROLE_NAME[ROLE_ID._STAFF]),
    value: ROLE_ID._STAFF,
  },
  {
    label: getStartCase(ROLE_NAME[ROLE_ID._SHIPPER]),
    value: ROLE_ID._SHIPPER,
  },
];

export const UserStatusOptions = [
  {
    label: STATUS._ACTIVE,
    value: true,
  },
  {
    label: STATUS._INACTIVE,
    value: false,
  },
];

export enum USER_FILTER_QUERY_KEY {
  _STATUS = 'active',
}

export const filterParamsKey = [USER_FILTER_QUERY_KEY._STATUS];

export const customStatusRender = (deletedAt: string) => {
  if (isEmpty(deletedAt)) return <Chip label={STATUS._ACTIVE} color="success" />;
  return <Chip label={STATUS._INACTIVE} />;
};

export const customRoleRender = (userRoles: UserRoles[]) => {
  if (!userRoles) return '--';
  const roleId = userRoles[0].roleId;
  switch (roleId) {
    case ROLE_ID._ADMIN:
      return <Chip label={ROLE_NAME[roleId]} color="primary" />;
    case ROLE_ID._STAFF:
      return <Chip label={ROLE_NAME[roleId]} color="secondary" />;
    case ROLE_ID._SHIPPER:
      return <Chip label={ROLE_NAME[roleId]} color="secondary" />;
    default:
      return <Chip label={ROLE_NAME[roleId]} />;
  }
};

export type ShipperFilterFormFieldsType = {
  active: string;
};

export const emptyShipperFilterValues: ShipperFilterFormFieldsType = {
  active: null,
};
