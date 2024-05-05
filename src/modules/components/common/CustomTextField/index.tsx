import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { COLOR_CODE } from '@components/configs';
import './styles.scss';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput': {
    '&-root': {
      '& fieldset': {
        borderRadius: '6px',
        border: `1.5px solid ${COLOR_CODE.GREY_300}`,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
      },
      '& input': {
        fontSize: '14px',
        color: COLOR_CODE.GREY_700,
      },
      '&:hover fieldset': {
        borderColor: COLOR_CODE.GREY_500,
      },
      '&.Mui-focused': {
        '& fieldset': {
          borderColor: COLOR_CODE.PRIMARY_400,
          boxShadow: `${alpha(COLOR_CODE.PRIMARY_400, 0.25)} 0 0 0 2.5px`,
        },
      },
      '&.Mui-error': {
        '& fieldset': {
          borderColor: COLOR_CODE.RED_400,
          boxShadow: `${alpha(COLOR_CODE.RED_400, 0.25)} 0 0 0 2.5px`,
        },
      },
    },
  },
}));

const CustomTextField: React.FC<CustomTextFieldProps> = ({ size, ...props }) => {
  return (
    <StyledTextField
      size={size}
      {...props}
      className={`custom-text-field${size === 'medium' ? '--medium' : '--small'}`}
    />
  );
};

export type CustomTextFieldProps = TextFieldProps & {
  size: string;
};

export default CustomTextField;
