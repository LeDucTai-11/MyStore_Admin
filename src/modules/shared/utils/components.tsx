import { Box } from '@mui/material';
import { COLOR_CODE } from 'src/modules/components';

export const BoxTableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      bgcolor: COLOR_CODE.WHITE,
      p: 2,
      mt: 1,
      border: `${COLOR_CODE.GREY_100}`,
      borderRadius: 1,
    }}
  >
    {children}
  </Box>
);
