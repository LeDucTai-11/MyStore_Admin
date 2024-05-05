import cn from 'classnames';
import { useRef } from 'react';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import { COLOR_CODE } from '@components';
import './styles.scss';
import { getRandomId, isEmpty } from '@shared';
import { Typography } from '@mui/material';
import CustomControl from './CustomControl';

const SelectCmp = ({
  options,
  onChange,
  label = '',
  className = '',
  value,
  defaultValue = '',
  errorMessage = '',
  placeholder = 'Select',
  containerClassName = '',
  onBlur = (...args) => {},
  name = '',
  isClearable = true,
  multi = false,
  disabled = false,
  isTextfieldStyle = false,
  readOnly = false,
  isLoading = false,
  required = false,
  formatOptionLabel = null,
  hideSelectedOptions = false,
  styles = null,
  icon = null,
  alignEnd = false,
  ...props
}) => {
  const id = useRef(`select-${getRandomId()}`);
  const handleChange = (selectedOption) => {
    const value = selectedOption?.value === false ? false : selectedOption?.value || null;
    onChange(name, multi ? selectedOption : value);
  };

  const handleSelectBlur = (event) => {
    onBlur && onBlur(name, true);
  };
  const hasError = !isEmpty(errorMessage);

  const selectedOption = multi ? value : options?.find((option) => option.value === value) || null;
  // For custom select, follow this link:
  // https://react-select.com/styles#using-classnames

  const customStyles = styles ?? {
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: isFocused
        ? COLOR_CODE.PRIMARY_500
        : isSelected
        ? COLOR_CODE.PRIMARY_500
        : COLOR_CODE.BLACK,
      fontWeight: isSelected ? 600 : 400,
      backgroundColor: isSelected
        ? COLOR_CODE.PRIMARY_300
        : isFocused
        ? COLOR_CODE.GREY_50
        : COLOR_CODE.WHITE,
    }),
  };

  return (
    <Stack>
      <Select
        id={id.current}
        isClearable={isClearable}
        value={selectedOption}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        className={cn('cmp-select', className, {
          'cmp-select--error': hasError,
          'cmp-select__icon': icon !== null,
          'cmp-select--end': alignEnd,
        })}
        classNamePrefix="cmp-select"
        menuPlacement="auto"
        onBlur={handleSelectBlur}
        isSearchable={!readOnly}
        name={name}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: `${COLOR_CODE.PRIMARY_400}`,
            neutral20: hasError ? '#c60000' : 'hsl(0, 0%, 80%)',
            primary50: COLOR_CODE.PRIMARY_500,
          },
        })}
        styles={customStyles}
        {...props}
        isDisabled={disabled}
        isMulti={multi}
        isLoading={isLoading}
        formatOptionLabel={formatOptionLabel}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={!multi}
        components={{ Control: (props) => <CustomControl icon={icon} {...props} /> }}
      />
      {!isEmpty(errorMessage) && (
        <Typography color={COLOR_CODE.DANGER} fontSize={14} mt={'6px'}>
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

export default SelectCmp;
