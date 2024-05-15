export enum AddShipperFormFields {
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    GENDER = 'gender',
    PHONE_NUMBER = 'phoneNumber',
    EMAIL = 'email',
    ADDRESS = 'address',
  }
  
  export type AddShipperFormFieldsType = {
    [AddShipperFormFields.FIRST_NAME]: string;
    [AddShipperFormFields.LAST_NAME]: string;
    [AddShipperFormFields.GENDER]: number | 0 | 1;
    [AddShipperFormFields.PHONE_NUMBER]: string;
    [AddShipperFormFields.EMAIL]: string;
    [AddShipperFormFields.ADDRESS]: string;
  };
  