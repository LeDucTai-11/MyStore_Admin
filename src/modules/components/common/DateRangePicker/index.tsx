import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import dayjs from 'dayjs';
import Element from '../Element';
import './styles.scss';
import { getRandomId, isEmpty } from '@shared';

export type DateRange = [Date, Date];

const DateRangePicker: React.FC<Props> = ({
  label,
  name,
  onChange,
  errorMessage,
  containerClassName,
  classNames,
  isSmallSize = false,
  required = false,
  placeholder = 'MM/DD/YYYY - MM/DD/YYYY',
  dateFormat = 'MM/DD/YYYY',
  selecteds,
  ...props
}) => {
  const id = useRef<string>(`datepicker-${getRandomId()}`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<DateRange>(selecteds as DateRange);

  useEffect(() => {
    if (isEmpty(selecteds)) setDates(selecteds);
  }, [selecteds]);

  const handleDateChange = (dates: DateRange) => {
    setDates(dates);

    if (!!dates[0] && !!dates[1]) {
      setIsOpen(false);
      onChange(name, dates);
    }
  };

  const formatDates = (): string => {
    if (isEmpty(selecteds)) return '';

    return selecteds?.map((x) => dayjs(x).format(dateFormat as string)).join(' - ') || '';
  };

  const handleClickOutside = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpen(false);
  };

  // For more information:
  // https://reactdatepicker.com/

  const hasError = !isEmpty(errorMessage);
  const startDate = dates?.[0];
  const endDate = dates?.[1];
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
        onChange={handleDateChange}
        placeholderText={placeholder}
        className={cn(
          'cmp-datepicker__input',
          { 'cmp-datepicker__input--error': hasError },
          isSmallSize && 'size-small',
          classNames,
        )}
        showPopperArrow={false}
        {...props}
        name={name}
        value={formatDates()}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        open={isOpen}
        onInputClick={() => setIsOpen(true)}
        onClickOutside={handleClickOutside}
        popperProps={{
          positionFixed: true,
        }}
        portalId="root"
      />
    </Element>
  );
};

type Props = Omit<ReactDatePickerProps, 'onChange'> & {
  required?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  classNames?: string;
  placeholder?: string;
  label?: string;
  onChange?: (name: string, value: DateRange) => void;
  selecteds?: [Date, Date];
  isSmallSize?: boolean;
};

export default DateRangePicker;
