import { TextField, TextFieldProps, Tooltip, Typography } from '@mui/material';
import React, { RefObject } from 'react';
import { IoInformationCircle } from 'react-icons/io5';
import { isEmpty } from 'src/modules/shared';
import { COLOR_CODE, theme } from '../../configs';

export const InputLabel: React.FC<
  Pick<
    MuiInputProps,
    'label' | 'required' | 'infoTooltipMessage' | 'infoToolTipWithArrow' | 'infoTooltipPlacement'
  >
> = ({ label, infoToolTipWithArrow, infoTooltipMessage, infoTooltipPlacement, required }) => {
  const hasLabel = !isEmpty(label);

  return (
    hasLabel && (
      <Typography
        mb={1}
        variant="h5"
        sx={{
          height: 20,
          color: COLOR_CODE.GREY_600,
        }}
      >
        {label} {required && <span className="text-red-500 font-bold text-md">*</span>}
        {infoTooltipMessage && (
          <span>
            <Tooltip
              arrow={infoToolTipWithArrow}
              title={<span style={{ whiteSpace: 'pre-line' }}>{infoTooltipMessage}</span>}
              placement={infoTooltipPlacement}
            >
              <i className="cursor-pointer ml-1">
                <IoInformationCircle
                  size={18}
                  color={COLOR_CODE.INFO}
                  style={{
                    transform: 'translateY(2px)',
                  }}
                />
              </i>
            </Tooltip>
          </span>
        )}
      </Typography>
    )
  );
};

const MuiInput: React.FC<MuiInputProps> = ({
  errorMessage,
  label,
  className,
  required,
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  sx = {},
  InputProps = {},
  readOnly,
  disabled,
  error,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);

  return (
    <TextField
      label={
        hasLabel ? (
          <InputLabel
            {...{ infoTooltipMessage, infoTooltipPlacement, infoToolTipWithArrow, label, required }}
          />
        ) : null
      }
      className={className}
      variant="outlined"
      disabled={disabled}
      error={hasError || error}
      helperText={errorMessage}
      size="small"
      sx={{
        borderRadius: 1,
        background: COLOR_CODE.WHITE,
        '& .MuiInputLabel-root': {
          position: 'relative',
          transform: 'none',
          marginBottom: '6px',
          fontSize: '14px',
          '&.Mui-focused': {
            color: COLOR_CODE.PRIMARY,
          },
          '&.Mui-disabled': {
            background: 'transparent',
          },
        },
        '& .MuiOutlinedInput-root': {
          fontSize: '14px',
          borderRadius: 2,
          '& fieldset': {
            borderRadius: '6px',
            border: `1.5px solid ${COLOR_CODE.GREY_300}`,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
          },
          '&:hover fieldset': {
            borderColor: COLOR_CODE.GREY_500,
          },
          '&.Mui-disabled': {
            backgroundColor: COLOR_CODE.GREY_100,
          },
          '&.Mui-focused fieldset': {
            borderColor: COLOR_CODE.PRIMARY_400,
            boxShadow: `0 0 0 2.5px ${COLOR_CODE.PRIMARY_300}`,
          },
          '&.MuiInputBase-hiddenLabel fieldset': {
            marginTop: '5px',
          },
          '& fieldset legend': {
            display: 'none', // hasLabel ? 'block' : 'none',
          },
          '& .MuiOutlinedInput-notchedOutline,fieldset': {
            border: disabled ? 0 : null,
            '&:hover': {
              borderColor: COLOR_CODE.PRIMARY,
            },
          },
        },
        '& .MuiInputBase-input.Mui-disabled': {
          WebkitTextFillColor: COLOR_CODE.GREY_800,
        },
        width: '100%',
        ...sx,
      }}
      FormHelperTextProps={{
        sx: {
          fontSize: 14,
          marginLeft: 0,
        },
      }}
      hiddenLabel
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{ ...InputProps, readOnly }}
      {...props}
    />
  );
};

type BaseInputProps = Pick<TextFieldProps, Exclude<keyof TextFieldProps, 'label'>>;
export type MuiInputProps = BaseInputProps & {
  errorMessage?: string;
  containerClassName?: string;
  inputRef?: RefObject<HTMLInputElement>;
  label?: string | React.ReactNode;
  required?: boolean;
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
  readOnly?: boolean;
  error?: boolean;
};

export default MuiInput;
