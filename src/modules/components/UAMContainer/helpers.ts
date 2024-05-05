import { Role, UserRole } from '@components/UserProfile';
import _ from 'lodash';

export const isStaffPortal = (roles: Role[]) =>
  roles.some((role) => [UserRole.ADMIN, UserRole.STAFF].includes(role.roleId));

export const isCustomerPortal = (roles: Role[]) => {
  return roles.some((role) => role.roleId === UserRole.USER);
};
