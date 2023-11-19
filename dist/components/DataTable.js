function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslations } from "next-intl";
import useLanguage from "../hooks/useLanguage";
import moment from "moment-jalaali";
import useSWR from "swr";
import { Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import useRequest from "../hooks/useRequest";
function DataTable(props) {
  const requestServer = useRequest({
    auth: true
  });
  const t = useTranslations();
  const {
    languageApp,
    languageList
  } = useLanguage();
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState(props.sorting || []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilterFns, setColumnFilterFns] = useState(() => {
    let output = {};
    const list = props.columns.map(item => item.enableColumnFilter ? {
      [item.id]: item.filterFn
    } : {
      [item.id]: ""
    });
    for (const key in list) {
      const nestedObj = list[key];
      for (const nestedKey in nestedObj) {
        output[nestedKey] = nestedObj[nestedKey];
      }
    }
    return output;
  });
  const [updateTime, setUpdateTime] = useState(moment().format("HH:mm | jYYYY/jMM/jDD"));
  const tableLocalization = useMemo(() => languageList.find(item => item.key === languageApp).tableLocalization, [languageApp, languageList]);
  const fetchUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("start", `${pagination.pageIndex * pagination.pageSize}`);
    const filters = columnFilters.map(filter => {
      let datatype;
      for (const i in props.columns) {
        if (props.columns[i].id === filter.id) {
          datatype = props.columns[i].datatype;
        }
      }
      return {
        ...filter,
        fn: columnFilterFns[filter.id],
        datatype: datatype
      };
    });
    params.set("size", pagination.pageSize);
    params.set("filters", JSON.stringify(filters ?? []));
    params.set("sorting", JSON.stringify(sorting ?? []));
    return `${props.tableUrl}?${params}`;
  }, [props.tableUrl, columnFilters, columnFilterFns, pagination, sorting, props.columns]);
  const {
    data,
    isValidating,
    mutate
  } = useSWR(fetchUrl, (...args) => requestServer(args, 'get', {
    pending: false,
    success: {
      notification: {
        show: false
      }
    }
  }).then(response => response.data).catch(() => {}), {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    keepPreviousData: true
  });
  useEffect(() => {
    setUpdateTime(moment().format("HH:mm | jYYYY/jMM/jDD"));
  }, [isValidating, languageApp]);
  return /*#__PURE__*/React.createElement(MaterialReactTable, _extends({
    localization: tableLocalization,
    data: data?.data ?? [],
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableRowSelection: props.selectableRow /* send condition */,
    enablePinning: props.enablePinning /* send condition */,
    enableColumnFilters: props.enableColumnFilters /* send condition */,
    enableDensityToggle: props.enableDensityToggle,
    enableHiding: props.enableHiding /* send condition */,
    enableFullScreenToggle: props.enableFullScreenToggle /* send condition */,
    enableColumnResizing: props.enableColumnResizing,
    muiTableHeadCellProps: {
      sx: {
        color: "primary.main",
        borderLeft: "1px solid #e1e1e1",
        "&:first-of-type": {
          borderLeft: "unset"
        },
        "& .Mui-TableHeadCell-Content": {
          justifyContent: "space-between"
        }
      }
    },
    muiTableBodyCellProps: {
      sx: {
        borderLeft: "1px solid #e1e1e1",
        "&:first-of-type": {
          borderLeft: "unset"
        }
      }
    },
    enableColumnFilterModes: true,
    muiTablePaperProps: {
      elevation: 0
    },
    rowCount: data?.meta?.totalRowCount ?? 0,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({
      table
    }) => /*#__PURE__*/React.createElement(React.Fragment, null, props.enableCustomToolbar /* send condition */ ? /*#__PURE__*/React.createElement(props.CustomToolbar, {
      mutate: mutate
    }) /* send component */ : /*#__PURE__*/React.createElement("span", null)),
    renderBottomToolbarCustomActions: ({
      table
    }) => /*#__PURE__*/React.createElement(React.Fragment, null, props.enableLastUpdate /* send condition */ ? /*#__PURE__*/React.createElement(Typography, {
      sx: {
        color: "primary.main",
        alignSelf: "center",
        whiteSpace: "nowrap",
        maxWidth: {
          xs: 100,
          sm: "100%"
        },
        overflowX: "scroll"
      },
      variant: "caption"
    }, t("last_updated_at"), ": ", updateTime) : ""),
    state: {
      showProgressBars: isValidating,
      columnFilters,
      columnFilterFns,
      pagination,
      sorting
    },
    positionActionsColumn: "last",
    enableRowActions: props.enableRowActions,
    renderRowActions: ({
      row
    }) => /*#__PURE__*/React.createElement(props.TableRowAction, {
      mutate: mutate,
      row: row
    })
  }, props));
}
export default DataTable;