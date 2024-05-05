import { ReactElement } from 'react';
import { components, ControlProps } from 'react-select';

const CustomControl = ({ children, icon, ...props }: Props) => (
  <components.Control {...props}>
    {icon}
    {children}
  </components.Control>
);

type Props = ControlProps & {
  icon: ReactElement;
};

export default CustomControl;
