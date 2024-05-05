import React, { Attributes, PropsWithChildren } from 'react';
import cn from 'classnames';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import { Stack } from '@mui/material';
import { DropdownItem } from './types';
import './styles.scss';

const DropdownContainer: React.FC<PropsWithChildren<Props>> = ({
  label,
  items,
  xPosition = 'left',
  yPosition = 'bottom',
  flexPosition,
  labelClassName,
  children,
}) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(items.length);

  // const handleKeyPress = (item: DropdownItem) => (event: KeyboardEvent) => {
  //   event.preventDefault();
  //   if (event.code === 'Enter') {
  //     item.onClick();
  //   }
  // };

  return (
    <Stack className={cn('cmp-dropdown')} alignSelf={flexPosition}>
      <button
        className={cn('cmp-dropdown__button-wrap', labelClassName, {
          'cmp-dropdown__button-wrap--open': isOpen,
        })}
        {...buttonProps}
      >
        {label}
      </button>
      <Stack
        className={cn(
          'cmp-dropdown__menu',
          `cmp-dropdown__menu--x-${xPosition}`,
          `cmp-dropdown__menu--y-${yPosition}`,
          { visible: isOpen },
        )}
      >
        {React.Children.map(children, (child, idx) => {
          if (React.isValidElement(child)) {
            const item = items[idx];
            return React.cloneElement(child, {
              ...itemProps[`${idx}`],
              className: cn(
                'cmp-dropdown__item',
                { 'cmp-dropdown__item--active': item.isActive },
                { 'cmp-dropdown__item--disabled': item.isDisabled },
              ),
              onClick: item.onClick,
              // onKeyPress: handleKeyPress(item),
            } as Attributes);
          }
          return child;
        })}
      </Stack>
    </Stack>
  );
};

type Props = {
  flexPosition?: 'flex-start' | 'flex-end';
  labelClassName?: string;
  label: React.ReactNode;
  items: DropdownItem[];
  xPosition?: 'left' | 'right';
  yPosition?: 'top' | 'bottom';
};

export default DropdownContainer;
