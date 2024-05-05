export enum CategoryFormFields {
  CATEGORY_NAME = 'categoryName',
  DESCRIPTION = 'description',
  IMAGE = 'image',
}

export type CategoryFormFieldsType = {
  [CategoryFormFields.CATEGORY_NAME]: string;
  [CategoryFormFields.DESCRIPTION]: string;
  [CategoryFormFields.IMAGE]: string;
};
