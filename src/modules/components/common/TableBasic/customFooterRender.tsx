import { COLOR_CODE } from '@components';
import {
  Pagination,
  Stack,
  TableCell,
  TableFooter,
  TableRow,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useMemo } from 'react';

const clsPrefix = 'custom-footer-table';
const CustomFooterRender: React.FC<Props> = ({
  count,
  page,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  theme,
  addRowButton,
  recordName = 'items',
}) => {
  const isTabletScreen = useMediaQuery('(max-width:840px)');

  const range = useMemo(() => {
    const end = (page + 1) * rowsPerPage;
    const start = end - (rowsPerPage - 1);
    if (count < end) return `${start}-${count}`;
    return `${start} - ${end}`;
  }, [count, page, rowsPerPage]);

  const handleChangePage = (event: object, value: number) => {
    const skip = value > 0 ? value - 1 : value;
    changePage(skip);
  };

  return (
    <ThemeProvider theme={theme}>
      <TableFooter>
        <TableRow>
          <TableCell>
            {addRowButton}
            <Stack alignItems="center" justifyContent="space-between" direction="row" height="100%">
              <Stack width="100%">
                {count ? (
                  <Typography fontSize={14} className="fw-medium text-color-grey-600">
                    Showing {range} of {count} {recordName}
                  </Typography>
                ) : (
                  <Stack />
                )}
              </Stack>
              <Stack direction="row" alignContent="center" width="100%" justifyContent="end">
                <Stack
                  {...(isTabletScreen && {
                    fullWidth: true,
                    justify: 'center',
                  })}
                  style={{ marginTop: '4px' }}
                >
                  <Pagination
                    count={count > 0 ? Math.ceil(count / rowsPerPage) : 1}
                    page={page + 1}
                    shape="rounded"
                    size="small"
                    variant="outlined"
                    onChange={handleChangePage}
                    classes={{
                      root: `${clsPrefix}-pagination`,
                    }}
                    sx={{
                      button: {
                        backgroundColor: COLOR_CODE.GREY_100,
                        border: 'none',
                        '&.Mui-selected': {
                          color: COLOR_CODE.WHITE,
                          backgroundColor: COLOR_CODE.PRIMARY,
                        },
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
        </TableRow>
      </TableFooter>
    </ThemeProvider>
  );
};

type Props = {
  count: number;
  page: number;
  rowsPerPage: number;
  changeRowsPerPage: (_page: string | number) => void;
  changePage: (_newPage: number) => void;
  addRowButton?: React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
  recordName?: string;
};

export default CustomFooterRender;
