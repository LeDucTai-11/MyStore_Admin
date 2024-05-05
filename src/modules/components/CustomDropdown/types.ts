export type DropdownItem = {
  label: string | React.ReactNode;
  onClick: (..._args: any) => any;
  icon?: string | React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
};
