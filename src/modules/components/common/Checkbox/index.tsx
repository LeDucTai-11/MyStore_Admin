/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import shortid from 'shortid';
import React, { HTMLProps, useRef } from 'react';
import Element from '../Element';
import { isEmpty, isNumeric } from 'src/modules/shared';

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  errorMessage,
  className,
  disabled,
  style,
  isCustomLabel,
  labelClassName,
  isMiddle,
  ...props
}) => {
  const id = useRef(shortid.generate());
  const hasError = !isEmpty(errorMessage);
  return (
    <Stack
      flexDirection="row"
      className={cn('cmp-checkbox', { 'cmp-checkbox__disabled': disabled }, className)}
      style={style}
    >
      <Stack flexDirection="row">
        <input
          id={id.current}
          type="checkbox"
          className={cn('cmp-checkbox__input')}
          style={{ display: 'none' }}
          checked={!!props.value}
          {...props}
        />
        <label
          htmlFor={id.current}
          className={cn(
            'cmp-checkbox__label',
            'check',
            {
              'custom-label': isCustomLabel,
              'is-middle': isMiddle,
            },
            labelClassName,
          )}
        >
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
            <polyline points="1 9 7 14 15 4" />
          </svg>
          <span className={cn('cmp-checkbox__label--text')}>{label}</span>
        </label>
      </Stack>
      {hasError && <p className="cmp-checkbox__error">{errorMessage}</p>}
    </Stack>
  );
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
>;
type CheckboxProps = BaseInputProps & {
  label?: React.ReactNode | string;
  errorMessage?: string;
  isMiddle?: boolean;
  isCustomLabel?: boolean;
  labelClassName?: string;
  noneOfAboveKey?: boolean;
  isGetStringValue?: boolean;
};

const Group: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  name,
  onChange = () => {},
  value = [],
  errorMessage,
  containerClassName,
  columns = 2,
  customColumnMargin,
  disabled,
  description,
  noneOfAboveKey,
  isGetStringValue,
}) => {
  const hasInteract = useRef(false);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    hasInteract.current = true;

    const target = event.target as HTMLInputElement;
    const key =
      isNumeric(target.value) && !isGetStringValue ? parseInt(target.value, 10) : target.value;

    const isChecked = value?.indexOf(key) >= 0;

    if (noneOfAboveKey && !isChecked) {
      const noneOfAboveItem = options.find((x) => x.key === noneOfAboveKey);
      if (noneOfAboveItem) {
        if (noneOfAboveItem.value === key) {
          onChange(name, [key]);
          return;
        }
        // eslint-disable-next-line no-unsafe-optional-chaining
        onChange(name, [...value?.filter((x) => x !== noneOfAboveItem.value), key]);

        return;
      }
    }

    let updated: any[] = [];
    if (isChecked) {
      updated = value?.filter((x) => x !== key);
    } else {
      updated = [...value, key];
    }

    // setData(updated);
    onChange(name, updated);
  };

  const hasDesc = !!description;

  return (
    <Element errorMessage={errorMessage} label={label} className={containerClassName}>
      {hasDesc && <Typography className="text-is-14 mb-2">{description}</Typography>}
      <Stack flexDirection="row" className="mt-1">
        {options?.map((option) => (
          <Checkbox
            key={`checkbox-${name}-${option.value}`}
            value={option.value}
            checked={value?.indexOf(option.value) >= 0}
            label={option.label}
            onChange={handleValueChange}
            className={cn(columns && 'cmp-checkbox-group__column mb-8')}
            style={
              customColumnMargin
                ? { marginRight: `${customColumnMargin}px` }
                : { width: `${100 / columns}%` }
            }
            disabled={option?.disabled || disabled}
            name={name}
          />
        ))}
      </Stack>
    </Element>
  );
};

type CheckboxGroupProps = {
  label?: React.ReactNode | string;
  options?: { value: any; label: string; key?: string; disabled?: boolean }[];
  value?: any[];
  name?: string;
  onChange?: (..._arg: any[]) => void;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  columns?: number;
  customColumnMargin?: number;
  disabled?: boolean;
  noneOfAboveKey?: string;
  isCustomLabel?: boolean;
  isGetStringValue?: boolean;
};

export default { Item: Checkbox, Group };
