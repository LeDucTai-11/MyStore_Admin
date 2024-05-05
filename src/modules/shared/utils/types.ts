export interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

export enum YesNoValue {
  YES = 'YES',
  NO = 'NO',
}

export enum GenderValue {
  MALE = 1,
  FEMALE = 0,
}

export type Callback<T = any> = (..._args: T[]) => void;

export const emptyFunction = (..._args: any[]) => {};
