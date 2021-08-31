"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React, { useState, useRef } from 'react';
// import {
//     Tabs, Drawer, Button, Select, Checkbox, Row, Col, Tooltip, Radio, Collapse, Input, Layout, Space, InputNumber
// } from 'antd';
var Settings = function Settings() {
  return /*#__PURE__*/_react.default.createElement("div", null, "hello from setting...");
};

var _default = Settings; // import { CloseOutlined, CheckCircleOutlined, SaveOutlined } from "@ant-design/icons";
// import { SketchPicker } from 'react-color';
// import i18n from '../../i18n';
// const chartTypes = require("./Constants").ChartTypes;
// const chartAxisLineShapes = require("./Constants").ChartAxisLineShapes;
// const legendPositionTypes = require("./Constants").LegendPositionTypes;
// const labelPositionTypes = require("./Constants").LabelPositionTypes;
// const dataViewModes = require("./Constants").DataViewModes;
// const GetChartColors = require("./Utils").GetChartColors;
// const GetChartGeometry = require("./Utils").GetChartGeometry;
// const ColorAddUpdate = require("./Utils").ColorAddUpdate;
// const styles = {
//     verticallyCenteredColStyle: {
//         display: 'inline-flex', justifyContent: 'left', alignItems: 'center',
//         '& span': { display: 'inline-block', verticalAlign: 'middle' }
//     } // aligns vertically center the child span element
// }
// const Settings = ({ settingsObj, isDashboard, onSaveChartSettings, isVisible, applySettings, onClose, selectedChart, selectedDataViewMode,
//     handleDataViewModeChange, handleSelectedChart, handleStrFieldMenuClick,
//     strColumns, strKey, numericColumns, numericColumnsFiltered, handleNumFieldChange, isReverseData, handleReverseData, chartObject, sliderColor,
//     handleSliderShowCheck, showSlider, handleSliderColorChange, axisVisibility, axisTitle, handleAxisTitle, axisLineColor, axisLineShape, axisLineWidth, handleAxisLineWidth, handleAxisColorChange,
//     handleAxisShowCheck, handleLineTypeSelect, autoFitActive, handleAutoFitActive, chartWidth, handleChartWidth, chartHeight,
//     handleChartHeight, labelActive, isLabelRotate, handleLabelRotate, handleLabelActive, labelPosition, handleLabelPosition, labelColor, handleLabelColor,
//     labelFontSize, handleLabelFontSize, legendActive, handleLegendActive, legendPosition, handleLegendPosition, legendLayout,
//     handleLegendLayout, isTooltipTitleActive, handleIsTooltipTitleActive, customTooltipTitle, handleCustomTooltipTitle, isAutoTooltipTitle,
//     handleIsAutoTooltipTitle, showChartTitle, handleShowChartTitle, chartTitle, handleChartTitle, handleGeomTypeChange, isGrouped, isStacked, isPercent,
//     dataLimitCount, handleDataLimitCount }) => {
//     const { TabPane } = Tabs;
//     const { Option } = Select;
//     const { Panel } = Collapse;
//     const [visible, setVisible] = useState(isVisible);
//     const [currentColorColName, setCurrentColorColName] = useState(numericColumnsFiltered?.length > 0 ? numericColumnsFiltered[0].ColumnName
//         : numericColumns?.length > 0 ? numericColumns[0].ColumnName : null);
//     const [currentGeomType, setCurrentGeomType] = useState(GetChartGeometry(currentColorColName, chartObject));
//     const [state, setState] = useState({
//         selectedChart, strKey, currentAxis: 'xAxis', axisVisibility, axisTitle, axisLineColor, axisLineShape, axisLineWidth, autoFitActive, labelActive, labelColor, legendActive, isLabelRotate,
//         isTooltipTitleActive, isAutoTooltipTitle, isGrouped, isStacked, isPercent, isReverseData, selectedColor: GetChartColors(currentColorColName, chartObject),
//         dataLimitCount, handleDataLimitCount, chartWidth, chartHeight
//     });
//     const settingRefs = useRef({
//         currentAxis: 'xAxis',
//         settingsObj: settingsObj ||
//         {
//             chartType: selectedChart,
//             categoryField: strKey,
//             valField: numericColumnsFiltered?.map(x => x.ColumnName),
//             selectedDataViewMode: "group",
//             isGrouped: isGrouped,
//             isStacked: isStacked,
//             isPercent: isPercent,
//             isReverseData: isReverseData,
//             colNameColor: [],
//             colNameGeom: [],
//             showSlider: showSlider,
//             showChartTitle: showChartTitle,
//             chartTitle: chartTitle,
//             autoFitActive: autoFitActive,
//             chartWidth: chartWidth,
//             chartHeight: chartHeight,
//             labelActive: labelActive,
//             labelPosition: labelPosition,
//             labelFontSize: labelFontSize,
//             labelColor: labelColor,
//             isLabelRotate: isLabelRotate,
//             legendActive: legendActive,
//             legendPosition: legendPosition,
//             legendLayout: legendLayout,
//             isTooltipTitleActive: isTooltipTitleActive,
//             isAutoTooltipTitle: isAutoTooltipTitle,
//             customTooltipTitle: customTooltipTitle,
//             axisVisibility: { xAxis: false, yAxis: false },
//             axisTitle: { xAxis: "", yAxis: "" },
//             dataLimitCount: 0 // no limit
//         }
//     });
//     const renderTabBar = (props, DefaultTabBar) => (
//         <DefaultTabBar {...props} style={{ top: 0 }} />
//     );
//     const tabBody =
//         <><TabPane tab="Grafik" key="1">
//             <Row gutter={[8, 8]} justify="center">
//                 <Col span={24}>
//                     <h3>Grafik Türü</h3>
//                 </Col>
//                 <Col span={24}>
//                     <Select defaultValue={state.selectedChart} style={{ width: "100%" }} onSelect={(value) => {
//                         setState({ ...state, selectedChart: value, labelActive: (value === "pie") });
//                         settingRefs.current.settingsObj.chartType = value;
//                         settingRefs.current.settingsObj.labelActive = (value === "pie");
//                         settingRefs.current.settingsObj.axisVisibility["xAxis"] = (value === "radar-line");
//                         settingRefs.current.settingsObj.axisVisibility["yAxis"] = (value === "radar-line");
//                         handleSelectedChart(value);
//                     }}>
//                         {(() => chartTypes.map((item) => {
//                             return <Option value={item}>{i18n.t(item)}</Option>
//                         }))()}
//                     </Select>
//                 </Col>
//                 <Col span={24} style={{ paddingTop: 30 }}>
//                     <h3>Veriler</h3>
//                 </Col>
//                 <Col span={10} style={styles.verticallyCenteredColStyle}>
//                     <span>Kategori :</span>
//                 </Col>
//                 <Col span={14}>
//                     <Select defaultValue={state.strKey} style={{ width: "100%" }}
//                         onSelect={(value) => {
//                             setState({ ...state, strKey: value });
//                             settingRefs.current.settingsObj.categoryField = value;
//                             handleStrFieldMenuClick(value);
//                         }}>
//                         {strColumns.map((item) => {
//                             return <Option value={item.ColumnName.replace('.', '_')}>{item.DisplayName}</Option>
//                         })}
//                     </Select>
//                 </Col>
//                 <Col span={10} style={styles.verticallyCenteredColStyle}>
//                     <span>Değer : </span>
//                 </Col>
//                 <Col span={14}>
//                     {<Select
//                         mode="multiple"
//                         allowClear
//                         style={{ width: '100%' }}
//                         placeholder="Seçiniz"
//                         defaultValue={numericColumnsFiltered?.map(x => x.ColumnName)}
//                         onChange={(value) => { settingRefs.current.settingsObj.valField = value; handleNumFieldChange(value); }}
//                     >
//                         {numericColumns?.map((item) => <Option key={item.ColumnName} value={item.ColumnName}>{item.DisplayName}</Option>)}
//                     </Select>}
//                 </Col>
//                 <Col span={10} style={styles.verticallyCenteredColStyle}>
//                     <Tooltip title={<> <p> Grup gösterimi ve Yığın gösteriminden biri kullanılabilir.</p>
//                         <p>Yüzdelik gösterimin kullanılabilmesi için Grup veya Yığın gösterimi seçilmiş olmalıdır. </p> </>} mouseEnterDelay="0.1">
//                         <span> Veri Gösterim Türü : </span>
//                     </Tooltip>
//                 </Col>
//                 <Col span={14}>
//                     {<Select
//                         mode="multiple"
//                         allowClear
//                         style={{ width: '100%' }}
//                         placeholder="Seçiniz"
//                         defaultValue={selectedDataViewMode}
//                         onChange={(value) => {
//                             settingRefs.current.settingsObj.selectedDataViewMode = value;
//                             setState({ ...state, isGrouped: value.includes("group") });
//                             setState({ ...state, isStacked: value.includes("stack") });
//                             setState({ ...state, isPercent: value.includes("percent") });
//                             settingRefs.current.settingsObj.isGrouped = value.includes("group");
//                             settingRefs.current.settingsObj.isStacked = value.includes("stack");
//                             settingRefs.current.settingsObj.isPercent = value.includes("percent");
//                             handleDataViewModeChange(value);
//                         }}
//                     >
//                         <Option key={"group"} value={"group"}
//                             disabled={settingRefs.current.settingsObj.isStacked}>{"Grup gösterimi"}</Option>
//                         <Option key={"stack"} value={"stack"}
//                             disabled={settingRefs.current.settingsObj.isGrouped}>{"Yığın gösterimi"}</Option>
//                         <Option key={"percent"} value={"percent"}
//                             disabled={!(settingRefs.current.settingsObj.isStacked || settingRefs.current.settingsObj.isGrouped)}
//                         >{"Yüzdelik gösterimi"}</Option>
//                     </Select>}
//                 </Col>
//                 <Col span={10} style={styles.verticallyCenteredColStyle}>
//                     <Tooltip title={<> <p> Gösterilecek kayıt sayısı sınırı. Sınırı kaldırmak için 0 girebilir veya boş bırakabilirsiniz.</p> </>} mouseEnterDelay="0.1">
//                         <span> Veri sınırı : </span>
//                     </Tooltip>
//                 </Col>
//                 <Col span={14}>
//                     <Input min={200} max={1920} style={{ textAlign: 'right' }} value={state.dataLimitCount} defaultValue={state.dataLimitCount}
//                         size="small" onChange={(event) => {
//                             const { value } = event.target;
//                             if (isNaN(value)) {
//                                 return;
//                             } else if (!value) {
//                                 setState({ ...state, dataLimitCount: 0 });
//                             } else {
//                                 setState({ ...state, dataLimitCount: value });
//                             }
//                             settingRefs.current.settingsObj.dataLimitCount = parseInt(value);
//                             handleDataLimitCount(parseInt(value));
//                         }} />
//                 </Col>
//                 <Col span={24} style={{ paddingTop: 10 }}>
//                     <Checkbox defaultChecked={state.isReverseData} onChange={(event) => {
//                         const { checked } = event.target;
//                         setState({ ...state, isReverseData: checked });
//                         settingRefs.current.settingsObj.isReverseData = checked;
//                         handleReverseData(checked)
//                     }}>Veri sıralamasını tersine çevir</Checkbox>
//                 </Col>
//                 <Col span={24} style={{ paddingTop: 30 }}>
//                     <h3>Grafik Biçimi</h3>
//                 </Col>
//                 <Col span={14}>
//                     <Select defaultValue={numericColumnsFiltered?.filter(x => x.ColumnName === currentColorColName)[0]?.DisplayName} style={{ width: "100%" }}
//                         onSelect={(key) => {
//                             setCurrentColorColName(key.replace('_', '.'));
//                             setCurrentGeomType(GetChartGeometry(key.replace('_', '.'), chartObject));
//                             setState({ ...state, selectedColor: GetChartColors(key.replace('_', '.'), chartObject) });
//                         }}>
//                         {numericColumnsFiltered.map((col) => <Option value={col.ColumnName.replace('.', '_')}>{col.DisplayName}</Option>)}
//                         {/* {chartObject.map((col) => <Option value={col.ColumnName.replace('.', '_')}>{col.DisplayName}</Option>)} */}
//                     </Select>
//                 </Col>
//                 <Col span={10} type="flex" align="right" >
//                     <Tooltip title={<SketchPicker
//                         color={state.selectedColor}
//                         onChangeComplete={(color) => {
//                             setState({ ...state, selectedColor: color.hex });
//                             settingRefs.current.settingsObj = ColorAddUpdate(settingRefs.current.settingsObj, currentColorColName, color.hex);
//                             let colorIndex = chartObject.findIndex(x => x["Path"] === currentColorColName);
//                             chartObject[colorIndex]["color"] = color.hex;
//                         }}
//                     />} color="white" trigger={['click']}>
//                         {state.selectedColor && <div style={{ width: 40, height: 20, backgroundColor: state.selectedColor }} ></div>}
//                     </Tooltip>
//                 </Col>
//                 <Col span={10} style={styles.verticallyCenteredColStyle}>
//                     <span> Kolon grafik tipi : </span>
//                 </Col>
//                 <Col span={14}>
//                     <Tooltip title={"Yalnızca çift eksen tipindeki grafiklerde kullanılabilir. "}>
//                         {currentGeomType &&
//                             <Select value={GetChartGeometry(currentColorColName, chartObject)} style={{ width: "100%" }} disabled={(state.selectedChart !== "dual-axis")}
//                                 onChange={(value) => {
//                                     let settingsIndex = settingRefs.current.settingsObj.colNameGeom.findIndex(x => x["colName"] === currentColorColName);
//                                     // TODO CANSU Utils/GeomAddUpdate fonksiyonunu çağırabilirsin.
//                                     if (settingsIndex == -1) {
//                                         // add
//                                         settingRefs.current.settingsObj.colNameGeom.push({ colName: currentColorColName, geometry: value });
//                                     } else {
//                                         // update
//                                         settingRefs.current.settingsObj.colNameGeom[settingsIndex]["geometry"] = value;
//                                     }
//                                     setCurrentGeomType(value);
//                                     handleGeomTypeChange(value, currentColorColName);
//                                 }}>
//                                 <Option value="column" >Column </Option>
//                                 <Option value="line">  Line</Option>
//                             </Select>}
//                     </Tooltip>
//                 </Col>
//                 <Col span={24}>
//                     <h3>Slider</h3>
//                 </Col>
//                 <Col span={12}>
//                     <Checkbox defaultChecked={showSlider} onChange={(event) => {
//                         const { checked } = event.target;
//                         settingRefs.current.settingsObj.showSlider = checked;
//                         handleSliderShowCheck(checked);
//                     }}> Slider göster</Checkbox>
//                 </Col>
//                 <Col span={8} type="flex" align="right" style={styles.verticallyCenteredColStyle}>
//                     <span>Slider Rengi :</span>
//                 </Col>
//                 <Col span={4} type="flex" align="right" >
//                     {showSlider && <Tooltip title={<SketchPicker color={sliderColor}
//                         onChangeComplete={(color) => { settingRefs.current.settingsObj.sliderColor = color.hex; handleSliderColorChange(color); }} />} color="white" trigger={['click']}>
//                         <div style={{ width: 40, height: 20, backgroundColor: sliderColor }}></div>
//                     </Tooltip>}
//                 </Col>
//             </Row>
//         </TabPane>
//             <TabPane tab="Eksen" key="2">
//                 <Row gutter={[12, 12]}>
//                     <Col span={24} type="flex" justify="center" align="middle" >
//                         <Radio.Group defaultValue={state.currentAxis} buttonStyle="solid" onChange={(event) => {
//                             setState({ ...state, currentAxis: event.target.value });
//                         }}>
//                             <Radio.Button value="xAxis">Yatay Eksen</Radio.Button>
//                             <Radio.Button value="yAxis">Dikey Eksen</Radio.Button>
//                         </Radio.Group>
//                     </Col>
//                     <Col span={24}>
//                         <Checkbox checked={state.axisVisibility[state.currentAxis]} onChange={(event) => {
//                             const { checked } = event.target;
//                             state.axisVisibility[state.currentAxis] = checked;
//                             setState({ ...state, axisVisibility: state.axisVisibility });
//                             settingRefs.current.settingsObj.axisVisibility[state.currentAxis] = checked;
//                             handleAxisShowCheck(checked, state.currentAxis);
//                         }}> Eksen çizgisini göster</Checkbox>
//                     </Col>
//                     <Col span={10} style={styles.verticallyCenteredColStyle}>
//                         <span>Çizgi türü : </span>
//                     </Col>
//                     {state.currentAxis && <Col span={14}>
//                         <Select value={state.axisLineShape[state.currentAxis]} style={{ width: "100%" }} disabled={!state.axisVisibility[state.currentAxis]}
//                             onSelect={(value) => {
//                                 state.axisLineShape[state.currentAxis] = value;
//                                 setState({ ...state, axisLineShape: state.axisLineShape });
//                                 settingRefs.current.settingsObj.axisLineShape[state.currentAxis] = value;
//                                 handleLineTypeSelect(value, state.currentAxis);
//                             }}>
//                             {chartAxisLineShapes.map((shape) => <Option value={shape}>{i18n.t(shape)}</Option>)}
//                         </Select>
//                     </Col>}
//                     <Col span={10} style={styles.verticallyCenteredColStyle}>
//                         <span>  Çizgi kalınlığı : </span>
//                     </Col>
//                     {state.currentAxis && <Col span={14}>
//                         <Select value={state.axisLineWidth[state.currentAxis]} style={{ width: "100%", textAlign: 'right' }} disabled={!state.axisVisibility[state.currentAxis]}
//                             onSelect={(value) => {
//                                 state.axisLineWidth[state.currentAxis] = value;
//                                 setState({ ...state, axisLineWidth: state.axisLineWidth });
//                                 settingRefs.current.settingsObj.axisLineWidth[state.currentAxis] = value;
//                                 handleAxisLineWidth(value);
//                             }}>
//                             {Array(8).fill().map((_, id) => id + 1).map((size) =>
//                                 <Option value={size}>{size + "px"}</Option>)}
//                         </Select>
//                     </Col>}
//                     <Col span={10}>
//                         Eksen rengi :
//                     </Col>
//                     {state.currentAxis && <Col span={14}>
//                         <Tooltip title={
//                             <SketchPicker color={state.axisLineColor[state.currentAxis]}
//                                 onChangeComplete={(color) => {
//                                     settingRefs.current.settingsObj.axisLineColor[state.currentAxis] = color.hex;
//                                     let axisLineColorObj = {}; axisLineColorObj[state.currentAxis] = color.hex;
//                                     setState({ ...state, axisLineColor: axisLineColorObj });
//                                     handleAxisColorChange(color, state.currentAxis);
//                                 }} />
//                         } color="white" trigger={['click']}>
//                             <div style={{ width: 40, height: 20, backgroundColor: settingRefs.current.settingsObj.axisLineColor[state.currentAxis] }}></div>
//                         </Tooltip>
//                     </Col>}
//                     <Col span={10} style={styles.verticallyCenteredColStyle}>
//                         <span>Eksen başlığı :</span>
//                     </Col>
//                     <Col span={14}>
//                         <Input value={state.axisTitle[state.currentAxis]}
//                             onChange={(event) => {
//                                 const { value } = event.target;
//                                 state.axisTitle[state.currentAxis] = value;
//                                 setState({ ...state, axisTitle: state.axisTitle });
//                                 settingRefs.current.settingsObj.axisTitle[state.currentAxis] = value;
//                                 handleAxisTitle(value);
//                             }} />
//                     </Col>
//                 </Row>
//             </TabPane>
//             <TabPane tab="Görünüm" key="3">
//                 <Collapse defaultActiveKey={['31']} onChange={(key) => { console.log(key) }} style={{ width: "100%" }} >
//                     <Panel header="Başlık" key="31">
//                         <Row gutter={[8, 8]}>
//                             <Col span={24}>
//                                 <Checkbox defaultChecked={showChartTitle}
//                                     onChange={(event) => {
//                                         const { checked } = event.target;
//                                         settingRefs.current.settingsObj.showChartTitle = checked;
//                                         handleShowChartTitle(checked);
//                                     }}> Grafik başlığı gösterilsin </Checkbox>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Grafik başlığı :</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Input defaultValue={chartTitle}
//                                     onChange={(event) => {
//                                         const { value } = event.target;
//                                         settingRefs.current.settingsObj.chartTitle = value;
//                                         handleChartTitle(value);
//                                     }} />
//                             </Col>
//                         </Row>
//                     </Panel>
//                     <Panel header="Boyut" key="32">
//                         <Row gutter={[8, 8]}>
//                             <Col span={24}>
//                                 <Checkbox defaultChecked={autoFitActive}
//                                     onChange={(event) => {
//                                         const { checked } = event.target;
//                                         settingRefs.current.settingsObj.autoFitActive = checked;
//                                         setState({ ...state, autoFitActive: checked });
//                                         handleAutoFitActive(checked);
//                                     }}> Otomatik boyutlandır</Checkbox>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Genişlik:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Input min={200} max={1920} style={{ textAlign: 'right' }} addonAfter={"px"} value={state.chartWidth}
//                                     defaultValue={chartWidth} size="small" disabled={state.autoFitActive}
//                                     onChange={(event) => {
//                                         const { value } = event.target;
//                                         if (isNaN(value)) {
//                                             return;
//                                         }
//                                         setState({ ...state, chartWidth: value });
//                                         settingRefs.current.settingsObj.chartWidth = parseInt(value);
//                                         handleChartWidth(value);
//                                     }} />
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Yükseklik:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Input min={200} max={1920} style={{ textAlign: 'right' }} addonAfter={"px"} value={state.chartHeight}
//                                     defaultValue={chartHeight} size="small" disabled={state.autoFitActive}
//                                     onChange={(event) => {
//                                         const { value } = event.target;
//                                         if (isNaN(value)) {
//                                             return;
//                                         }
//                                         setState({ ...state, chartHeight: value });
//                                         settingRefs.current.settingsObj.chartHeight = parseInt(value);
//                                         handleChartHeight(value);
//                                     }} />
//                             </Col>
//                         </Row>
//                     </Panel>
//                     <Panel header="Etiket" key="33">
//                         <Row gutter={[8, 8]}>
//                             <Col span={24}>
//                                 <Tooltip title="Karşılık gelen verinin grafiğin üzerindeki veri noktalarında görünümünü sağlar." mouseEnterDelay="0.1">
//                                     <Checkbox defaultChecked={state.labelActive}
//                                         onChange={(event) => {
//                                             const { checked } = event.target;
//                                             settingRefs.current.settingsObj.labelActive = checked;
//                                             setState({ ...state, labelActive: checked });
//                                             handleLabelActive(checked);
//                                         }}> Etiketi göster</Checkbox>
//                                 </Tooltip>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Etiket Pozisyonu:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Select defaultValue={labelPosition} style={{ width: "100%" }} disabled={!state.labelActive}
//                                     onSelect={(value) => {
//                                         settingRefs.current.settingsObj.labelPosition = value;
//                                         handleLabelPosition(value);
//                                     }}>
//                                     {labelPositionTypes.map((position) => {
//                                         return <Option value={position}>{i18n.t(position)}</Option>
//                                     })}
//                                 </Select>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Yazı boyutu:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Input min={8} max={32} disabled={!state.labelActive}
//                                     style={{ textAlign: 'right' }}
//                                     defaultValue={labelFontSize}
//                                     onChange={(event) => {
//                                         const { value } = event.target;
//                                         settingRefs.current.settingsObj.labelFontSize = parseInt(value);
//                                         handleLabelFontSize(value);
//                                     }}
//                                     addonAfter={"px"}
//                                 />
//                             </Col>
//                             <Col span={10}>
//                                 Yazı rengi:
//                             </Col>
//                             <Col span={14}>
//                                 {
//                                     <Tooltip title={
//                                         <SketchPicker color={state.labelColor || 'black'}
//                                             onChangeComplete={(color) => {
//                                                 settingRefs.current.settingsObj.selectedLabelColor = color.hex;
//                                                 setState({ ...state, labelColor: color.hex });
//                                                 handleLabelColor(color);
//                                             }} />
//                                     } color="white" trigger={['click']}>
//                                         <div style={{ width: 40, height: 20, backgroundColor: state.labelColor || "black" }}></div>
//                                     </Tooltip>
//                                 }
//                             </Col>
//                             <Col span={24}>
//                                 <Checkbox defaultChecked={state.isLabelRotate}
//                                     onChange={(event) => {
//                                         const { checked } = event.target;
//                                         settingRefs.current.settingsObj.isLabelRotate = checked;
//                                         setState({ ...state, isLabelRotate: checked });
//                                         handleLabelRotate(checked);
//                                     }} disabled={!state.labelActive}> Etiketi döndür</Checkbox>
//                             </Col>
//                         </Row>
//                     </Panel>
//                     <Panel header="Lejant" key="34">
//                         <Row gutter={[8, 8]}>
//                             <Col span={24}>
//                                 <Checkbox defaultChecked={state.legendActive}
//                                     onChange={(event) => {
//                                         const { checked } = event.target;
//                                         settingRefs.current.settingsObj.legendActive = checked;
//                                         setState({ ...state, legendActive: checked });
//                                         handleLegendActive(checked);
//                                     }}> Lejant gösterilsin</Checkbox>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Lejant Pozisyonu:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Select defaultValue={legendPosition} style={{ width: "100%" }} disabled={!state.legendActive}
//                                     onSelect={(value) => {
//                                         settingRefs.current.settingsObj.legendPosition = value;
//                                         handleLegendPosition(value)
//                                     }}>
//                                     {legendPositionTypes.map((position) =>
//                                         <Option value={position}>{i18n.t(position)}</Option>)}
//                                 </Select>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>Lejant Açısı:</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Select defaultValue={legendLayout} style={{ width: "100%" }} disabled={!state.legendActive}
//                                     onSelect={(value) => { settingRefs.current.settingsObj.legendLayout = value; handleLegendLayout(value); }}>
//                                     <Option value="horizontal">{i18n.t("horizontal")}</Option>
//                                     <Option value="vertical">{i18n.t("vertical")}</Option>
//                                 </Select>
//                             </Col>
//                         </Row>
//                     </Panel>
//                     <Panel header="İpucu" key="35">
//                         <Row gutter={[8, 8]}>
//                             <Col span={24}>
//                                 <Tooltip title="İşaretlendiğinde grafik üzerine gelindiğinde gösterilen tooltipte veri başlığı gösterilir." mouseEnterDelay="0.1">
//                                     <Checkbox defaultChecked={state.isTooltipTitleActive}
//                                         onChange={(event => {
//                                             const { checked } = event.target;
//                                             settingRefs.current.settingsObj.isTooltipTitleActive = checked;
//                                             setState({ ...state, isTooltipTitleActive: checked });
//                                             handleIsTooltipTitleActive(checked);
//                                         })}> İpucu başlığı gösterilsin</Checkbox>
//                                 </Tooltip>
//                             </Col>
//                             <Col span={24}>
//                                 <Tooltip title="İşaretlendiğinde grafik üzerine gelindiğinde gösterilen tooltipte veri başlığı gösterilir." mouseEnterDelay="0.1">
//                                     <Checkbox defaultChecked={state.isAutoTooltipTitle}
//                                         onChange={(event) => {
//                                             const { checked } = event.target;
//                                             settingRefs.current.settingsObj.isAutoTooltipTitle = checked;
//                                             setState({ ...state, isAutoTooltipTitle: checked });
//                                             handleIsAutoTooltipTitle(checked);
//                                         }} disabled={!state.isTooltipTitleActive}> İpucu başlığı otomatik oluşturulsun </Checkbox>
//                                 </Tooltip>
//                             </Col>
//                             <Col span={10} style={styles.verticallyCenteredColStyle}>
//                                 <span>İpucu başlığı :</span>
//                             </Col>
//                             <Col span={14}>
//                                 <Input defaultValue={customTooltipTitle}
//                                     onChange={(event) => {
//                                         const { value } = event.target;
//                                         settingRefs.current.settingsObj.customTooltipTitle = value;
//                                         handleCustomTooltipTitle(value);
//                                     }} disabled={!state.isTooltipTitleActive || (state.isTooltipTitleActive && state.isAutoTooltipTitle)} />
//                             </Col>
//                         </Row>
//                     </Panel>
//                 </Collapse>
//             </TabPane>
//         </>;
//     return (
//         <>
//             <Drawer
//                 placement="right"
//                 onClose={onClose}
//                 visible={visible}
//                 getContainer={false}
//                 style={{ position: 'absolute', display: 'inline-flex' }}
//                 width={"35%"}
//                 height={"100%"}
//                 keyboard={true}
//                 closable={true}
//                 closeIcon={<CloseOutlined />}
//                 mask={false}
//                 maskClosable={false}
//                 headerStyle={{ border: 'none' }}
//                 footer={
//                     <Space>
//                         {!isDashboard && <Button type="default" onClick={(event) => {
//                             applySettings(settingRefs.current.settingsObj);
//                         }} icon={<CheckCircleOutlined />}>Uygula</Button>}
//                         {isDashboard && <Button type="default" onClick={(event) => { onSaveChartSettings(settingRefs.current.settingsObj); }} icon={<SaveOutlined />}>Kaydet</Button>}
//                     </Space>
//                 }
//             >
//                 <Tabs tabPosition="top"
//                     renderTabBar={renderTabBar}
//                     animated={true}
//                 >
//                     {tabBody}
//                 </Tabs>
//             </Drawer >
//         </>
//     )
// }
// export default Settings;

exports.default = _default;