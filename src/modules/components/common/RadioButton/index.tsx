import cn from 'classnames';
import React, { useRef } from 'react';
import shortid from 'shortid';
import Element from '../Element';
import './styles.scss';
import { Stack } from '@mui/material';

const RadioButton: React.FC<RadioProps> = ({
  label,
  labelClassName,
  containerClassName,
  style,
  ...props
}) => {
  const id = useRef(shortid.generate());
  return (
    <Stack flexDirection="row" className={cn('cmp-radio', containerClassName)} style={style}>
      <input id={id.current} className={cn('cmp-radio__input')} type="radio" {...props} />
      <label htmlFor={id.current} className={cn('cmp-radio__label', labelClassName)}>
        {label}
      </label>
    </Stack>
  );
};

type RadioProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
};

const castTrueFalseStringToBoolean = (value: string) => {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
};

const Group: React.FC<RadioGroupProps> = ({
  options,
  value,
  containerClassName,
  label,
  errorMessage,
  name,
  columns = 3,
  required,
  isTrueFalseOptions = false,
  onBlur = (..._args: any[]) => {},
  onChange = (..._args: any[]) => {},
  ...props
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    const data = isTrueFalseOptions ? castTrueFalseStringToBoolean(value) : value;
    onChange(name, data);
  };

  const handleRadioBlur = () => {
    onBlur(name, true);
  };

  return (
    <Element
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      required={required}
    >
      <Stack flexDirection="row" alignItems="center" className="pb-8">
        {options?.map((option) => (
          <RadioButton
            key={`radio-${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            label={option.label}
            onChange={handleValueChange}
            containerClassName={cn(columns && 'cmp-radio-groups__column')}
            style={{ width: `${100 / columns}%` }}
            onBlur={handleRadioBlur}
            {...props}
          />
        ))}
      </Stack>
    </Element>
  );
};

type RadioGroupProps = {
  label?: string;
  options?: { value: any; label: string }[];
  value?: any;
  name?: string;
  onChange?: (..._args: any[]) => void;
  errorMessage?: string;
  containerClassName?: string;
  labelClassName?: string;
  description?: string;
  columns?: number;
  disabled?: boolean;
  onBlur?: (..._args: any[]) => void;
  required?: boolean;
  isTrueFalseOptions?: boolean;
};

export default Group;
