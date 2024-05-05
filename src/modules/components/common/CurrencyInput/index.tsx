import { MoneyInputDetect, emptyFunction } from '@shared';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Callback } from '@shared';
import { Input } from '..';
import { InputIcon, InputProps } from '../Input';

const DollarInputIcon = (
  <InputIcon
    iconName={'ic_dollar'}
    isIconPositionLeft={true}
    iconComponent={null}
    onIconClick={emptyFunction}
  />
);

const CustomInput: React.FC<Props> = ({
  showCustomIcon,
  customIcon = DollarInputIcon,
  customIconPosition = 'left',
  ...props
}) => <Input iconName="ic_dollar" {...props} />;

const InputCurrency: React.FC<Props> = ({
  unFixedDecimalScale = false,
  name,
  value,
  className,
  style,
  customIcon,
  showCustomIcon,
  customIconPosition,
  prefix = '$',
  suffix,
  decimalScale = 2,
  thousandSeparator = true,
  disabled,
  defaultValue,
  onChange,
  ...props
}) => {
  const handleChange = (values) => {
    const { floatValue } = values;
    const returnValue = floatValue ? floatValue : floatValue === 0 ? 0 : null;
    onChange && onChange(name, returnValue);
  };
  return (
    <CurrencyFormat
      className={className}
      style={style}
      thousandSeparator={thousandSeparator}
      fixedDecimalScale={!unFixedDecimalScale}
      decimalScale={decimalScale}
      displayType="input"
      prefix={prefix}
      suffix={suffix}
      name={name}
      customInput={CustomInput}
      disabled={disabled}
      onValueChange={handleChange}
      {...(value && {
        value: typeof value === 'string' ? value : MoneyInputDetect(value),
      })}
      {...(defaultValue && {
        value: typeof defaultValue === 'string' ? defaultValue : MoneyInputDetect(defaultValue),
      })}
      {...props}
    />
  );
};
type Props = Omit<CurrencyFormat.Props, 'InputProps'> & { InputProps?: InputProps } & {
  unFixedDecimalScale?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  customIcon?: React.ReactElement;
  showCustomIcon?: boolean;
  customIconPosition?: 'left' | 'right';
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  thousandSeparator?: string | boolean;
  disabled?: boolean;
  onChange?: Callback;
};

export default InputCurrency;
