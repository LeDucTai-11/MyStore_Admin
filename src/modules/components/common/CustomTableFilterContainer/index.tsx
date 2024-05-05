import { Badge, Button, Popover, ThemeProvider, Tooltip } from '@mui/material';
import React, { Attributes, PropsWithChildren } from 'react';
import { BsFilter } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { COLOR_CODE, theme } from '../../configs';

type Props = {
  filterParamsKeys?: string[];
};

const CustomSearchEncounters: React.FC<PropsWithChildren<Props>> = ({
  children,
  filterParamsKeys = [],
}) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const isHasFilterParams = filterParamsKeys.some((s) => query.has(s));

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Tooltip placement="top" arrow title="Filters">
        <Button
          aria-describedby={id}
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{
            fontSize: 24,
            fontWeight: 600,
            textTransform: 'none',
            p: 1,
            minWidth: '36px',
            width: '40px',
          }}
        >
          <Badge variant="dot" color="error" invisible={!isHasFilterParams} sx={{ mr: '2px' }}>
            <BsFilter color={COLOR_CODE.WHITE} />
          </Badge>
        </Button>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { backgroundColor: 'white', borderRadius: 2 },
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              handleClosePopup: handleClose,
            } as Attributes);
          }
          return child;
        })}
      </Popover>
    </ThemeProvider>
  );
};

export default CustomSearchEncounters;
