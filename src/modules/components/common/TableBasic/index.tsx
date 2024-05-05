/* eslint-disable react/no-unstable-nested-components */
import { Stack } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
} from 'mui-datatables';
import React, { memo, useMemo } from 'react';
import CustomFooterRender from './customFooterRender';
import CustomSearchRender from './customSearchRender';
import { COLOR_CODE, Loading } from '@components';

const TableBasic: React.FC<Props> = ({
  isLoading,
  containerClassName,
  onTableChange,
  options,
  emptyComponent = 'No data',
  data,
  locationSearch,
  addRowButton,
  recordName,
  ...props
}) => {
  const tableOptions: MUIDataTableOptions = {
    serverSide: true,
    searchOpen: false,
    search: true,
    download: false,
    filter: true,
    print: false,
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading ? <Loading variant="primary" /> : emptyComponent,
      },
    },
    jumpToPage: false,
    rowHover: true,
    onTableChange,
    customSearchRender: (searchText: string, handleSearch: (_text: string) => void) => (
      <CustomSearchRender
        searchText={searchText}
        onSearch={handleSearch}
        placeholder={options.searchPlaceholder}
      />
    ),
    customFooter: (
      count: number,
      page: number,
      rowsPerPage: number,
      changeRowsPerPage: (_page: string | number) => void,
      changePage: (_newPage: number) => void,
    ) => (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {data.length ? (
          <CustomFooterRender
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            theme={getMuiTheme()}
            addRowButton={addRowButton}
            recordName={recordName}
          />
        ) : null}
      </>
    ),

    ...options,
  };

  const hasRowClickAction = !!options?.onRowClick;
  const getMuiTheme = () =>
    createTheme({
      primary: {
        main: COLOR_CODE.PRIMARY,
        dark: COLOR_CODE.PRIMARY_600,
        light: COLOR_CODE.PRIMARY_200,
      },
      secondary: {
        main: COLOR_CODE.SECONDARY,
      },
      typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiTableSortLabel: {
          styleOverrides: {
            icon: {
              display: 'inline-block',
            },
          },
          defaultProps: {
            hideSortIcon: false,
          },
        },

        MUIDataTable: {
          styleOverrides: {
            elevation4: {
              boxShadow: 'none',
            },
            responsiveBase: {
              border: `1px solid ${COLOR_CODE.GREY_200}`,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              overflow: 'unset',
            },
          },
        },

        MuiPaper: {
          styleOverrides: {
            elevation4: {
              boxShadow: 'none',
            },
            root: {
              backgroundColor: 'transparent',
            },
          },
        },

        MuiTableRow: {
          styleOverrides: {
            hover: {
              cursor: hasRowClickAction ? 'pointer' : 'default',
            },
            root: {
              backgroundColor: COLOR_CODE.WHITE,
              '&.MuiTableRow-hover:hover': {
                backgroundColor: COLOR_CODE.PRIMARY_100,
              },
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: '6px',
            },
            body: {
              color: COLOR_CODE.GREY_700,
              cursor: hasRowClickAction ? 'pointer' : 'default',
              fontSize: 14,
              borderTop: `1px solid ${COLOR_CODE.GREY_200}`,
              padding: '16px 24px',
            },
            head: {
              '&.MuiTableCell-root': {
                backgroundColor: COLOR_CODE.GREY_50,
                color: COLOR_CODE.GREY_800,
                fontWeight: 'bold',
                padding: '16px 24px',
                borderBottom: 'none',
              },
              '&.MuiTableCell-root:first-of-type': {
                borderTopLeftRadius: '8px',
              },
              '&.MuiTableCell-root:last-of-type': {
                borderTopRightRadius: '8px',
              },
              '&.MuiTableCell-root span button': {
                color: COLOR_CODE.GREY_800,
                fontWeight: 'bold',
              },
              '&.MuiTableCell-root span button div, &.MuiTableCell-root span button div span svg': {
                color: `${COLOR_CODE.GREY_900} !important`,
                fontWeight: 'bold',
                fontSize: '14px',
              },
              button: {
                fontSize: 16,
              },
              div: {
                fontSize: 14,
              },
            },
            footer: {
              '&.MuiTableCell-root': {
                padding: '16px 24px',
                border: `1px solid ${COLOR_CODE.GREY_200}`,
                borderTop: 'none',
                // borderBottom: 'none',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
                backgroundColor: COLOR_CODE.WHITE,
              },
            },
          },
        },

        MuiTableBody: {
          styleOverrides: {
            root: {
              opacity: isLoading ? 0.3 : 1,
            },
          },
        },

        MUIDataTableBodyRow: {
          styleOverrides: {
            root: {
              backgroundColor: 'white',
              // 'td:first-child': {
              //   borderTopLeftRadius: 16,
              //   borderBottomLeftRadius: 16,
              // },
              // 'td:last-child': {
              //   borderTopRightRadius: 16,
              //   borderBottomRightRadius: 16,
              // },
            },
          },
        },

        MUIDataTableFilterList: {
          styleOverrides: {
            root: {
              margin: '0px !important',
              marginBottom: '16px !important',
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              padding: '0 0px !important',
            },
          },
        },
        MUIDataTableToolbar: {
          styleOverrides: {
            filterPaper: {
              minHeight: '344px !important',
            },
          },
        },
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              span: {
                wordBreak: 'break-word',
              },
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            data: {
              textAlign: 'left',
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              color: COLOR_CODE.GREY_700,
            },
            h1: {
              fontSize: 32,
              fontWeight: 600,
            },
            h2: {
              fontSize: 26,
              fontWeight: 500,
            },
            h3: {
              fontSize: 20,
              fontWeight: 500,
            },
            h4: {
              fontSize: 18,
              fontWeight: 500,
            },
            h5: {
              fontSize: 16,
              fontWeight: 600,
            },
            h6: {
              fontSize: 14,
              fontWeight: 500,
            },
            body1: {
              fontSize: 16,
            },
            body2: {
              fontSize: 14,
            },
            subtitle1: {
              // type: small || body3 in Figma
              fontSize: 12,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: 'capitalize',
              padding: '10px 14px',
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '0.07px',
            },
            outlinedInherit: {
              border: `1px solid ${COLOR_CODE.GREY_200}`,
              fontWeight: 500,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 18,
              color: COLOR_CODE.GREY_600,
              backgroundColor: COLOR_CODE.GREY_100,
            },
            colorPrimary: {
              color: COLOR_CODE.PRIMARY_500,
              backgroundColor: COLOR_CODE.PRIMARY_300,
            },
            colorSecondary: {
              color: COLOR_CODE.SECONDARY_600,
              backgroundColor: COLOR_CODE.SECONDARY_300,
            },
            colorSuccess: {
              color: COLOR_CODE.SUCCESS,
              backgroundColor: COLOR_CODE.SUCCESS_BG,
            },
            colorWarning: {
              color: COLOR_CODE.WARNING,
              backgroundColor: COLOR_CODE.WARNING_BG,
            },
            colorError: {
              color: COLOR_CODE.DANGER,
              backgroundColor: COLOR_CODE.DANGER_BG,
            },
            colorInfo: {
              color: '#713ABE',
              backgroundColor: '#F1EAFF',
            },
          },
        },
      },
    } as ThemeOptions);

  const muiDataTable = useMemo(
    () => <MUIDataTable options={tableOptions} data={data} {...props} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, isLoading, locationSearch],
  );

  // More info: https://github.com/gregnb/mui-datatables
  return (
    <Stack>
      <ThemeProvider theme={getMuiTheme()}>
        {muiDataTable}
        {/* <MUIDataTable options={tableOptions} {...props} /> */}
      </ThemeProvider>
    </Stack>
  );
};

type Props = MUIDataTableProps & {
  containerClassName?: string;
  currentPage?: number;
  total?: number;
  onTableChange: (_action: string, _tableState: MUIDataTableState) => void;
  isLoading?: boolean;
  emptyComponent?: React.ReactNode;
  locationSearch: string;
  addRowButton?: React.ReactElement;
  recordName?: string;
};

export default memo(TableBasic);
