export enum AddStaffFormFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  GENDER = 'gender',
  PHONE_NUMBER = 'phoneNumber',
  EMAIL = 'email',
  ADDRESS = 'address',
}

export type AddStaffFormFieldsType = {
  [AddStaffFormFields.FIRST_NAME]: string;
  [AddStaffFormFields.LAST_NAME]: string;
  [AddStaffFormFields.GENDER]: number | 0 | 1;
  [AddStaffFormFields.PHONE_NUMBER]: string;
  [AddStaffFormFields.EMAIL]: string;
  [AddStaffFormFields.ADDRESS]: string;
};
