/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, AutocompleteProps, Checkbox } from '@mui/material';
import { MuiInput } from '..';
import LazyCheckPoint from '../LazyCheckPoint';
import { Callback } from '@shared';

const MuiMultiSelect: React.FC<MuiAutoCompleteProps> = ({
  options,
  label,
  name,
  errorMessage = '',
  required = false,
  isLoading = false,
  onChange = (..._args: any[]) => {},
  limitRender,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  showCheckbox = false,
  value,
  isGetOptionOnChange,
  popupIcon,
  allowLazyLoad,
  placeholder,
  onFetchNextPage,
  disabled,
  ...props
}) => {
  const selectedOptions = options?.filter((option) => value?.includes(option.value)) || null;

  const handleChange = (_e: React.SyntheticEvent<Element, Event>, selectedOptions: any) => {
    const selectedOptionValues = isGetOptionOnChange
      ? selectedOptions
      : selectedOptions.map((option: any) => option.value);
    onChange(name, selectedOptionValues || null);
  };

  return (
    <Autocomplete
      limitTags={limitRender}
      disabled={disabled}
      options={options}
      multiple
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      value={selectedOptions}
      renderInput={({ ...params }) => (
        <MuiInput
          {...params}
          {...{
            label,
            errorMessage,
            required,
            infoToolTipWithArrow,
            infoTooltipMessage,
            infoTooltipPlacement,
            placeholder,
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
      }}
      ListboxProps={{
        style: {
          backgroundColor: 'white',
        },
      }}
      isOptionEqualToValue={({ value }, { value: _value }) => value === _value}
      renderOption={(props, option, { selected }) => {
        if (allowLazyLoad && options.at(options.length - 1)?.value === option?.value) {
          return (
            <LazyCheckPoint onFirstEnter={onFetchNextPage} key={option.value}>
              <li {...props} key={option.value}>
                {showCheckbox && (
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                )}
                {option.label}
              </li>
            </LazyCheckPoint>
          );
        }

        return (
          <li {...props} key={option.value}>
            {showCheckbox && (
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            {option.label}
          </li>
        );
      }}
      popupIcon={popupIcon}
      open={disabled ? false : undefined}
      {...props}
    />
  );
};

type BaseInputProps = Pick<
  AutocompleteProps<any, true | undefined, boolean | undefined, undefined>,
  Exclude<
    keyof AutocompleteProps<any, true | undefined, boolean | undefined, undefined>,
    'label' | 'renderInput' | 'options' | 'multiple' | 'value'
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
  value?: any[];
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
  showCheckbox?: boolean;
  isGetOptionOnChange?: boolean;
  allowLazyLoad?: boolean;
  onFetchNextPage?: Callback;
};

export default MuiMultiSelect;
