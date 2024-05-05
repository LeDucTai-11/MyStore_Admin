import { Chip } from '@mui/material';
import { VoucherStatus } from '@queries';
import { getTitleCase } from '@shared';

export const renderVoucherStatus = (status: string) => {
  switch (status) {
    case VoucherStatus.VALID:
      return <Chip color="success" label={getTitleCase(status)} />;
    case VoucherStatus.INVALID:
      return <Chip label={getTitleCase(status)} />;
  }
};
