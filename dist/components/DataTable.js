"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url-search-params.js");
require("core-js/modules/es.json.stringify.js");
var _nextIntl = require("next-intl");
var _useLanguage = _interopRequireDefault(require("../hooks/useLanguage"));
var _react = require("react");
var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));
var _swr = _interopRequireDefault(require("swr"));
var _material = require("@mui/material");
var _materialReactTable = _interopRequireDefault(require("material-react-table"));
var _useRequest = _interopRequireDefault(require("../hooks/useRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function DataTable(props) {
  var _data$data, _data$meta$totalRowCo, _data$meta;
  const requestServer = (0, _useRequest.default)({
    auth: true
  });
  const t = (0, _nextIntl.useTranslations)();
  const {
    languageApp,
    languageList
  } = (0, _useLanguage.default)();
  const [columnFilters, setColumnFilters] = (0, _react.useState)([]);
  const [sorting, setSorting] = (0, _react.useState)(props.sorting || []);
  const [pagination, setPagination] = (0, _react.useState)({
    pageIndex: 0,
    pageSize: 10
  });
  const [columnFilterFns, setColumnFilterFns] = (0, _react.useState)(() => {
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
  const [updateTime, setUpdateTime] = (0, _react.useState)((0, _momentJalaali.default)().format("HH:mm | jYYYY/jMM/jDD"));
  const tableLocalization = (0, _react.useMemo)(() => languageList.find(item => item.key === languageApp).tableLocalization, [languageApp, languageList]);
  const fetchUrl = (0, _react.useMemo)(() => {
    const params = new URLSearchParams();
    params.set("start", "".concat(pagination.pageIndex * pagination.pageSize));
    const filters = columnFilters.map(filter => {
      let datatype;
      for (const i in props.columns) {
        if (props.columns[i].id === filter.id) {
          datatype = props.columns[i].datatype;
        }
      }
      return _objectSpread(_objectSpread({}, filter), {}, {
        fn: columnFilterFns[filter.id],
        datatype: datatype
      });
    });
    params.set("size", pagination.pageSize);
    params.set("filters", JSON.stringify(filters !== null && filters !== void 0 ? filters : []));
    params.set("sorting", JSON.stringify(sorting !== null && sorting !== void 0 ? sorting : []));
    return "".concat(props.tableUrl, "?").concat(params);
  }, [props.tableUrl, columnFilters, columnFilterFns, pagination, sorting, props.columns]);
  const {
    data,
    isValidating,
    mutate
  } = (0, _swr.default)(fetchUrl, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return requestServer(args, 'get', {
      pending: false,
      success: {
        notification: {
          show: false
        }
      }
    }).then(response => response.data).catch(() => {});
  }, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    keepPreviousData: true
  });
  (0, _react.useEffect)(() => {
    setUpdateTime((0, _momentJalaali.default)().format("HH:mm | jYYYY/jMM/jDD"));
  }, [isValidating, languageApp]);
  return /*#__PURE__*/React.createElement(_materialReactTable.default, _extends({
    localization: tableLocalization,
    data: (_data$data = data === null || data === void 0 ? void 0 : data.data) !== null && _data$data !== void 0 ? _data$data : [],
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
    rowCount: (_data$meta$totalRowCo = data === null || data === void 0 || (_data$meta = data.meta) === null || _data$meta === void 0 ? void 0 : _data$meta.totalRowCount) !== null && _data$meta$totalRowCo !== void 0 ? _data$meta$totalRowCo : 0,
    onColumnFilterFnsChange: setColumnFilterFns,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: _ref => {
      let {
        table
      } = _ref;
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.enableCustomToolbar /* send condition */ ? /*#__PURE__*/React.createElement(props.CustomToolbar, {
        mutate: mutate
      }) /* send component */ : /*#__PURE__*/React.createElement("span", null));
    },
    renderBottomToolbarCustomActions: _ref2 => {
      let {
        table
      } = _ref2;
      return /*#__PURE__*/React.createElement(React.Fragment, null, props.enableLastUpdate /* send condition */ ? /*#__PURE__*/React.createElement(_material.Typography, {
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
      }, t("last_updated_at"), ": ", updateTime) : "");
    },
    state: {
      showProgressBars: isValidating,
      columnFilters,
      columnFilterFns,
      pagination,
      sorting
    },
    positionActionsColumn: "last",
    enableRowActions: props.enableRowActions,
    renderRowActions: _ref3 => {
      let {
        row
      } = _ref3;
      return /*#__PURE__*/React.createElement(props.TableRowAction, {
        mutate: mutate,
        row: row
      });
    }
  }, props));
}
var _default = exports.default = DataTable;