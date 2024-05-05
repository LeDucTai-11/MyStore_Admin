import staffApi from './staffApi';

export const StaffApi = staffApi.create();

export * from './type';
export * from './useGetAllStaff';
export * from './useGetStaffLazy';
export * from './useAddStaff';
export * from './useDeleteStaff';
