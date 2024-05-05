/* eslint-disable @typescript-eslint/no-explicit-any */
import { flatten } from 'lodash';
import {
  MUIDataTableColumn,
  MUIDataTableOptions,
  MUIDataTableState,
  MUISortOptions,
} from 'mui-datatables';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import appConfig from 'src/appConfig';
import { isEmpty } from 'src/modules/shared';
import TableBasic from '../TableBasic';

export enum TableQueryParams {
  _SEARCH = 'search',
  _ROWS_PER_PAGE = 'take',
  _PAGE = 'page',
  _SORT = 'sort',
  _FILTER = 'filter',
}

const getInitialTableState = (
  queryParams: URLSearchParams,
  defaultSortOrder?: MUISortOptions,
): Partial<MUIDataTableOptions> => {
  let sortOrder: MUISortOptions;
  if (queryParams?.get('sort')?.includes(':')) {
    const sortOrderSplit = queryParams?.get('sort')?.split(':');
    if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
      sortOrder = {
        name: sortOrderSplit[0],
        direction: sortOrderSplit[1] as MUISortOptions['direction'],
      };
    }
  } else {
    sortOrder = defaultSortOrder;
  }

  return {
    searchText: queryParams?.get('search')?.trim(),
    sortOrder,
    // rowsPerPageOptions: appConfig.ROWS_PER_PAGE_OPTIONS,
    rowsPerPage: queryParams?.has('rowsPerPage')
      ? Number(queryParams.get('rowsPerPage'))
      : appConfig.ROWS_PER_PAGE,
    page: queryParams?.has('page') ? Number(queryParams.get('page')) : 0,
  };
};

const getFilterParams = (filterList?: string[][], columns: MUIDataTableColumn[] = []) => {
  if (!filterList) return {};
  const params: any = {};

  filterList.forEach((filter: string[], idx: number) => {
    if (filter.length > 0) {
      const column = columns[idx];
      const name = column?.name;
      params[name] = filter;
    }
  });

  return params;
};
const getAdditionalParams = (filterList: string[], query: URLSearchParams) => {
  if (isEmpty(filterList)) return {};

  return filterList.reduce((state, key) => {
    const value = query.getAll(key);
    if (value) {
      return {
        ...state,
        [key]: value,
      };
    }
    return state;
  }, {});
};
const Table: React.FC<TableProps> = ({
  isLoading,
  title,
  data,
  tableOptions,
  columns,
  refresh = true,
  defaultSortOrder,
  emptyComponent,
  onAction,
  additionalFilterParams = [],
  filterSeparator = ',',
  addRowButton,
  recordName,
}) => {
  const history = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const tableStateRef = useRef<MUIDataTableState>();

  useEffect(() => {
    if (refresh) {
      handleTriggerAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, search]);

  const currentState: Partial<MUIDataTableOptions> = getInitialTableState(query, defaultSortOrder);

  const currentFilterList = query
    ?.getAll('filter')
    ?.map((f) => (f ? f.split(filterSeparator) : []));

  const getActionParams = useCallback(
    (
      currentState: Partial<MUIDataTableOptions>,
      currentFilterList: string[][],
      query: URLSearchParams,
    ) => {
      const rowsPerPage = currentState?.rowsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;

      const filterTableParams = getFilterParams(currentFilterList, columns);
      const additionalParams = getAdditionalParams(additionalFilterParams, query);

      let orderParam = null;
      if (!isEmpty(currentState?.sortOrder?.name) && !isEmpty(currentState?.sortOrder?.direction)) {
        orderParam = `${currentState?.sortOrder?.name}:${currentState?.sortOrder?.direction}`;
      }

      const params = {
        skip: page * rowsPerPage,
        take: rowsPerPage,
        order: orderParam,
        search: searchText,
        ...filterTableParams,
        ...additionalParams,
      };

      return params;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setQueryParams = useCallback((tableState: MUIDataTableState, query: URLSearchParams) => {
    if (tableState?.searchText) {
      // query.set(TableQueryParams._SEARCH, tableState.searchText);
    } else {
      query.delete(TableQueryParams._SEARCH);
    }

    if (tableState?.rowsPerPage) {
      const rowsPerPage = tableState.rowsPerPage.toString();
      query.set(TableQueryParams._ROWS_PER_PAGE, rowsPerPage);
    } else {
      query.delete(TableQueryParams._ROWS_PER_PAGE);
    }

    if (tableState?.page) {
      const page = tableState.page.toString();
      query.set(TableQueryParams._PAGE, page);
    } else {
      query.delete(TableQueryParams._PAGE);
    }

    if (tableState?.sortOrder.name && tableState?.sortOrder.direction) {
      const sort = `${tableState?.sortOrder.name}:${tableState?.sortOrder.direction}`;
      query.set(TableQueryParams._SORT, sort);
    } else {
      query.delete(TableQueryParams._SORT);
    }

    if (tableState?.filterList && flatten(tableState.filterList).length > 0) {
      query.delete(TableQueryParams._FILTER);
      tableState.filterList.forEach((f) => {
        query.append(TableQueryParams._FILTER, f.join(filterSeparator));
      });
    } else {
      query.delete(TableQueryParams._FILTER);
    }

    return history({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTriggerAction = () => {
    const params = getActionParams(currentState, currentFilterList, query);
    onAction(params);
  };

  const handleTableChange = async (action: any, tableState: MUIDataTableState) => {
    tableStateRef.current = tableState;
    switch (action) {
      case 'sort':
      case 'filterChange':
      case 'changeRowsPerPage':
      case 'changePage':
      case 'search':
      case 'resetFilters':
        setQueryParams(tableState, query);
        break;
      default:
        break;
    }
  };

  return (
    <TableBasic
      title={title}
      data={data}
      columns={columns?.map((c, index) => ({
        ...c,
        options: {
          ...c.options,
          filterList: currentFilterList[index],
          // display:
          //   isEmpty(viewColumns) || !c.name
          //     ? 'true'
          //     : (`${viewColumns?.includes(c.name)}` as Display),
        },
      }))}
      options={{ ...tableOptions, ...currentState }}
      onTableChange={handleTableChange}
      isLoading={isLoading}
      emptyComponent={emptyComponent}
      locationSearch={search}
      addRowButton={addRowButton}
      recordName={recordName}
    />
  );
};

export type TableProps = {
  title?: React.ReactNode;
  data: any[];
  tableOptions: MUIDataTableOptions;
  columns: MUIDataTableColumn[];
  refresh?: boolean | number | string;
  onAction: (..._args: any[]) => void;
  defaultSortOrder?: MUISortOptions;
  isLoading?: boolean;
  emptyComponent?: React.ReactNode;
  viewColumns?: string[];
  additionalFilterParams?: string[];
  filterSeparator?: string;
  defaultState?: Partial<MUIDataTableState>;
  isLocalState?: boolean;
  addRowButton?: React.ReactElement;
  recordName?: string;
};

export default memo(Table);
export * from './type';
