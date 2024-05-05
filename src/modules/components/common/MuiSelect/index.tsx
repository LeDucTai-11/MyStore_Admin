/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, AutocompleteProps } from '@mui/material';
import { useMemo } from 'react';
import { LazyCheckPoint, MuiInput } from '..';
import { Callback } from '@shared';

const MuiAutoCompleteCmp: React.FC<MuiAutoCompleteProps> = ({
  options,
  label,
  errorMessage = '',
  required = false,
  isLoading = false,
  onChange = (..._args: any[]) => {},
  value,
  limitRender,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  name,
  popupIcon,
  isGetOptionOnChange = false,
  onFetchNextPage,
  allowLazyLoad,
  placeholder,
  disabled,
  error,
  ...props
}) => {
  const handleChange = (_: unknown, value: SelectOption) =>
    onChange(name, isGetOptionOnChange ? value : value?.value);
  const selectedValue = useMemo(
    () => (value ? options.find((i) => i.value === value) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  return (
    <Autocomplete
      limitTags={limitRender}
      onChange={handleChange}
      options={options}
      renderInput={({ ...params }) => (
        <MuiInput
          {...params}
          {...{
            label,
            required,
            errorMessage,
            placeholder,
            infoToolTipWithArrow,
            infoTooltipMessage,
            infoTooltipPlacement,
            name,
            error: error || !!errorMessage,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      loading={isLoading}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderWidth: 1,
          },
        },
        '& .MuiPaper-root': {
          display: disabled ? 'none' : 'block',
        },
        '& .MuiAutocomplete-endAdornment': {
          button: {
            transform: popupIcon ? 'none' : undefined,
          },
        },
        '& .MuiOutlinedInput-notchedOutline,fieldset': { border: disabled ? 0 : null },
      }}
      isOptionEqualToValue={(option, _option) =>
        (option?.value ?? null) === (_option?.value ?? null)
      }
      value={selectedValue}
      popupIcon={popupIcon}
      renderOption={(props, option) => {
        if (allowLazyLoad && options.at(options.length - 1)?.value === option?.value) {
          return (
            <LazyCheckPoint onFirstEnter={onFetchNextPage} key={option.value}>
              <li {...props} key={option.value}>
                {option.label}
              </li>
            </LazyCheckPoint>
          );
        }

        return (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        );
      }}
      disabled={disabled}
      open={disabled ? false : undefined}
      {...props}
    />
  );
};

type BaseInputProps = Pick<
  AutocompleteProps<any, boolean | undefined, boolean | undefined, undefined>,
  Exclude<
    keyof AutocompleteProps<any, boolean | undefined, boolean | undefined, undefined>,
    'label' | 'renderInput' | 'options' | 'value' | 'multiple'
  >
>;
export interface SelectOption {
  label?: string | React.ReactNode;
  value: any;
  prefix?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  key?: any;
}
export type MuiAutoCompleteProps = Omit<BaseInputProps, 'onBlur' | 'onChange'> & {
  options?: SelectOption[];
  label?: string | React.ReactNode;
  className?: string;
  value?: any;
  errorMessage?: string;
  placeholder?: string;
  containerClassName?: string;
  name?: string;
  required?: boolean;
  isLoading?: boolean;
  isClickable?: boolean;
  onChange?: Callback;
  onBlur?: Callback;
  onInputChange?: Callback;
  limitRender?: number;
  infoTooltipMessage?: string;
  infoTooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  infoToolTipWithArrow?: boolean;
  isGetOptionOnChange?: boolean;
  allowLazyLoad?: boolean;
  onFetchNextPage?: Callback;
  error?: boolean;
};

export default MuiAutoCompleteCmp;
