export enum StoreFormFields {
  ADDRESS = 'address',
  HOTLINE = 'hotline',
}

export type StoreFormFieldsType = {
  [StoreFormFields.ADDRESS]: string;
  [StoreFormFields.HOTLINE]: string;
};
