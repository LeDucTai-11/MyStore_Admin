import { isEmpty } from '@shared';
import {
  IconButton,
  InputAdornment,
  InputBaseComponentProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  alpha,
} from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';
import { Callback } from '@shared';
import React, { MouseEventHandler, RefObject } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { COLOR_CODE, theme } from '@components/configs';

const MuiTextField: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  inputRef = null,
  icon,
  onIconClick,
  loading,
  isPassword,
  defaultValue,
  helperText,
  color = 'primary',
  disabled,
  fullWidth,
  multiline,
  onChange,
  id,
  required,
  minRows,
  maxRows,
  inputProps,
  InputProps,
  iconPosition = 'end',
  onKeyDown,
  value = '',
  placeholder,
  variant = 'outlined',
  readOnly,
  iconType = 'button',
  type = 'text',
  isSmallSize,
  ...props
}) => {
  const hasLabel = !!label;

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Stack gap={1}>
      {hasLabel && (
        <Typography variant="h5" color={COLOR_CODE.GREY_700}>
          {label} {required && <span className="text-red-500 font-bold text-md">*</span>}
        </Typography>
      )}
      <TextField
        {...props}
        id={id}
        value={value}
        placeholder={placeholder}
        variant={variant}
        color={color}
        type={isPassword && showPassword ? 'text' : isPassword && !showPassword ? 'password' : type}
        error={!(errorMessage === ' ' || isEmpty(errorMessage))}
        helperText={errorMessage || (!isEmpty(helperText) ? helperText : '')}
        defaultValue={defaultValue}
        ref={inputRef}
        classes={{ root: className || undefined }}
        disabled={disabled}
        fullWidth={fullWidth}
        multiline={multiline}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        minRows={minRows}
        maxRows={maxRows}
        inputProps={inputProps}
        InputProps={{
          sx: {
            background: 'rgb(255, 255, 255)',
            borderRadius: 2,
          },
          ...(!isEmpty(InputProps) && {
            ...InputProps,
          }),
          ...(readOnly && {
            readOnly,
          }),
          ...(iconPosition === 'end'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    {isPassword && (
                      <IconButton
                        aria-label="toggle-password"
                        id="toggle-password"
                        onClick={() => setShowPassword((prevState) => !prevState)}
                        edge="end"
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </IconButton>
                    )}
                    {!isPassword && icon && iconType === 'button' ? (
                      <IconButton onClick={onIconClick} edge="end">
                        {icon}
                      </IconButton>
                    ) : (
                      icon
                    )}
                  </InputAdornment>
                ),
              }
            : {
                startAdornment: (
                  <InputAdornment position="start">
                    {!isPassword && icon && iconType === 'button' ? (
                      <IconButton onClick={onIconClick} edge="end">
                        {icon}
                      </IconButton>
                    ) : (
                      icon
                    )}
                  </InputAdornment>
                ),
              }),
        }}
        sx={{
          '& .MuiOutlinedInput': {
            '&-root': {
              minHeight: '40px',
              fontSize: '14px',
              color: COLOR_CODE.GREY_700,
              '& fieldset': {
                borderRadius: '8px',
                border: `1.5px solid ${COLOR_CODE.GREY_300}`,
                transition: theme.transitions.create(['border-color', 'box-shadow']),
              },
              '&:hover fieldset': {
                borderColor: COLOR_CODE.GREY_500,
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderColor: COLOR_CODE.PRIMARY_400,
                  boxShadow: `0 0 0 2.5px ${COLOR_CODE.PRIMARY_300}`,
                },
              },
              '&.Mui-error': {
                '& fieldset': {
                  borderColor: COLOR_CODE.RED_400,
                  boxShadow: `0 0 0 2.5px ${alpha(COLOR_CODE.RED_400, 0.25)}`,
                },
              },
              '&.Mui-disabled': {
                '& fieldset': {
                  borderColor: COLOR_CODE.GREY_300,
                },
                backgroundColor: alpha(COLOR_CODE.GREY_100, 0.75),
              },
            },
          },
        }}
      />
    </Stack>
  );
};

type BaseInputProps = Pick<TextFieldProps, Exclude<keyof TextFieldProps, 'label'>>;
export type InputProps = MUIStyledCommonProps &
  BaseInputProps & {
    errorMessage?: string;
    inputRef?: RefObject<HTMLInputElement>;
    icon?: React.ReactNode;
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    isPassword?: boolean;
    loading?: boolean;
    defaultValue?: string | React.ReactNode;
    helperText?: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;
    fullWidth?: boolean;
    multiline?: boolean;
    id?: boolean;
    onChange?: Callback;
    required?: boolean;
    minRows?: number | string;
    maxRows?: number | string;
    inputProps?: InputBaseComponentProps;
    iconPosition?: 'start' | 'end';
    iconType?: 'button' | 'normal';
    onKeyDown?: Callback;
    value?: unknown;
    placeholder?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    InputProps?: Partial<any>;
    readOnly?: boolean;
    type?: string;
    isSmallSize?: boolean;
  };

export default MuiTextField;
