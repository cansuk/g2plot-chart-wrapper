"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _charts = require("@ant-design/charts");

var _icons = require("@ant-design/icons");

var _moment = _interopRequireDefault(require("moment"));

var _Settings = _interopRequireDefault(require("./Settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var GetChartColors = require("./Utils").GetChartColors;

var GetSliderColor = require("./Utils").GetSliderColor;

var GetAxisColor = require("./Utils").GetAxisColor;

var GetChartGeometry = require("./Utils").GetChartGeometry;

var GetGeometryOptions = require("./Utils").GetGeometryOptions;

var ColorAddUpdate = require("./Utils").ColorAddUpdate;

var GeomAddUpdate = require("./Utils").GeomAddUpdate;

var CalcAverageValue = require("./Utils").CalcAverageValue;

var dataViewModes = require("./Constants").DataViewModes; // netigma dependencies :
// import { queryDataGet } from '../datagrid/DataGridProps';
// import { dashboardServices } from "../../services/dashboard.services";


var chartData = [];

var randomColor = require('randomcolor');

var xField_with1string = "stringCol";
var seriesField_with1numeric = "category";
var initialBarConfig = {
  data: [],
  isGroup: true,
  xField: "value",
  yField: "stringColForNumeric",
  seriesField: seriesField_with1numeric,
  colorField: seriesField_with1numeric,
  theme: "light" //scrollbar: { type: 'vertical' },

};

var DynamicChart = function DynamicChart(props) {
  console.log("DynamicChart");
  debugger;
  return /*#__PURE__*/_react.default.createElement("div", null, "hello from dynamic charts"); // let { templateName, style, dataGridState, onSaveChartSettings, item, settings, isDashboard, chartName } = props;
  // if (settings && settings.chartType) {
  //     chartName = settings.chartType;
  // } else if (!chartName) {
  //     chartName = "bar";
  // }
  // const params = dataGridState && dataGridState.tableState;
  // const [state, setState] = useState({
  //     dataWith1Numeric: [], dataWith1String: [], numericColumnNames: []
  // });
  // const [isChartExist, setIsChartExist] = useState(true);
  // const [isInit, setIsInit] = useState(false);
  // const [isSync, setIsSync] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const [strKey, setStrKey] = useState(null);
  // const [sliderColor, setSliderColor] = useState(GetSliderColor(settings));
  // const ref = useRef();
  // const chartRefs = useRef({
  //     config: { ...initialBarConfig, ...style },
  //     selectedChart: chartName,
  //     numericColumsn: [], strKeys: [],
  //     strCount: 0, selectedData: [], strColumns: [], numericColumnsFiltered: [],
  //     numericColumnsFormat: {},
  //     chartObject: [],
  //     geometryOptions: [],
  //     // chart settings :
  //     chartSettings: settings && isDashboard ? settings : {
  //         selectedDataViewMode: [dataViewModes[0].name],
  //         selectedAxis: 'xAxis',
  //         isAxisAutoSettings: true,
  //         axisVisibility: { xAxis: false, yAxis: false },
  //         axisLineShape: { xAxis: "line", yAxis: "line" },
  //         axisLineColor: { xAxis: "black", yAxis: "black" },
  //         axisLineWidth: { xAxis: 1, yAxis: 1 },
  //         axisTitle: { xAxis: "", yAxis: "" },
  //         legendActive: true,
  //         legendPosition: 'top-left',
  //         legendLayout: 'horizontal',
  //         autoFitActive: true,
  //         chartWidth: 700,
  //         chartHeight: 400,
  //         isGrouped: true,
  //         isStack: false,
  //         isPercent: false,
  //         isReverseData: false,
  //         labelActive: false,
  //         isCustomLabelColor: false,
  //         selectedLabelColor: 'black',
  //         labelFontSize: 12,
  //         isLabelRotate: false,
  //         labelPosition: 'auto',
  //         isTooltipTitleActive: true,
  //         isAutoTooltipTitle: true,
  //         customTooltipTitle: "",
  //         showTooltipCrosshairs: false,
  //         crosshairDirectionX: true,
  //         crosshairDirectionY: true,
  //         selectedCrosshairColor: 'red',
  //         showSlider: true,
  //         sliderColor: 'green',
  //         showChartTitle: false,
  //         chartTitle: '',
  //         currentGeomType: 'line',
  //         colNameColor: [],
  //         colNameGeom: [],
  //         dataLimitCount: 0
  //     }
  // });
  // if (!settings) {
  //     settings = //{ chartType: chartRefs.current.selectedChart, colNameColor: [], colNameGeom: [] }
  //     {
  //         chartType: chartRefs.current.selectedChart,
  //         categoryField: strKey,
  //         valField: chartRefs.current.numericColumnsFiltered?.map(x => x.ColumnName),
  //         selectedDataViewMode: [dataViewModes[0]?.name],
  //         isGrouped: chartRefs.current.chartSettings.isGrouped,
  //         isStacked: chartRefs.current.chartSettings.isStack,
  //         isPercent: chartRefs.current.chartSettings.isPercent,
  //         isReverseData: chartRefs.current.chartSettings.isReverseData,
  //         colNameColor: [],
  //         colNameGeom: [],
  //         showSlider: chartRefs.current.chartSettings.showSlider,
  //         showChartTitle: false,
  //         chartTitle: chartRefs.current.chartSettings.chartTitle,
  //         autoFitActive: chartRefs.current.chartSettings.autoFitActive,
  //         chartWidth: chartRefs.current.chartSettings.chartWidth,
  //         chartHeight: chartRefs.current.chartSettings.chartHeight,
  //         labelActive: chartRefs.current.chartSettings.labelActive,
  //         labelPosition: chartRefs.current.chartSettings.labelPosition,
  //         labelFontSize: chartRefs.current.chartSettings.labelFontSize,
  //         labelColor: chartRefs.current.chartSettings.labelColor,
  //         isLabelRotate: chartRefs.current.chartSettings.isLabelRotate,
  //         legendActive: chartRefs.current.chartSettings.legendActive,
  //         legendPosition: chartRefs.current.chartSettings.legendPosition,
  //         legendLayout: chartRefs.current.chartSettings.legendLayout,
  //         isTooltipTitleActive: chartRefs.current.chartSettings.isTooltipTitleActive,
  //         isAutoTooltipTitle: chartRefs.current.chartSettings.isAutoTooltipTitle,
  //         customTooltipTitle: chartRefs.current.chartSettings.customTooltipTitle,
  //         selectedAxis: chartRefs.current.chartSettings.selectedAxis,
  //         isAxisAutoSettings: chartRefs.current.chartSettings.isAxisAutoSettings,
  //         axisVisibility: chartRefs.current.chartSettings.axisVisibility,
  //         axisLineShape: chartRefs.current.chartSettings.axisLineShape,
  //         axisLineColor: chartRefs.current.chartSettings.axisLineColor,
  //         axisLineWidth: chartRefs.current.chartSettings.axisLineWidth,
  //         axisTitle: chartRefs.current.chartSettings.axisTitle,
  //         dataLimitCount: chartRefs.current.chartSettings.dataLimitCount
  //     }
  // }
  // const [isGeometryOptionsReady, setIsGeometryOptionsReady] = useState(chartRefs.current.selectedChart !== "dual-axis");
  // /* CONFIG VARIABLES */
  // // -- common config --
  // const legendStyle = {
  //     fill: 'black', fontSize: 18,
  //     shadowColor: '#C0C0C0',
  //     shadowBlur: 10
  // }
  // // -- data with 1 numeric config -- 
  // const legendNum = () =>
  //     chartRefs.current.chartSettings.legendActive && {
  //         title: chartRefs.current.chartSettings.chartTitle && {
  //             text: chartRefs.current.chartSettings.chartTitle,
  //             style: legendStyle
  //         },
  //         slidable: true,
  //         position: chartRefs.current.chartSettings.legendPosition,
  //         layout: chartRefs.current.chartSettings.legendLayout,
  //         itemName: {
  //             formatter: (text, item) => chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName
  //         },
  //     };
  // const labelNum = !chartRefs.current.chartSettings.labelActive ? null : {
  //     style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
  //     position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
  //     rotate: chartRefs.current.chartSettings.isLabelRotate,
  // };
  // const tooltipNum = {
  //     showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
  //     title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
  //     formatter: (item) =>
  //         ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
  //     showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
  //     crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
  //         type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
  //         text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
  //     } : {}
  // };
  // const xAxisNum = () => chartRefs.current.chartSettings.axisVisibility["xAxis"] ? {
  //     title: { text: chartRefs.current.chartSettings.axisTitle["xAxis"] },
  //     grid: {
  //         line: {
  //             style: {
  //                 stroke: GetAxisColor(chartRefs.current.chartSettings.axisLineColor, "xAxis"),//chartRefs.current.axisLineColor["xAxis"],
  //                 lineWidth: chartRefs.current.chartSettings.axisLineWidth["xAxis"],
  //                 lineDash: chartRefs.current.chartSettings.axisLineShape["xAxis"] === "line" ? null : [4, 5],
  //                 strokeOpacity: 0.7,
  //                 shadowColor: 'black',
  //                 shadowBlur: 10,
  //                 shadowOffsetX: 5,
  //                 shadowOffsetY: 5,
  //                 cursor: 'pointer'
  //             }
  //         },
  //         // alternateColor: 'rgba(0,0,0,0.05)',
  //     }
  // } : {};
  // const yAxisNum = () => chartRefs.current.chartSettings.axisVisibility["yAxis"] ? {
  //     title: { text: chartRefs.current.chartSettings.axisTitle["yAxis"] },
  //     grid: {
  //         line: {
  //             style: {
  //                 stroke: chartRefs.current.chartSettings.axisLineColor["yAxis"],
  //                 lineWidth: chartRefs.current.chartSettings.axisLineWidth["yAxis"],
  //                 lineDash: chartRefs.current.chartSettings.axisLineShape["yAxis"] === "line" ? null : [4, 5],
  //                 strokeOpacity: 0.7,
  //                 shadowColor: 'black',
  //                 shadowBlur: 10,
  //                 shadowOffsetX: 5,
  //                 shadowOffsetY: 5,
  //                 cursor: 'pointer'
  //             }
  //         }
  //     }
  // } : {};
  // const animationPathIn = {
  //     appear: {
  //         animation: 'path-in',
  //         duration: 5000,
  //         delay: 0,
  //     },
  // };
  // const animationZoomIn = {
  //     appear: {
  //         animation: 'zoom-in',
  //         duration: 1000,
  //         delay: 0,
  //     },
  // };
  // const animationScaleIn = {
  //     appear: {
  //         animation: 'scale-in',
  //         duration: 1000,
  //         delay: 0,
  //     },
  // };
  // // -- data with 1 string config -- 
  // const getLabelStr = () => {
  //     if (!chartRefs.current.chartSettings.labelActive) return null;
  //     return {
  //         type: 'spider',
  //         labelHeight: 28,
  //         content: ({ percent }) => `${(percent * 100).toFixed(1)}%`,
  //         style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
  //         position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
  //         rotate: chartRefs.current.chartSettings.isLabelRotate,
  //         animate: true,
  //         layout: 'overlap',
  //     }
  // }
  // const tooltipPie = {
  //     showChartTitle: true,
  //     customContent: (title) => {
  //         return `<div style='padding:12px!important;'>${chartData[0][strKey?.replace('_', '.')].Value} - ${chartRefs.current.numericColumnsFormat[state.numericColumnNames[0]]?.alias} : ${chartRefs.current.numericColumnsFormat[state.numericColumnNames[0]]?.value}</div> `;
  //     }
  // };
  // // -- common configs end --
  // const tooltipStr = {
  //     shared: true,
  //     showMarkers: false,
  //     showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
  //     title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
  //     showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
  //     // crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
  //     //     type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
  //     //     text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
  //     // } : {}        
  // };
  // let SetObjColor = (selectedKeys) => {
  //     // sets color to object and returns it back
  //     let index, existingColor, newColor = randomColor();
  //     let promise = new Promise((resolve, reject) => {
  //         let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
  //             index = chartRefs.current.chartObject.findIndex(x => x.Path === column.Path);
  //             existingColor = chartRefs.current.chartObject[index]?.color;
  //             if (!existingColor) {
  //                 settings = ColorAddUpdate(settings, column.Path, newColor);
  //                 return Object.assign({}, column, { color: newColor });
  //             } else {
  //                 settings?.colNameColor?.forEach((item, index) => {
  //                     if (!selectedKeys.includes(item.colName)) {
  //                         // Kaldırılan kolonun rengi de kaldırılmalı :
  //                         settings.colNameColor.splice(index, 1);
  //                     }
  //                 });
  //                 return Object.assign({}, column, { color: existingColor });
  //             }
  //         });
  //         resolve(result);
  //     });
  //     return promise;
  // }
  // let SetObjGeom = (selectedKeys) => {
  //     // sets geometry to object and returns it back
  //     let index, existingGeom, newGeom = "line"
  //     let promise = new Promise((resolve, reject) => {
  //         if (chartRefs.current.chartObject?.length === 0) reject("hata");
  //         let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
  //             index = chartRefs.current.chartObject.findIndex(x => { return x && x.Path === column.Path });
  //             existingGeom = chartRefs.current.chartObject[index]?.geometry;
  //             if (!existingGeom) {
  //                 settings = GeomAddUpdate(settings, column.Path, newGeom);
  //                 return Object.assign({}, column, { geometry: newGeom });
  //             } else {
  //                 settings?.colNameGeom?.forEach((item, index) => {
  //                     if (!selectedKeys.includes(item.colName)) {
  //                         // Kaldırılan kolonun geometrisi de kaldırılmalı :
  //                         settings.colNameGeom.splice(index, 1);
  //                     }
  //                 })
  //                 return Object.assign({}, column, { geometry: existingGeom });
  //             }
  //         });
  //         resolve(result);
  //     });
  //     return promise;
  // }
  // const showWarnings = (props) => {
  //     let { description } = props;
  //     notification.warning({
  //         message: `Uyarı`,
  //         description,
  //         placement: 'bottomRight'
  //     });
  // }
  // /* EVENT HANDLERS */
  // const handleNumFieldChange = (selectedKeys) => {
  //     if (isDashboard) {
  //         chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter(x => selectedKeys.includes(x.ColumnName));
  //         if (chartRefs.current.selectedChart !== "dual-axis") {
  //             chartRefs.current.chartObject = SetObjColor(selectedKeys).then((result) => result);
  //         } else {
  //             SetObjColor(selectedKeys).then((result) => {
  //                 chartRefs.current.chartObject = result;
  //                 SetObjGeom(selectedKeys).then((result) => {
  //                     chartRefs.current.chartObject = result;
  //                 })
  //             });
  //         }
  //     } else {
  //         chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter(x => selectedKeys.includes(x.ColumnName));
  //         chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, { color: randomColor() }));
  //     }
  //     if (chartRefs.current.selectedChart === "dual-axis" && selectedKeys?.length < 2) {
  //         showWarnings({
  //             description: "Çift eksenli grafiğin kullanılabilmesi için minimum 2 değer kolonu seçilmelidir.",
  //         });
  //         return;
  //     }
  // }
  // const syncSettings = (settingsObj) => {
  //     let promise = new Promise((resolve, reject) => {
  //         if (!settingsObj) resolve(true);
  //         if (settingsObj.categoryField) {
  //             setStrKey(settingsObj.categoryField);
  //         }
  //         if (settingsObj.valField?.length > 0) {
  //             if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
  //                 chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumnsFiltered.filter((col) => settingsObj.valField.includes(col.Path));
  //             } else {
  //                 chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns.filter((col) => settingsObj.valField.includes(col.Path));
  //             }
  //         }
  //         chartRefs.current.chartSettings.isReverseData = settingsObj.isReverseData;
  //         chartRefs.current.chartSettings.selectedDataViewMode = settingsObj.selectedDataViewMode;
  //         chartRefs.current.chartSettings.isGrouped = settingsObj.isGrouped;
  //         chartRefs.current.chartSettings.isStacked = settingsObj.isStacked;
  //         chartRefs.current.chartSettings.isPercent = settingsObj.isPercent;
  //         chartRefs.current.chartSettings.showSlider = settingsObj.showSlider;
  //         chartRefs.current.showChartTitle = settingsObj.showChartTitle;
  //         chartRefs.current.chartSettings.showChartTitle = settingsObj.showChartTitle;
  //         chartRefs.current.chartSettings.chartTitle = settingsObj.chartTitle;
  //         chartRefs.current.chartSettings.autoFitActive = settingsObj.autoFitActive;
  //         chartRefs.current.chartSettings.chartWidth = settingsObj.chartWidth;
  //         chartRefs.current.chartSettings.chartHeight = settingsObj.chartHeight;
  //         chartRefs.current.chartSettings.labelActive = settingsObj.labelActive;
  //         chartRefs.current.chartSettings.labelPosition = settingsObj.labelPosition;
  //         chartRefs.current.chartSettings.labelFontSize = settingsObj.labelFontSize;
  //         chartRefs.current.labelColor = settingsObj.labelColor;
  //         chartRefs.current.chartSettings.isLabelRotate = settingsObj.isLabelRotate;
  //         chartRefs.current.chartSettings.legendActive = settingsObj.legendActive;
  //         chartRefs.current.chartSettings.legendPosition = settingsObj.legendPosition;
  //         chartRefs.current.chartSettings.legendLayout = settingsObj.legendLayout;
  //         chartRefs.current.chartSettings.isTooltipTitleActive = settingsObj.isTooltipTitleActive;
  //         chartRefs.current.chartSettings.isAutoTooltipTitle = settingsObj.isAutoTooltipTitle;
  //         chartRefs.current.chartSettings.customTooltipTitle = settingsObj.customTooltipTitle;
  //         chartRefs.current.chartSettings.colNameColor = settingsObj.colNameColor;
  //         chartRefs.current.chartSettings.colNameGeom = settingsObj.colNameGeom;
  //         chartRefs.current.chartSettings.dataLimitCount = !(settingsObj.dataLimitCount) ? 0 : settingsObj.dataLimitCount;
  //         setIsSync(true);
  //         resolve(true);
  //     });
  //     return promise;
  // }
  // const validateSettings = () => {
  //     let promise = new Promise((resolve, reject) => {
  //         if (chartRefs.current.selectedChart === "dual-axis" && chartRefs.current.numericColumnsFiltered?.length < 2) {
  //             showWarnings({
  //                 title: "İşlem başarısız",
  //                 description: "Çift eksenli grafiğin kullanılabilmesi için minimum 2 değer kolonu seçilmelidir."
  //             });
  //             resolve(false);
  //         } else {
  //             resolve(true);
  //         }
  //     });
  //     return promise;
  // }
  // const applySettings = (settingsObj) => {
  //     validateSettings().then((result) => {
  //         if (result) {
  //             // sync new settings : 
  //             syncSettings(settingsObj).then((result) => {
  //                 if (result) {
  //                     manageChartChange(chartRefs.current.selectedChart);
  //                     setVisible(false);
  //                 }
  //             });
  //         }
  //     });
  // }
  // const saveSettings = (settingsObj) => {
  //     applySettings(settingsObj);
  //     // validateSettings().then((result) => {
  //     //     if (result) {
  //     //         // sync new settings :
  //     //         syncSettings(settingsObj).then((result) => {
  //     //             if (result) {
  //     //                 setDataReady(false);
  //     //                 manageChartChange(chartRefs.current.selectedChart);
  //     //                 setVisible(false);
  //     //             }
  //     //         });
  //     //     }
  //     // });
  //     dashboardServices.getDashboardMeta().then((result) => {
  //         let pages = result.Data["pages"];
  //         if (pages && pages?.length === 1 && pages[0] && pages[0].data && pages[0].data[item]) {
  //             pages[0].data[item]["chartSettings"] = settingsObj;
  //         }
  //         dashboardServices.saveDashboardMeta(result.Data).then((result) => {
  //             message.info("Ayarlar kaydedildi!");
  //         }).catch(err => message.error(`Ayarlar kaydedilirken hata oluştu. ${err}`));
  //     });
  // }
  // const manipulateData = (dataType) => { // TODO CANSU CONVERT THIS FUNCTION TO PROMISE
  //     //setState({ ...state, dataWith1Numeric: [], dataWith1String: [] });
  //     state.dataWith1Numeric = []; state.dataWith1String = [];
  //     switch (dataType) {
  //         case "with1Numeric":
  //             chartRefs.current.selectedData = null;
  //             if (params && params.selectedRowKeys && params.selectedRowKeys?.length > 0) {
  //                 chartRefs.current.selectedData = chartData.filter(x => params.selectedRowKeys.includes(x.id));
  //             } else {
  //                 chartRefs.current.selectedData = chartData;
  //             }
  //             chartRefs.current.selectedData.forEach((row, rowIndex) => {
  //                 if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
  //                     return;
  //                 let strVal = chartData[rowIndex] && chartData[rowIndex][strKey?.replace('_', '.')]?.DisplayText;
  //                 if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
  //                     chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {
  //                         if (!col.PrimaryKey && !col.IsLookupColumn) {
  //                             if (chartData[rowIndex][col]?.Value || chartData[rowIndex][col.Path]?.Value) {
  //                                 state.dataWith1Numeric.push({
  //                                     value: chartData[rowIndex][col.Path]?.Value,
  //                                     category: col.Path,
  //                                     stringColForNumeric: strVal
  //                                 });
  //                                 // if (chartRefs.current.chartSettings.dataLimitCount !== 0 && state.dataWith1Numeric.length === chartRefs.current.chartSettings.dataLimitCount)
  //                                 //     return;
  //                             }
  //                         }
  //                     });
  //                 } else {
  //                     chartRefs.current.numericColumns.forEach((col, colIndex) => {
  //                         if (!col.PrimaryKey && !col.IsLookupColumn) {
  //                             if (chartData[rowIndex][col]?.Value || chartData[rowIndex][col.Path]?.Value) {
  //                                 state.dataWith1Numeric.push({
  //                                     value: chartData[rowIndex][col.Path]?.Value,
  //                                     category: col.Path,
  //                                     stringColForNumeric: strVal
  //                                 });
  //                             }
  //                         }
  //                     });
  //                 }
  //             });
  //             break;
  //         case "with1String":
  //             chartRefs.current.selectedData = null;
  //             setState({ ...state, numericColumnNames: [] });
  //             chartRefs.current.numericColumnsFormat = {};
  //             if (params && params.selectedRowKeys && params.selectedRowKeys?.length > 0) {
  //                 chartRefs.current.selectedData = chartData.filter(x => params.selectedRowKeys.includes(x.id));
  //             } else {
  //                 chartRefs.current.selectedData = chartData;
  //             }
  //             // Filling numericColumnsfiltered if dashboard :
  //             if (isDashboard) {
  //                 if (settings?.valField && settings?.valField.length > 0) {
  //                     chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns.filter((col) => settings?.valField?.includes(col.Path));
  //                 } else {
  //                     chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns;
  //                 }
  //                 state.numericColumnNames = chartRefs.current.numericColumnsFiltered?.map(col => col.Path.replace('.', '_'))
  //             } else {
  //                 state.numericColumnNames = chartRefs.current.numericColumns.map(col => {
  //                     if (!state.numericColumnNames.includes(col.Path.replace('.', '_'))) {
  //                         return col.Path.replace('.', '_');
  //                     }
  //                 })
  //             }
  //             chartRefs.current.selectedData.forEach((row, rowIndex) => {
  //                 let obj = {};
  //                 chartRefs.current.numericColumns.forEach((col) => {
  //                     // ilk '.', '_' ile değiştirilmeli. Çünkü chart '.' içeren alanlar için legend ı gizleyebiliyor ancak geri açamıyor.
  //                     chartRefs.current.strKeys?.map(key => { obj[key.replace('.', '_')] = chartData[rowIndex][key.replace('_', '.')]?.DisplayText; });
  //                     obj[col.Path.replace('.', '_')] = chartData[rowIndex][col.Path]?.Value;
  //                     if (!chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')]) {
  //                         chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')] = {
  //                             alias: col.DisplayName.replace('.', '_'),
  //                             value: chartData[rowIndex][col.Path]?.Value.toLocaleString(),
  //                             formatter: (v) => {
  //                                 // console.log(v);
  //                                 if (v) return `${v.toLocaleString()}`;
  //                                 return `${v}`;
  //                             },
  //                         }
  //                     }
  //                 });
  //                 state.dataWith1String?.push(obj);
  //             });
  //             break;
  //     }
  // }
  // const initChart = ({ columns, dataList }) => {
  //     chartData = dataList;
  //     chartRefs.current.numericColumns = columns.filter(x => (!x.PrimaryKey && x.DataTypeName.toLocaleLowerCase().includes("double") && x.ViewEditor.TypeName !== "LookUp") ||
  //         (!x.PrimaryKey && x.DataTypeName.includes("Float") && x.ViewEditor.TypeName !== "LookUp") ||
  //         (!x.PrimaryKey && x.DataTypeName.includes("Decimal") && x.ViewEditor.TypeName !== "LookUp") ||
  //         (!x.PrimaryKey && x.DataTypeName.includes("Int") && x.ViewEditor.TypeName !== "LookUp")); // TODO CANSU ŞİMDİLİK LOOKUPLAR ELENDİ
  //     chartRefs.current.strColumns = columns.filter(x => x.DataTypeName === "String");
  //     chartRefs.current.strCount = chartRefs.current.strColumns?.length;
  //     if (chartRefs.current.strCount > 0) {
  //         setStrKey(chartRefs.current.strColumns[0]?.Path.replace('.', '_'));  // todo cansu kaldırılacak ihtiyaç kalmayacak            
  //         chartRefs.current.strKeys = chartRefs.current.strColumns.map((col) => col.Path.replace('.', '_'));
  //     }
  //     Object.assign(chartRefs.current.numericColumnsFiltered, chartRefs.current.numericColumns);
  //     if (isDashboard && settings) {
  //         syncSettings(settings).then(result => {
  //             if (result) {
  //                 chartRefs.current.chartObject = chartRefs.current.numericColumns?.map(column => {
  //                     // color settings :
  //                     let colorSetting = settings["colNameColor"]?.filter(x => x["colName"] === column.Path);
  //                     let color = null;
  //                     if (colorSetting && colorSetting?.length > 0 && colorSetting[0] && colorSetting[0].color) {
  //                         color = colorSetting[0].color;
  //                     } else {
  //                         settings = ColorAddUpdate(settings, column.Path, color);
  //                         color = settings["colNameColor"]?.filter(x => x["colName"] === column.Path)[0]?.color;
  //                     }
  //                     // geometry settings :
  //                     let geomSetting = settings["colNameGeom"]?.filter(x => x["colName"] === column.Path);
  //                     let geom = null;
  //                     if (geomSetting && geomSetting?.length > 0 && geomSetting[0] && geomSetting[0].geometry) {
  //                         geom = geomSetting[0].geometry;
  //                     } else {
  //                         settings = GeomAddUpdate(settings, column.Path, geom);
  //                         geom = settings["colNameGeom"]?.filter(x => x["colName"] === column.Path)[0]?.geometry;
  //                     }
  //                     return Object.assign({}, column, {
  //                         color: color,
  //                         geomType: geom
  //                     })
  //                 });
  //                 setIsInit(chartRefs.current.chartObject?.length > 0);
  //             }
  //         });
  //     } else {
  //         chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, {
  //             color: randomColor(),
  //             geomType: GetChartGeometry(column.Path, chartRefs.current.chartObject) || 'line'
  //         }));
  //         setIsInit(chartRefs.current.chartObject?.length > 0);
  //     }
  //     if (!chartRefs.current.numericColumns ||
  //         (chartRefs.current.numericColumns && chartRefs.current.numericColumns?.length == 0)
  //         || chartRefs.current.strCount < 1) {
  //         setIsChartExist(false);
  //     } else {
  //         setIsChartExist(true);
  //     }
  // }
  // // export image
  // const downloadImage = () => {
  //     var a = document.createElement("a");
  //     a.href = ref.current?.toDataURL(); //Image Base64 
  //     let date = moment().format('DD-MM-YYYY');
  //     a.download = `${chartRefs.current.chartSettings.chartTitle}-${date}.jpg`; //File name 
  //     a.click();
  // };
  // const manageChartChange = (chartName) => {
  //     switch (chartName) {
  //         case "bar":
  //         case "radial-bar":
  //             manipulateData("with1Numeric");
  //             chartRefs.current.config = {
  //                 isGroup: chartRefs.current.chartSettings.selectedDataViewMode?.includes("group"),
  //                 isStack: chartRefs.current.chartSettings.selectedDataViewMode?.includes("stack"),
  //                 isPercent: chartRefs.current.chartSettings.selectedDataViewMode?.includes("percent"),
  //                 seriesField: seriesField_with1numeric,
  //                 label: !chartRefs.current.chartSettings.labelActive ? null : {
  //                     style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
  //                     position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
  //                     rotate: chartRefs.current.chartSettings.isLabelRotate,
  //                 },
  //                 // scrollbar: { type: 'vertical' },
  //                 theme: "light",
  //                 colorField: seriesField_with1numeric,
  //                 color: ({ category }) => {
  //                     if (isDashboard) {
  //                         let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
  //                             || settings?.colNameColor?.filter(x => x["colName"] === category);
  //                         let color;
  //                         if (colorObj && colorObj?.length === 1 && colorObj[0]) {
  //                             color = colorObj[0]["color"];
  //                         }
  //                         return color || GetChartColors(category, chartRefs.current.chartObject);
  //                     } else {
  //                         return GetChartColors(category, chartRefs.current.chartObject);
  //                     }
  //                 },
  //                 legend: chartRefs.current.chartSettings.legendActive && {
  //                     title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
  //                         && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
  //                     slidable: true,
  //                     position: chartRefs.current.chartSettings.legendPosition,
  //                     layout: chartRefs.current.chartSettings.legendLayout,
  //                     itemName: {
  //                         formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName}\nOrt.${CalcAverageValue(state.dataWith1Numeric, seriesField_with1numeric, text)}`
  //                     },
  //                     autoEllipsis: false,
  //                 },
  //                 autoFit: chartRefs.current.chartSettings.autoFitActive,
  //                 width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
  //                 height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
  //                 tooltip: {
  //                     showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
  //                     title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
  //                     formatter: (item) =>
  //                         ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
  //                     // showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
  //                     showCrosshairs: true, shared: true,
  //                     crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
  //                         type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
  //                         text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
  //                     } : {}
  //                 },
  //                 xAxis: xAxisNum(),
  //                 yAxis: yAxisNum(),
  //                 smooth: true,
  //                 animation: animationPathIn,
  //                 meta: chartRefs.current.numericColumnsFormat,
  //                 data: chartRefs.current.chartSettings.isReverseData ? state.dataWith1Numeric.reverse() : state.dataWith1Numeric,
  //                 xField: chartName === "bar" ? "value" : "stringColForNumeric",
  //                 yField: chartName === "bar" ? "stringColForNumeric" : "value",
  //                 slider: chartRefs.current.chartSettings.showSlider ? {
  //                     start: 0.0,
  //                     end: 1,
  //                     foregroundStyle: { fill: GetSliderColor(chartRefs.current.chartSettings) },
  //                     handlerStyle: { height: 30, highLightFill: 'lightGray', stroke: 'gray' },
  //                 } : null,
  //                 interactions: [{ type: 'marker-active' }, { type: 'brush' }],
  //             };
  //             break;
  //         case "line":
  //         case "area":
  //         case "column":
  //         case "radar-line":
  //             manipulateData("with1Numeric");
  //             console.log("dataWith1Numeric.length : " + state.dataWith1Numeric.length);
  //             chartRefs.current.config = {
  //                 data: chartRefs.current.chartSettings.isReverseData ? state.dataWith1Numeric.reverse() : state.dataWith1Numeric,
  //                 isGroup: chartRefs.current.chartSettings.isGrouped,
  //                 isStack: chartRefs.current.chartSettings.isStack,
  //                 isPercent: chartRefs.current.chartSettings.isPercent,
  //                 seriesField: seriesField_with1numeric,
  //                 label: !chartRefs.current.chartSettings.labelActive ? null : {
  //                     style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
  //                     position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
  //                     rotate: chartRefs.current.chartSettings.isLabelRotate,
  //                 },
  //                 // scrollbar: { type: 'vertical' },
  //                 theme: "light",
  //                 colorField: seriesField_with1numeric,
  //                 color: ({ category }) => {
  //                     if (isDashboard) {
  //                         let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
  //                             || settings?.colNameColor?.filter(x => x["colName"] === category);
  //                         let color;
  //                         if (colorObj && colorObj?.length === 1 && colorObj[0]) {
  //                             color = colorObj[0]["color"];
  //                         }
  //                         return color || GetChartColors(category, chartRefs.current.chartObject);
  //                         //return `l(99) 0:${color || GetChartColors(category, chartRefs.current.chartObject)} 1:rgba(255,255,255,0.2)`;
  //                     } else {
  //                         return GetChartColors(category, chartRefs.current.chartObject);
  //                     }
  //                 },
  //                 legend: chartRefs.current.chartSettings.legendActive && {
  //                     title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
  //                         && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
  //                     slidable: true,
  //                     position: chartRefs.current.chartSettings.legendPosition,
  //                     layout: chartRefs.current.chartSettings.legendLayout,
  //                     itemName: {
  //                         formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName}\nOrt. ${CalcAverageValue(state.dataWith1Numeric, seriesField_with1numeric, text)}`
  //                     },
  //                 },
  //                 autoFit: chartRefs.current.chartSettings.autoFitActive,
  //                 width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
  //                 height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
  //                 tooltip: {
  //                     showTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
  //                     title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
  //                     formatter: (item) =>
  //                         ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
  //                     //showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
  //                     showCrosshairs: true, shared: true,
  //                     crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
  //                         type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
  //                         text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
  //                     } : {}
  //                 },
  //                 xAxis: xAxisNum(),
  //                 yAxis: yAxisNum(),
  //                 smooth: true,
  //                 animation: chartName === "column" ? animationZoomIn : animationPathIn,
  //                 meta: chartRefs.current.numericColumnsFormat,
  //                 xField: "stringColForNumeric",
  //                 yField: "value",
  //                 slider: chartRefs.current.chartSettings.showSlider ? {
  //                     start: 0.0,
  //                     end: 1,
  //                     foregroundStyle: { fill: GetSliderColor(chartRefs.current.chartSettings) },
  //                     handlerStyle: { height: 30, highLightFill: 'lightGray', stroke: 'gray' },
  //                 } : null,
  //                 // interactions: [{ type: 'marker-active' }, { type: 'brush' }],
  //                 interactions: [{ type: 'marker-active' }, { type: 'brush' }, { type: 'element-highlight-by-color' }, { type: 'element-link' }],
  //                 // TODO CANSU AYARLARA EKLEYİP EKLEMEYECEĞİNE KARAR VER.
  //                 // annotations: [
  //                 //     {
  //                 //         type: 'text',
  //                 //         position: ['min', 'median'],
  //                 //         content: 'ortalama',
  //                 //         offsetY: -4,
  //                 //         style: {
  //                 //             textBaseline: 'bottom',
  //                 //         },
  //                 //     },
  //                 //     {
  //                 //         type: 'line',
  //                 //         start: ['min', 'median'],
  //                 //         end: ['max', 'median'],
  //                 //         style: {
  //                 //             stroke: 'blue',
  //                 //             lineDash: [2, 2],
  //                 //         },
  //                 //     },
  //                 // ],
  //             };
  //             break;
  //         case "pie":
  //             manipulateData("with1String");
  //             chartRefs.current.config = {
  //                 appendPadding: 5,
  //                 data: state.dataWith1String,
  //                 angleField: state.numericColumnNames[0],
  //                 colorField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
  //                 radius: 1,
  //                 radius: 0.8,
  //                 meta: chartRefs.current.numericColumnsFormat,
  //                 legend: chartRefs.current.chartSettings.legendActive && {
  //                     title: chartRefs.current.chartSettings.chartTitle && {
  //                         text: chartRefs.current.chartSettings.chartTitle,
  //                         style: legendStyle
  //                     },
  //                     slidable: true,
  //                     position: chartRefs.current.chartSettings.legendPosition,
  //                     layout: chartRefs.current.chartSettings.legendLayout,
  //                     itemName: {
  //                         formatter: (text) => text
  //                     },
  //                 },
  //                 label: getLabelStr,
  //                 tooltip: tooltipPie,
  //                 animation: animationZoomIn,
  //                 //interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  //                 interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  //                 // scrollbar: { type: 'vertical' },
  //             };
  //             break;
  //         case "dual-axis":
  //             manipulateData("with1String");
  //             chartRefs.current.config = {
  //                 data: [state.dataWith1String, state.dataWith1String],
  //                 xField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
  //                 yField: state.numericColumnNames,
  //                 meta: chartRefs.current.numericColumnsFormat,
  //                 isGroup: chartRefs.current.chartSettings.isGrouped,
  //                 isStack: chartRefs.current.chartSettings.isStack,
  //                 isPercent: chartRefs.current.chartSettings.isPercent,
  //                 // scrollbar: { type: 'vertical' },
  //                 theme: "light",
  //                 legend: chartRefs.current.chartSettings.legendActive && {
  //                     title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
  //                         && {
  //                         text: chartRefs.current.chartSettings.chartTitle,
  //                         style: legendStyle
  //                     },
  //                     slidable: true,
  //                     position: chartRefs.current.chartSettings.legendPosition,
  //                     layout: chartRefs.current.chartSettings.legendLayout,
  //                     itemName: {
  //                         formatter: (text) => text
  //                     },
  //                 },
  //                 autoFit: chartRefs.current.chartSettings.autoFitActive,
  //                 width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
  //                 height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
  //                 tooltip: tooltipStr,
  //                 xAxis: xAxisNum(),
  //                 yAxis: yAxisNum(),
  //                 // xAxis: chartRefs.current.chartSettings.axisVisibility["xAxis"] && {
  //                 //     grid: {
  //                 //         line: {
  //                 //             style: {
  //                 //                 stroke: chartRefs.current.chartSettings.axisLineColor["xAxis"],
  //                 //                 lineWidth: chartRefs.current.chartSettings.axisLineWidth["xAxis"],
  //                 //                 lineDash: chartRefs.current.chartSettings.axisLineShape["xAxis"] === "line" ? null : [4, 5],
  //                 //                 strokeOpacity: 0.7,
  //                 //                 shadowColor: 'black',
  //                 //                 shadowBlur: 10,
  //                 //                 shadowOffsetX: 5,
  //                 //                 shadowOffsetY: 5,
  //                 //                 cursor: 'pointer'
  //                 //             }
  //                 //         }
  //                 //     }
  //                 // },
  //                 // yAxis: chartRefs.current.chartSettings.axisVisibility["yAxis"] && {
  //                 //     grid: {
  //                 //         line: {
  //                 //             style: {
  //                 //                 stroke: chartRefs.current.chartSettings.axisLineColor["yAxis"],
  //                 //                 lineWidth: chartRefs.current.chartSettings.axisLineWidth["yAxis"],
  //                 //                 lineDash: chartRefs.current.chartSettings.axisLineShape["yAxis"] === "line" ? null : [4, 5],
  //                 //                 strokeOpacity: 0.7,
  //                 //                 shadowColor: 'black',
  //                 //                 shadowBlur: 10,
  //                 //                 shadowOffsetX: 5,
  //                 //                 shadowOffsetY: 5,
  //                 //                 cursor: 'pointer'
  //                 //             }
  //                 //         }
  //                 //     }
  //                 // },
  //                 //limitInPlot: true,
  //                 animation: animationPathIn,
  //                 geometryOptions: GetGeometryOptions(chartRefs.current.chartObject, (chartRefs.current.chartSettings.colNameGeom || settings?.colNameGeom), isDashboard),
  //                 interactions: [{ type: 'marker-active' }, { type: 'brush' }],
  //             };
  //             break;
  //         case "bidirectional-bar-chart-horizontal":
  //         case "bidirectional-bar-chart-vertical":
  //             manipulateData("with1String");
  //             chartRefs.current.config = {
  //                 data: state.dataWith1String,
  //                 xField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
  //                 xAxis: { position: 'bottom' },
  //                 yField: state.numericColumnNames,
  //                 meta: chartRefs.current.numericColumnsFormat,
  //                 label: getLabelStr,
  //                 isGroup: chartRefs.current.chartSettings.isGrouped,
  //                 isStack: chartRefs.current.chartSettings.isStack,
  //                 isPercent: chartRefs.current.chartSettings.isPercent,
  //                 // scrollbar: { type: 'vertical' },
  //                 legend: chartRefs.current.chartSettings.legendActive && {
  //                     title: chartRefs.current.chartSettings.chartTitle && {
  //                         text: chartRefs.current.chartSettings.chartTitle,
  //                         style: legendStyle
  //                     },
  //                     slidable: true,
  //                     position: chartRefs.current.chartSettings.legendPosition,
  //                     layout: chartRefs.current.chartSettings.legendLayout,
  //                 },
  //                 autoFit: chartRefs.current.chartSettings.autoFitActive,
  //                 width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
  //                 height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
  //                 tooltip: tooltipStr,
  //                 layout: chartName === "bidirectional-bar-chart-vertical" && 'vertical',
  //                 interactions: [{ type: 'marker-active' }, { type: 'brush' }],
  //             };
  //             break;
  //     }
  //     setState({ ...state, dataWith1Numeric: state.dataWith1Numeric, dataWith1String: state.dataWith1String, numericColumnNames: state.numericColumnNames });
  // }
  // /* USEEFFECTS */
  // useEffect(() => {
  //     if (props.dataGridState && props.dataGridState.tableState) {
  //         // fullData EKLENSE DE YİNE DE TÜM DATA DÖNMEDİ CEMDEN YANIT BEKLENİYOR.
  //         props.dataGridState.tableState.gridParams = { ...props.dataGridState.tableState.gridParams, applyPagination: false }
  //     }
  //     queryDataGet(props.dataGridState || { templateName }, true).then(result => {
  //         initChart(result);
  //     }).catch((errMsg) => {
  //         console.log('error', errMsg);
  //         notification.error({
  //             message: `Hata`,
  //             description: errMsg.Message,
  //             placement: 'bottomRight',
  //             duration: 8
  //         });
  //     })
  // }, [props.componentKey, templateName]);
  // useEffect(() => {
  //     if (strKey && chartRefs.current.numericColumns?.length > 0) {
  //         manageChartChange(chartName);
  //     }
  // }, [strKey, chartRefs.current.numericColumns?.length, isSync]);
  // useEffect(() => {
  //     chartRefs.current.config.geometryOptions = GetGeometryOptions(chartRefs.current.chartObject, (chartRefs.current.chartSettings.colNameGeom || settings?.colNameGeom), isDashboard);
  //     if (chartName === "dual-axis" && chartRefs.current.config.geometryOptions?.length > 0) {
  //         setIsGeometryOptionsReady(true);
  //     }
  //     else {
  //         //T O D O CANSU: Action required ?
  //     }
  // }, [isInit]);
  // const ChartRenderer = ({ chartName }) => {
  //     switch (chartName) {
  //         case "bar":
  //             return <Bar {...chartRefs.current.config} chartRef={ref} />;
  //         case "radial-bar":
  //             return <RadialBar {...chartRefs.current.config} chartRef={ref} />;
  //         case "line":
  //             return <Line {...chartRefs.current.config} chartRef={ref} />;
  //         case "area":
  //             return <Area {...chartRefs.current.config} chartRef={ref} />;
  //         case "column":
  //             return <Column {...chartRefs.current.config} chartRef={ref} />;
  //         case "radar-line":
  //             return <Radar {...chartRefs.current.config} chartRef={ref} />;
  //         case "pie":
  //             return <Pie {...chartRefs.current.config} chartRef={ref} />;
  //         case "dual-axis":
  //             return state.dataWith1String.length > 0 && isInit && isGeometryOptionsReady && isSync && <DualAxes {...chartRefs.current.config} chartRef={ref} />;
  //         case "bidirectional-bar-chart-horizontal":
  //             return <BidirectionalBar {...chartRefs.current.config} chartRef={ref} />;
  //         case "bidirectional-bar-chart-vertical":
  //             return <BidirectionalBar {...chartRefs.current.config} chartRef={ref} />;
  //     }
  // }
  // return (
  //     !isChartExist ? <div style={{ height: '75vh', textAlign: "center", justifyContent: 'center', alignItems: 'center' }}>
  //         <Result
  //             status="warning"
  //             title={<>Grafik oluşturulabilmesi için en az 1 numerik kolon bulunmalıdır. <br /> Sorgu sonucu kolonlarında değişiklik yaparak tekrar deneyin.</>}
  //         />
  //     </div> :
  //         <>
  //             {isDashboard ? <Row>
  //                 <Col span={24}> {(state.dataWith1String.length > 0 || state.dataWith1Numeric.length > 0) && isInit && isGeometryOptionsReady && isSync ?
  //                     <div style={{ ...style }}>
  //                         <div style={{ height: '85vh', width: '95vw' }}> <ChartRenderer chartName={chartRefs.current.selectedChart} />  </div>
  //                         <Button type="default" onClick={downloadImage} style={{ marginRight: 24 }}>
  //                             <ExportOutlined />  Resmini indir
  //                         </Button>
  //                         <Button type="default" onClick={() => setVisible(true)} style={{ marginRight: 24 }}>
  //                             <SettingOutlined /> Ayarlar
  //                         </Button>
  //                     </div>
  //                     : <div style={{ ...style, textAlign: "center", justifyContent: 'center', alignItems: 'center' }}>
  //                         <LoadingOutlined /><h3> Grafik yükleniyor, Lütfen bekleyin...</h3>
  //                     </div>}
  //                 </Col>
  //             </Row> :
  //                 <Row>
  //                     <Col span={24}> {
  //                         <div style={{ height: '75vh', width: '90vw' }}> <ChartRenderer chartName={chartRefs.current.selectedChart} />  </div>
  //                     }
  //                     </Col>
  //                     <Button type="default" onClick={downloadImage} style={{ marginRight: 24 }}>
  //                         <ExportOutlined />  Resmini indir
  //                     </Button>
  //                     <Button type="default" onClick={() => setVisible(true)} style={{ marginRight: 24 }}>
  //                         <SettingOutlined /> Ayarlar
  //                     </Button>
  //                 </Row>}
  //             {visible && <Settings
  //                 settingsObj={settings}
  //                 isDashboard={isDashboard}
  //                 onSaveChartSettings={saveSettings}
  //                 isVisible={visible} selectedChart={chartRefs.current.selectedChart} strKey={strKey} strColumns={chartRefs.current.strColumns}
  //                 numericColumns={chartRefs.current.numericColumns}
  //                 numericColumnsFiltered={chartRefs.current.numericColumnsFiltered}
  //                 handleSelectedChart={(value) => {
  //                     chartRefs.current.selectedChart = value;
  //                     chartRefs.current.chartSettings.labelActive = (value === "pie");
  //                     chartRefs.current.chartSettings.axisVisibility["xAxis"] = (value === "radar-line");
  //                     chartRefs.current.chartSettings.axisVisibility["yAxis"] = (value === "radar-line");
  //                 }}
  //                 handleStrFieldMenuClick={(item) => setStrKey(item.key)}
  //                 applySettings={applySettings} onClose={() => setVisible(false)}
  //                 handleNumFieldChange={handleNumFieldChange}
  //                 isReverseData={chartRefs.current.chartSettings.isReverseData}
  //                 handleReverseData={(checked) => chartRefs.current.chartSettings.isReverseData = checked}
  //                 chartObject={chartRefs.current.chartObject}
  //                 strKey={strKey}
  //                 sliderColor={sliderColor}
  //                 showSlider={chartRefs.current.chartSettings.showSlider}
  //                 handleSliderShowCheck={(checked) => chartRefs.current.chartSettings.showSlider = checked}
  //                 handleSliderColorChange={(color) => setSliderColor(color.hex)}
  //                 axisVisibility={chartRefs.current.chartSettings.axisVisibility}
  //                 axisLineColor={chartRefs.current.chartSettings.axisLineColor}
  //                 axisLineShape={chartRefs.current.chartSettings.axisLineShape}
  //                 axisLineWidth={chartRefs.current.chartSettings.axisLineWidth}
  //                 axisTitle={chartRefs.current.chartSettings.axisTitle}
  //                 handleAxisTitle={(value) => chartRefs.current.chartSettings.axisTitle[chartRefs.current.selectedAxis] = value}
  //                 handleAxisLineWidth={(value) => chartRefs.current.chartSettings.axisLineWidth[chartRefs.current.selectedAxis] = value}
  //                 handleAxisColorChange={(color, selectedAxis) => { chartRefs.current.chartSettings.axisLineColor[selectedAxis] = color.hex; }}
  //                 // handleAxisLineWidthChange={(width, selectedAxis) => { chartRefs.current.chartSettings.axisLineWidth[selectedAxis] = width; }}
  //                 handleAxisShowCheck={(checked, selectedAxis) => { chartRefs.current.chartSettings.axisVisibility[selectedAxis] = checked }}
  //                 handleLineTypeSelect={(key, selectedAxis) => { chartRefs.current.chartSettings.axisLineShape[selectedAxis] = key; }}
  //                 autoFitActive={chartRefs.current.chartSettings.autoFitActive}
  //                 handleAutoFitActive={(checked) => chartRefs.current.chartSettings.autoFitActive = checked}
  //                 chartWidth={chartRefs.current.chartSettings.chartWidth}
  //                 handleChartWidth={(value) => chartRefs.current.chartSettings.chartWidth = parseInt(value)}
  //                 chartHeight={chartRefs.current.chartSettings.chartHeight}
  //                 handleChartHeight={(value) => chartRefs.current.chartSettings.chartHeight = parseInt(value)}
  //                 labelActive={chartRefs.current.chartSettings.labelActive}
  //                 labelPosition={chartRefs.current.chartSettings.labelPosition}
  //                 labelFontSize={chartRefs.current.chartSettings.labelFontSize}
  //                 isLabelRotate={chartRefs.current.chartSettings.isLabelRotate}
  //                 handleLabelRotate={(checked) => chartRefs.current.chartSettings.isLabelRotate = checked}
  //                 handleLabelFontSize={(value) => { chartRefs.current.chartSettings.labelFontSize = parseInt(value); }}
  //                 handleLabelPosition={(value) => { chartRefs.current.chartSettings.labelPosition = value }}
  //                 handleLabelActive={(checked) => chartRefs.current.chartSettings.labelActive = checked}
  //                 labelColor={chartRefs.current.chartSettings.selectedLabelColor}
  //                 handleLabelColor={(color) => {
  //                     chartRefs.current.chartSettings.selectedLabelColor = color.hex;
  //                     chartRefs.current.chartSettings.isCustomLabelColor = true
  //                 }}
  //                 legendActive={chartRefs.current.chartSettings.legendActive}
  //                 handleLegendActive={(checked) => chartRefs.current.chartSettings.legendActive = checked}
  //                 legendPosition={chartRefs.current.chartSettings.legendPosition}
  //                 handleLegendPosition={(value) => chartRefs.current.chartSettings.legendPosition = value}
  //                 legendLayout={chartRefs.current.chartSettings.legendLayout}
  //                 handleLegendLayout={(value) => chartRefs.current.chartSettings.legendLayout = value}
  //                 isTooltipTitleActive={chartRefs.current.chartSettings.isTooltipTitleActive}
  //                 handleIsTooltipTitleActive={(checked) => chartRefs.current.chartSettings.isTooltipTitleActive = checked}
  //                 isAutoTooltipTitle={chartRefs.current.chartSettings.isAutoTooltipTitle}
  //                 handleIsAutoTooltipTitle={(checked) => chartRefs.current.chartSettings.isAutoTooltipTitle = checked}
  //                 customTooltipTitle={chartRefs.current.chartSettings.customTooltipTitle}
  //                 handleCustomTooltipTitle={(value) => chartRefs.current.chartSettings.customTooltipTitle = value}
  //                 showChartTitle={chartRefs.current.showChartTitle}
  //                 handleShowChartTitle={(checked) => chartRefs.current.chartSettings.showChartTitle = checked}
  //                 chartTitle={chartRefs.current.chartSettings.chartTitle}
  //                 handleChartTitle={(value) => chartRefs.current.chartSettings.chartTitle = value}
  //                 handleGeomTypeChange={(value, currentColorColName) => {
  //                     chartRefs.current.currentGeomType = value;
  //                     if (currentColorColName) {
  //                         let index = chartRefs.current.chartObject.findIndex(x => x.Path === currentColorColName);
  //                         chartRefs.current.chartObject[index].geomType = value;
  //                     }
  //                 }}
  //                 isGrouped={chartRefs.current.chartSettings.isGrouped}
  //                 isStacked={chartRefs.current.chartSettings.isStack}
  //                 isPercent={chartRefs.current.chartSettings.isPercent}
  //                 selectedDataViewMode={chartRefs.current.chartSettings.selectedDataViewMode}
  //                 handleDataViewModeChange={(value) => chartRefs.current.chartSettings.selectedDataViewMode = value}
  //                 dataLimitCount={chartRefs.current.chartSettings.dataLimitCount}
  //                 handleDataLimitCount={(value) => chartRefs.current.chartSettings.dataLimitCount = value}
  //             />}
  //         </>
  // );
};

var _default = DynamicChart;
exports.default = _default;