export type UserProfileType = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  phone: string;
  address: string;
  userRoles: Role[];
  gender: number | 0 | 1;
};

export type Role = {
  roleId: UserRole;
  role: {
    id: UserRole;
    name: string;
  };
};

export enum UserRole {
  ADMIN = 3,
  STAFF = 2,
  USER = 1,
}

export const RoleTitle = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.STAFF]: 'Staff',
  [UserRole.USER]: 'User',
};
