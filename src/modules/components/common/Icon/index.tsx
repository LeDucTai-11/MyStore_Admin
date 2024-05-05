import React, { HTMLProps } from 'react';
import cn from 'classnames';
import './styles.scss';

const Icon: React.FC<Props> = ({ name, className, ...props }) => {
  const iconName = `icon-${name}`;

  return <i className={cn(iconName, className)} {...props} />;
};

type Props = HTMLProps<HTMLElement>;

export default Icon;
