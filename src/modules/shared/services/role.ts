import { RoleTitle, UserRole } from '@components';
import { isEmpty } from '@shared/utils';

const ROLE_TOKEN = `USER_ROLE`;

const clearUserRole = () => {
  localStorage.removeItem(ROLE_TOKEN);
};

const setUserRole = (value: any) => {
  localStorage.setItem(ROLE_TOKEN, value);
};

const getUserRole = () => {
  return localStorage.getItem(ROLE_TOKEN);
};

const isAdminRole = (roleId?: UserRole) => {
  return !isEmpty(roleId)
    ? roleId === UserRole.ADMIN
    : RoleTitle[getUserRole()] === RoleTitle[UserRole.ADMIN];
};

export default {
  clearUserRole,
  setUserRole,
  getUserRole,
  isAdminRole,
};
