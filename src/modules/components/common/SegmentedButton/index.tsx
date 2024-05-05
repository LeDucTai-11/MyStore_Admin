import styled from '@emotion/styled';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';
import { ReactNode } from 'react';
import Element from '../Element';
import { COLOR_CODE } from '@components/configs';

type ToggleButtonGroupItem = {
  id: string;
  label: ReactNode;
  value: any;
  disabled?: boolean;
};

type Props = ToggleButtonGroupProps & {
  value: any;
  items: ToggleButtonGroupItem[];
  onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  required?: boolean;
  label?: ReactNode;
  errorMessage?: string;
};

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  padding: 4,
  backgroundColor: COLOR_CODE.GREY_50,
  borderRadius: 20,
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    border: 20,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: 4,
    },
    '&:first-of-type': {
      borderRadius: 4,
    },
  },
});

const StyledToggleButton = styled(ToggleButton)({
  backgroundColor: COLOR_CODE.GREY_50,
  borderRadius: '18px !important',
  color: COLOR_CODE.GREY_800,
  '&.Mui-selected': {
    backgroundColor: COLOR_CODE.WHITE,
    boxShadow: '0px 1px 1px 0px #00000014',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: COLOR_CODE.WHITE,
    },
  },
});

const SegmentedButton = ({
  value,
  onChange,
  items = [],
  label,
  required,
  errorMessage,
  ...props
}: Props) => (
  <Element label={label} required={required} errorMessage={errorMessage}>
    <StyledToggleButtonGroup exclusive value={value} onChange={onChange} size="small" {...props}>
      {items.map(({ id, label, value, disabled }) => (
        <StyledToggleButton key={id} value={value} disabled={disabled}>
          {label}
        </StyledToggleButton>
      ))}
    </StyledToggleButtonGroup>
  </Element>
);

export default SegmentedButton;
