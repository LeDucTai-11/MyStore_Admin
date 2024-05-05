import { IconButton, Stack, Typography } from '@mui/material';
import cn from 'classnames';
import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { getRandomId, isEmpty } from 'src/modules/shared';
import './styles.scss';
import Icon from '../Icon';
import { COLOR_CODE } from '@components/configs';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  iconName = '',
  iconComponent,
  onIconClick,
  required,
  isUncontrolledInput = false,
  isSmallSize = true,
  ...props
}) => {
  const id = useRef<string>(`input-${getRandomId()}`);

  const uncontrolledInputRef = useRef<HTMLInputElement>(undefined);

  if (!inputRef && isUncontrolledInput && uncontrolledInputRef.current) {
    uncontrolledInputRef.current.value = props.defaultValue?.toString();
  }

  if (inputRef && inputRef.current && isUncontrolledInput) {
    inputRef.current.value = props.defaultValue?.toString();
  }

  return (
    <Stack>
      <Typography variant="h5" mb={!!label && 1}>
        {label} {required && <span className="text-red-500 font-bold text-md">*</span>}
      </Typography>
      <input
        id={id.current}
        className={cn(className, 'cmp-input', {
          'cmp-input--error': !isEmpty(errorMessage),
          'cmp-input--icon': !isEmpty(iconName),
          'cmp-input--small-size': isSmallSize,
        })}
        ref={inputRef ?? (isUncontrolledInput ? uncontrolledInputRef : undefined)}
        {...props}
      />
      {iconName && !iconComponent && (
        <Icon name={iconName} className="cmp-input__icon" onClick={onIconClick} />
      )}
      {!iconName && iconComponent && (
        <IconButton onClick={onIconClick} classes={{ root: 'cmp-input__icon' }}>
          {iconComponent}
        </IconButton>
      )}
      {errorMessage && (
        <Typography variant="h6" color={COLOR_CODE.DANGER}>
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

export const InputIcon = ({ iconName, iconComponent, isIconPositionLeft, onIconClick }) => {
  switch (true) {
    case !isEmpty(iconComponent):
      return (
        <IconButton onClick={onIconClick} classes={{ root: 'cmp-input__icon p-0' }}>
          {iconComponent}
          <span
            style={{
              display: 'none',
            }}
          >
            Icon Input Label
          </span>
        </IconButton>
      );
    case !isEmpty(iconName):
      return (
        <Icon
          name={iconName}
          className={cn('cmp-input__icon', {
            left: isIconPositionLeft,
          })}
          onClick={onIconClick}
        />
      );
    default:
      return null;
  }
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
>;
export type InputProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  inputRef?: RefObject<HTMLInputElement>;
  iconName?: string;
  iconComponent?: React.ReactNode;
  onIconClick?: MouseEventHandler<HTMLElement>;
  label?: string | React.ReactNode;
  required?: boolean;
  isUncontrolledInput?: boolean;
  isSmallSize?: boolean;
};

export default Input;
