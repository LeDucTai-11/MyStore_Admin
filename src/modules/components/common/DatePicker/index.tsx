import { IRootState } from '@redux/rootReducer';
import cn from 'classnames';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import Element from '../Element';
import './styles.scss';
import { Callback, getRandomId, isEmpty } from '@shared';

const DateSelector: React.FC<Props> = ({
  label,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  placeholder = 'YYYY/MM/DD',
  dateFormat = 'yyyy/MM/dd',
  mask = '9999/99/99',
  name,
  isTextfieldStyle = false,
  isSmallSize = false,
  onBlur = () => {},
  valueType = 'date',
  required,
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);

  // For more information:
  // https://reactdatepicker.com/
  const handleChange = (value: Date) => {
    if (!value) {
      onChange(name, '');
    } else {
      if (valueType === 'date') {
        onChange(name, value);
      } else if (valueType === 'dayjs') {
        onChange(name, dayjs(value));
      }
    }
  };

  const handleBlur = () => {
    onBlur(name, true);
  };

  const hasError = !isEmpty(errorMessage);
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={cn('cmp-datepicker', containerClassName)}
      required={required}
    >
      <DatePicker
        id={id.current}
        onChange={handleChange}
        placeholderText={placeholder}
        className={cn(
          'cmp-datepicker__input',
          { 'cmp-datepicker__input--error': hasError },
          isSmallSize && 'cmp-datepicker__input--size-small',
          classNames,
        )}
        showPopperArrow={false}
        dateFormat={dateFormat}
        onBlur={handleBlur}
        {...(!isEmpty(mask) && {
          customInput: <InputMask mask={mask} />,
        })}
        name={name}
        {...props}
      />
    </Element>
  );
};

type BaseDatePickerProps = Pick<
  ReactDatePickerProps,
  Exclude<keyof ReactDatePickerProps, 'onChange' | 'onBlur'>
>;

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseDatePickerProps & {
    errorMessage?: string;
    containerClassName?: string;
    classNames?: string;
    placeholder?: string;
    mask?: string;
    label?: string | React.ReactNode;
    onChange: Callback;
    onBlur?: Callback;
    dateFormat?: string;
    isTextfieldStyle?: boolean;
    isSmallSize?: boolean;
    valueType?: 'date' | 'dayjs';
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
