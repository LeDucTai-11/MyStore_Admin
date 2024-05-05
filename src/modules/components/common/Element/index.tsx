import cn from 'classnames';
import React from 'react';

import { Stack, StackProps, Tooltip, Typography } from '@mui/material';
import { IoInformationCircle } from 'react-icons/io5';
import { isEmpty } from 'src/modules/shared';
import { COLOR_CODE } from '../../configs';

export const ElementLabel: React.FC<LabelProps> = ({
  infoToolTipWithArrow,
  infoTooltipMessage,
  infoTooltipPlacement,
  label,
  required,
}) => (
  <Typography
    variant="body1"
    sx={{
      height: 20,
      marginBottom: 1,
      fontWeight: 600,
      color: COLOR_CODE.GREY_700,
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
              size={16}
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
);

const Element: React.FC<Props> = ({
  children,
  errorMessage,
  label,
  className,
  subLabel,
  required,
  infoTooltipMessage = '',
  infoTooltipPlacement = 'right',
  infoToolTipWithArrow = true,
  ...props
}) => {
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);

  return (
    <Stack className={cn(className, 'form-element')} {...props}>
      {hasLabel && (
        <ElementLabel
          {...{ label, infoTooltipMessage, infoTooltipPlacement, infoToolTipWithArrow, required }}
        />
      )}

      {hasSubLabel && subLabel}
      {children}
      {hasError && (
        <Typography
          variant="h6"
          color="error"
          mt="6px"
          classes={{
            root: 'mt-1',
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};

type LabelProps = {
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
};

type Props = StackProps &
  LabelProps & {
    children: React.ReactNode;
    id?: string;
    errorMessage?: string;
    className?: string;
    subLabel?: string | React.ReactNode;
  };

export default Element;
