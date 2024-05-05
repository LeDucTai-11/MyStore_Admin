import React from 'react';
import { COLOR_CODE } from '../configs';
import DropdownContainer from './DropdownContainer';
import './styles.scss';
import { Stack, Typography } from '@mui/material';
import { DropdownItem } from './types';

const CustomDropdown: React.FC<Props> = ({ items, color, ...props }) => (
  <DropdownContainer items={items} {...props}>
    {items.map((item, idx) => (
      <Stack
        key={`dropdown__item--${idx}`}
        gap={1}
        flexDirection={'row'}
        sx={{
          '&:hover': {
            bgcolor: COLOR_CODE.GREY_100,
          },
        }}
      >
        {item.icon}
        <Typography
          variant="h6"
          style={{ color: color && color === COLOR_CODE.PRIMARY ? COLOR_CODE.GREY_800 : '' }}
        >
          {item.label}
        </Typography>
      </Stack>
    ))}
  </DropdownContainer>
);

type Props = {
  flexPosition?: 'flex-start' | 'flex-end';
  labelClassName?: string;
  label: React.ReactNode;
  items: DropdownItem[];
  xPosition?: 'left' | 'right';
  yPosition?: 'top' | 'bottom';
  color?: string;
  icon?: React.ReactElement;
};

export default CustomDropdown;
