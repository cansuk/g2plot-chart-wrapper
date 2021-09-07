import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from "react-dom";
import { Button, Menu, Select, Form, Steps, Tag, Collapse, message, Row, Col, notification, Result } from 'antd';
import { Line, Pie, Area, Column, DualAxes, BidirectionalBar, G2, Radar, RadialBar } from '@ant-design/charts';
import { SettingOutlined, DownOutlined, ExportOutlined, LoadingOutlined, InfoCircleOutlined } from "@ant-design/icons";

import { Bar } from '@antv/g2plot';

import moment from "moment";

// ----------------------------------- IMPORTS ------------------------------------------
// import Settings from './Settings';
// const GetChartColors = require("./Utils").GetChartColors;
// const GetSliderColor = require("./Utils").GetSliderColor;
// const GetAxisColor = require("./Utils").GetAxisColor;
// const GetChartGeometry = require("./Utils").GetChartGeometry;
// const GetGeometryOptions = require("./Utils").GetGeometryOptions;
// const ColorAddUpdate = require("./Utils").ColorAddUpdate;
// const GeomAddUpdate = require("./Utils").GeomAddUpdate;
// const CalcAverageValue = require("./Utils").CalcAverageValue;
// const dataViewModes = require("./Constants").DataViewModes;


// ---------------------------------------------------------------
// import Settings from './Settings';
// const GetChartColors = require("./Utils").GetChartColors;
// const GetSliderColor = require("./Utils").GetSliderColor;
// const GetAxisColor = require("./Utils").GetAxisColor;
// const GetChartGeometry = require("./Utils").GetChartGeometry;
// const GetGeometryOptions = require("./Utils").GetGeometryOptions;
// const ColorAddUpdate = require("./Utils").ColorAddUpdate;
// const GeomAddUpdate = require("./Utils").GeomAddUpdate;
// const CalcAverageValue = require("./Utils").CalcAverageValue;
// const dataViewModes = require("./Constants").DataViewModes;


// import React, { useState, useRef } from 'react';
// import {
//     Tabs, Drawer, Button, Select, Checkbox, Row, Col, Tooltip, Radio, Collapse, Input, Layout, Space, InputNumber
// } from 'antd';


const Settings = () => {
    return (
        <div>
            hello from setting...
        </div>
    )
}


const GetChartColors = (category, chartObj) => {
    return chartObj?.filter(x => x.Path === category)[0]?.color || randomColor();
};

const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();

const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();

const GetChartGeometry = (category, chartObj) => chartObj?.filter(x => x.Path === category)[0]?.geomType || "line";
const GetGeometryOptions = (chartObj, colNameGeom, isDashboard) => {
    let result = [];
    chartObj.forEach(obj => {
        if (isDashboard) {

            let geomObj = colNameGeom?.filter(x => x["colName"] === obj.Path);

            let geom = "line";
            if (geomObj && geomObj?.length === 1 && geomObj[0]) {
                geom = geomObj[0]["geometry"] || "line";
            }

            result.push(
                Object.assign({}, {
                    geometry: geom || GetChartGeometry(obj.Path, chartObj),
                    color: obj.color, smooth: true, connectNulls: false
                })
            );

        } else {
            result.push(Object.assign({}, {
                geometry: obj.geomType, color: obj.color, smooth: true, connectNulls: false
            }));
        }
    });
    return result;
};

const ColorAddUpdate = (obj, colName, color) => {
    if (!color) color = randomColor();
    if (!obj.colNameColor) { obj.colNameColor = []; }
    let settingsIndex = obj.colNameColor.findIndex(x => x["colName"] === colName);
    if (settingsIndex == -1) {
        // add
        obj.colNameColor.push({ colName: colName, color: color });
    } else {
        // update
        obj.colNameColor[settingsIndex]["color"] = color;
    }

    return obj;
}

const GeomAddUpdate = (obj, colName, geom) => {
    if (!obj.colNameGeom) { obj.colNameGeom = []; }
    let settingsIndex = obj.colNameGeom.findIndex(x => x["colName"] === colName);
    if (settingsIndex == -1) {
        // add
        obj.colNameGeom.push({ colName: colName, geometry: geom });
    } else {
        // update
        obj.colNameGeom[settingsIndex]["geometry"] = geom;
    }

    return obj;
}


const CalcAverageValue = (data, type, text) => {
    const items = data.filter(x => x[type] === text);
    return items.length ? (items.reduce((a, b) => a + b.value, 0) / items.length).toFixed(1) : '-'
};


const ChartTypes = [
    "bar",
    "radial-bar",
    "line",
    "pie",
    "area",
    "column",
    "dual-axis",
    "bidirectional-bar-chart-horizontal",
    "bidirectional-bar-chart-vertical",
    "radar-line",
];

const ChartAxisLineShapes = [
    "line",
    "dashedLine",
];

const LabelPositionTypes = [
    "auto",
    "top",
    "bottom",
    "middle",
    "right",
    "left",
];
const LegendPositionTypes = [
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left"
];

const dataViewModes = [
    { name: "group", value: "Grup gösterimi" },
    { name: "stack", value: "Yığın gösterimi" },
    { name: "percent", value: "Yüzdelik gösterim" }
]


// import { CloseOutlined, CheckCircleOutlined, SaveOutlined } from "@ant-design/icons";
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


// ----------------------------END OF IMPORT-----------------------------------


// netigma dependencies :
// import { queryDataGet } from '../datagrid/DataGridProps';
// import { dashboardServices } from "../../services/dashboard.services";


let chartData = [];

const randomColor = require('randomcolor');

const xField_with1string = "stringCol";
const seriesField_with1numeric = "category";

const initialBarConfig = {
    data: [],
    isGroup: true,
    xField: "value",
    yField: "stringColForNumeric",
    seriesField: seriesField_with1numeric,
    colorField: seriesField_with1numeric,
    theme: "light",
    //scrollbar: { type: 'vertical' },
};


const DynamicChart = (props) => {

    // useEffect(() => {
    //     // DOES NOT WORK !!!!
    //     console.log(
    //         "This only happens ONCE.  But it happens AFTER the initial render."
    //     );
    //     debugger;
    // }, []);
    // var chartContainer = React.createElement('div', { id: 'containerCansu' });
    const containerElement = document.getElementById("containerCansu");
    if (!containerElement) {
        const rootElement = document.getElementById("root");
        // ReactDOM.render(chartContainer, rootElement);

        let containerEl = document.createElement("div");
        containerEl.id = "containerCansu";
        rootElement.append(containerEl);
    }


    // TODO CANSU Gereksiz prop değişkenlerini sil.
    let { data, templateName, style, dataGridState, onSaveChartSettings, item, settings, isDashboard, chartName } = props;

    console.log("DynamicCharts data is :");
    console.log(data);

    if (settings && settings.chartType) {
        chartName = settings.chartType;
    } else if (!chartName) {
        chartName = "bar";
    }
    const params = dataGridState && dataGridState.tableState;

    const [state, setState] = useState({

        dataWith1Numeric: [], dataWith1String: [], numericColumnNames: []
    });

    const [isChartExist, setIsChartExist] = useState(true);
    const [isInit, setIsInit] = useState(false);
    const [isSync, setIsSync] = useState(false);
    const [visible, setVisible] = useState(false);
    const [strKey, setStrKey] = useState(null);
    const [sliderColor, setSliderColor] = useState(GetSliderColor(settings));
    const ref = useRef();

    const chartRefs = useRef({
        chart: <></>,
        config: { ...initialBarConfig, ...style },
        selectedChart: chartName,
        numericColumsn: [], strKeys: [],
        strCount: 0, selectedData: [], strColumns: [], numericColumnsFiltered: [],
        numericColumnsFormat: {},
        chartObject: [],
        geometryOptions: [],
        // chart settings :
        chartSettings: settings && isDashboard ? settings : {
            selectedDataViewMode: [dataViewModes[0].name],
            selectedAxis: 'xAxis',
            isAxisAutoSettings: true,
            axisVisibility: { xAxis: false, yAxis: false },
            axisLineShape: { xAxis: "line", yAxis: "line" },
            axisLineColor: { xAxis: "black", yAxis: "black" },
            axisLineWidth: { xAxis: 1, yAxis: 1 },
            axisTitle: { xAxis: "", yAxis: "" },
            legendActive: true,
            legendPosition: 'top-left',
            legendLayout: 'horizontal',
            autoFitActive: true,
            chartWidth: 700,
            chartHeight: 400,
            isGrouped: true,
            isStack: false,
            isPercent: false,
            isReverseData: false,
            labelActive: false,
            isCustomLabelColor: false,
            selectedLabelColor: 'black',
            labelFontSize: 12,
            isLabelRotate: false,
            labelPosition: 'auto',
            isTooltipTitleActive: true,
            isAutoTooltipTitle: true,
            customTooltipTitle: "",
            showTooltipCrosshairs: false,
            crosshairDirectionX: true,
            crosshairDirectionY: true,
            selectedCrosshairColor: 'red',
            showSlider: true,
            sliderColor: 'green',
            showChartTitle: false,
            chartTitle: '',
            currentGeomType: 'line',
            colNameColor: [],
            colNameGeom: [],
            dataLimitCount: 0
        }
    });

    if (!settings) {
        settings = //{ chartType: chartRefs.current.selectedChart, colNameColor: [], colNameGeom: [] }
        {
            chartType: chartRefs.current.selectedChart,
            categoryField: strKey,
            valField: chartRefs.current.numericColumnsFiltered?.map(x => x.ColumnName),
            selectedDataViewMode: [dataViewModes[0]?.name],
            isGrouped: chartRefs.current.chartSettings.isGrouped,
            isStacked: chartRefs.current.chartSettings.isStack,
            isPercent: chartRefs.current.chartSettings.isPercent,
            isReverseData: chartRefs.current.chartSettings.isReverseData,
            colNameColor: [],
            colNameGeom: [],
            showSlider: chartRefs.current.chartSettings.showSlider,
            showChartTitle: false,
            chartTitle: chartRefs.current.chartSettings.chartTitle,
            autoFitActive: chartRefs.current.chartSettings.autoFitActive,
            chartWidth: chartRefs.current.chartSettings.chartWidth,
            chartHeight: chartRefs.current.chartSettings.chartHeight,
            labelActive: chartRefs.current.chartSettings.labelActive,
            labelPosition: chartRefs.current.chartSettings.labelPosition,
            labelFontSize: chartRefs.current.chartSettings.labelFontSize,
            labelColor: chartRefs.current.chartSettings.labelColor,
            isLabelRotate: chartRefs.current.chartSettings.isLabelRotate,
            legendActive: chartRefs.current.chartSettings.legendActive,
            legendPosition: chartRefs.current.chartSettings.legendPosition,
            legendLayout: chartRefs.current.chartSettings.legendLayout,
            isTooltipTitleActive: chartRefs.current.chartSettings.isTooltipTitleActive,
            isAutoTooltipTitle: chartRefs.current.chartSettings.isAutoTooltipTitle,
            customTooltipTitle: chartRefs.current.chartSettings.customTooltipTitle,
            selectedAxis: chartRefs.current.chartSettings.selectedAxis,
            isAxisAutoSettings: chartRefs.current.chartSettings.isAxisAutoSettings,
            axisVisibility: chartRefs.current.chartSettings.axisVisibility,
            axisLineShape: chartRefs.current.chartSettings.axisLineShape,
            axisLineColor: chartRefs.current.chartSettings.axisLineColor,
            axisLineWidth: chartRefs.current.chartSettings.axisLineWidth,
            axisTitle: chartRefs.current.chartSettings.axisTitle,
            dataLimitCount: chartRefs.current.chartSettings.dataLimitCount
        }
    }

    const [isGeometryOptionsReady, setIsGeometryOptionsReady] = useState(chartRefs.current.selectedChart !== "dual-axis");


    /* CONFIG VARIABLES */
    // -- common config --
    const legendStyle = {
        fill: 'black', fontSize: 18,
        shadowColor: '#C0C0C0',
        shadowBlur: 10
    }
    // -- data with 1 numeric config -- 
    const legendNum = () =>
        chartRefs.current.chartSettings.legendActive && {
            title: chartRefs.current.chartSettings.chartTitle && {
                text: chartRefs.current.chartSettings.chartTitle,
                style: legendStyle
            },
            slidable: true,
            position: chartRefs.current.chartSettings.legendPosition,
            layout: chartRefs.current.chartSettings.legendLayout,
            itemName: {
                formatter: (text, item) => chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName
            },
        };
    const labelNum = !chartRefs.current.chartSettings.labelActive ? null : {
        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
        rotate: chartRefs.current.chartSettings.isLabelRotate,
    };
    const tooltipNum = {
        showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
        formatter: (item) =>
            ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
        showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
        crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
            type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
            text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
        } : {}
    };
    const xAxisNum = () => chartRefs.current.chartSettings.axisVisibility["xAxis"] ? {
        title: { text: chartRefs.current.chartSettings.axisTitle["xAxis"] },
        grid: {
            line: {
                style: {
                    stroke: GetAxisColor(chartRefs.current.chartSettings.axisLineColor, "xAxis"),//chartRefs.current.axisLineColor["xAxis"],
                    lineWidth: chartRefs.current.chartSettings.axisLineWidth["xAxis"],
                    lineDash: chartRefs.current.chartSettings.axisLineShape["xAxis"] === "line" ? null : [4, 5],
                    strokeOpacity: 0.7,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    cursor: 'pointer'
                }
            },
            // alternateColor: 'rgba(0,0,0,0.05)',
        }
    } : {};
    const yAxisNum = () => chartRefs.current.chartSettings.axisVisibility["yAxis"] ? {
        title: { text: chartRefs.current.chartSettings.axisTitle["yAxis"] },
        grid: {
            line: {
                style: {
                    stroke: chartRefs.current.chartSettings.axisLineColor["yAxis"],
                    lineWidth: chartRefs.current.chartSettings.axisLineWidth["yAxis"],
                    lineDash: chartRefs.current.chartSettings.axisLineShape["yAxis"] === "line" ? null : [4, 5],
                    strokeOpacity: 0.7,
                    shadowColor: 'black',
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    cursor: 'pointer'
                }
            }
        }
    } : {};
    const animationPathIn = {
        appear: {
            animation: 'path-in',
            duration: 5000,
            delay: 0,
        },
    };
    const animationZoomIn = {
        appear: {
            animation: 'zoom-in',
            duration: 1000,
            delay: 0,
        },
    };
    const animationScaleIn = {
        appear: {
            animation: 'scale-in',
            duration: 1000,
            delay: 0,
        },
    };

    // -- data with 1 string config -- 
    const getLabelStr = () => {
        if (!chartRefs.current.chartSettings.labelActive) return null;
        return {
            type: 'spider',
            labelHeight: 28,
            content: ({ percent }) => `${(percent * 100).toFixed(1)}%`,
            style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
            position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
            rotate: chartRefs.current.chartSettings.isLabelRotate,
            animate: true,
            layout: 'overlap',
        }
    }

    const tooltipPie = {
        showChartTitle: true,
        customContent: (title) => {
            return `<div style='padding:12px!important;'>${chartData[0][strKey?.replace('_', '.')].Value} - ${chartRefs.current.numericColumnsFormat[state.numericColumnNames[0]]?.alias} : ${chartRefs.current.numericColumnsFormat[state.numericColumnNames[0]]?.value}</div> `;
        }
    };
    // -- common configs end --



    const tooltipStr = {
        shared: true,
        showMarkers: false,
        showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
        showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
        // crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
        //     type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
        //     text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
        // } : {}        
    };

    let SetObjColor = (selectedKeys) => {
        // sets color to object and returns it back
        let index, existingColor, newColor = randomColor();
        let promise = new Promise((resolve, reject) => {
            let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
                index = chartRefs.current.chartObject.findIndex(x => x.Path === column.Path);
                existingColor = chartRefs.current.chartObject[index]?.color;

                if (!existingColor) {
                    settings = ColorAddUpdate(settings, column.Path, newColor);
                    return Object.assign({}, column, { color: newColor });
                } else {
                    settings?.colNameColor?.forEach((item, index) => {
                        if (!selectedKeys.includes(item.colName)) {
                            // Kaldırılan kolonun rengi de kaldırılmalı :
                            settings.colNameColor.splice(index, 1);
                        }
                    });
                    return Object.assign({}, column, { color: existingColor });
                }
            });

            resolve(result);

        });
        return promise;
    }

    let SetObjGeom = (selectedKeys) => {
        // sets geometry to object and returns it back
        let index, existingGeom, newGeom = "line"
        let promise = new Promise((resolve, reject) => {
            if (chartRefs.current.chartObject?.length === 0) reject("hata");

            let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
                index = chartRefs.current.chartObject.findIndex(x => { return x && x.Path === column.Path });
                existingGeom = chartRefs.current.chartObject[index]?.geometry;

                if (!existingGeom) {
                    settings = GeomAddUpdate(settings, column.Path, newGeom);
                    return Object.assign({}, column, { geometry: newGeom });
                } else {
                    settings?.colNameGeom?.forEach((item, index) => {
                        if (!selectedKeys.includes(item.colName)) {
                            // Kaldırılan kolonun geometrisi de kaldırılmalı :
                            settings.colNameGeom.splice(index, 1);
                        }
                    })

                    return Object.assign({}, column, { geometry: existingGeom });
                }
            });
            resolve(result);

        });
        return promise;
    }

    const showWarnings = (props) => {
        let { description } = props;
        notification.warning({
            message: `Uyarı`,
            description,
            placement: 'bottomRight'
        });
    }

    /* EVENT HANDLERS */
    const handleNumFieldChange = (selectedKeys) => {

        if (isDashboard) {

            chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter(x => selectedKeys.includes(x.ColumnName));
            if (chartRefs.current.selectedChart !== "dual-axis") {
                chartRefs.current.chartObject = SetObjColor(selectedKeys).then((result) => result);
            } else {
                SetObjColor(selectedKeys).then((result) => {
                    chartRefs.current.chartObject = result;
                    SetObjGeom(selectedKeys).then((result) => {
                        chartRefs.current.chartObject = result;
                    })
                });
            }
        } else {
            chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter(x => selectedKeys.includes(x.ColumnName));
            chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, { color: randomColor() }));
        }
        if (chartRefs.current.selectedChart === "dual-axis" && selectedKeys?.length < 2) {
            showWarnings({
                description: "Çift eksenli grafiğin kullanılabilmesi için minimum 2 değer kolonu seçilmelidir.",
            });
            return;
        }
    }

    const syncSettings = (settingsObj) => {
        let promise = new Promise((resolve, reject) => {
            if (!settingsObj) resolve(true);
            if (settingsObj.categoryField) {
                setStrKey(settingsObj.categoryField);
            }
            if (settingsObj.valField?.length > 0) {
                if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumnsFiltered.filter((col) => settingsObj.valField.includes(col.Path));
                } else {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns.filter((col) => settingsObj.valField.includes(col.Path));
                }
            }

            chartRefs.current.chartSettings.isReverseData = settingsObj.isReverseData;
            chartRefs.current.chartSettings.selectedDataViewMode = settingsObj.selectedDataViewMode;
            chartRefs.current.chartSettings.isGrouped = settingsObj.isGrouped;
            chartRefs.current.chartSettings.isStacked = settingsObj.isStacked;
            chartRefs.current.chartSettings.isPercent = settingsObj.isPercent;
            chartRefs.current.chartSettings.showSlider = settingsObj.showSlider;
            chartRefs.current.showChartTitle = settingsObj.showChartTitle;
            chartRefs.current.chartSettings.showChartTitle = settingsObj.showChartTitle;
            chartRefs.current.chartSettings.chartTitle = settingsObj.chartTitle;
            chartRefs.current.chartSettings.autoFitActive = settingsObj.autoFitActive;
            chartRefs.current.chartSettings.chartWidth = settingsObj.chartWidth;
            chartRefs.current.chartSettings.chartHeight = settingsObj.chartHeight;
            chartRefs.current.chartSettings.labelActive = settingsObj.labelActive;
            chartRefs.current.chartSettings.labelPosition = settingsObj.labelPosition;
            chartRefs.current.chartSettings.labelFontSize = settingsObj.labelFontSize;
            chartRefs.current.labelColor = settingsObj.labelColor;
            chartRefs.current.chartSettings.isLabelRotate = settingsObj.isLabelRotate;
            chartRefs.current.chartSettings.legendActive = settingsObj.legendActive;
            chartRefs.current.chartSettings.legendPosition = settingsObj.legendPosition;
            chartRefs.current.chartSettings.legendLayout = settingsObj.legendLayout;
            chartRefs.current.chartSettings.isTooltipTitleActive = settingsObj.isTooltipTitleActive;
            chartRefs.current.chartSettings.isAutoTooltipTitle = settingsObj.isAutoTooltipTitle;
            chartRefs.current.chartSettings.customTooltipTitle = settingsObj.customTooltipTitle;
            chartRefs.current.chartSettings.colNameColor = settingsObj.colNameColor;
            chartRefs.current.chartSettings.colNameGeom = settingsObj.colNameGeom;
            chartRefs.current.chartSettings.dataLimitCount = !(settingsObj.dataLimitCount) ? 0 : settingsObj.dataLimitCount;

            setIsSync(true);
            resolve(true);
        });

        return promise;

    }

    const validateSettings = () => {
        let promise = new Promise((resolve, reject) => {
            if (chartRefs.current.selectedChart === "dual-axis" && chartRefs.current.numericColumnsFiltered?.length < 2) {
                showWarnings({
                    title: "İşlem başarısız",
                    description: "Çift eksenli grafiğin kullanılabilmesi için minimum 2 değer kolonu seçilmelidir."
                });
                resolve(false);
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    const applySettings = (settingsObj) => {
        validateSettings().then((result) => {
            if (result) {
                // sync new settings : 
                syncSettings(settingsObj).then((result) => {
                    if (result) {
                        manageChartChange(chartRefs.current.selectedChart);
                        setVisible(false);
                    }
                });
            }
        });
    }

    const saveSettings = (settingsObj) => {

        applySettings(settingsObj);

    }


    const manipulateData = (dataType) => { // TODO CANSU CONVERT THIS FUNCTION TO PROMISE
        //setState({ ...state, dataWith1Numeric: [], dataWith1String: [] });

        state.dataWith1Numeric = []; state.dataWith1String = [];

        switch (dataType) {
            case "with1Numeric":
                chartRefs.current.selectedData = null;
                if (params && params.selectedRowKeys && params.selectedRowKeys?.length > 0) {
                    chartRefs.current.selectedData = chartData.filter(x => params.selectedRowKeys.includes(x.id));
                } else {
                    chartRefs.current.selectedData = chartData;
                }
                chartRefs.current.selectedData.forEach((row, rowIndex) => {

                    if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                        return;

                    let strVal = chartData[rowIndex] && chartData[rowIndex][strKey?.replace('_', '.')]?.DisplayText;

                    if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
                        chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {
                            if (!col.PrimaryKey && !col.IsLookupColumn) {
                                if (chartData[rowIndex][col]?.Value || chartData[rowIndex][col.Path]?.Value) {
                                    state.dataWith1Numeric.push({
                                        value: chartData[rowIndex][col.Path]?.Value,
                                        category: col.Path,
                                        stringColForNumeric: strVal
                                    });

                                    // if (chartRefs.current.chartSettings.dataLimitCount !== 0 && state.dataWith1Numeric.length === chartRefs.current.chartSettings.dataLimitCount)
                                    //     return;
                                }
                            }
                        });
                    } else {
                        chartRefs.current.numericColumns.forEach((col, colIndex) => {
                            if (!col.PrimaryKey && !col.IsLookupColumn) {
                                if (chartData[rowIndex][col]?.Value || chartData[rowIndex][col.Path]?.Value) {
                                    state.dataWith1Numeric.push({
                                        value: chartData[rowIndex][col.Path]?.Value,
                                        category: col.Path,
                                        stringColForNumeric: strVal
                                    });
                                }
                            }
                        });
                    }
                });

                break;
            case "with1String":
                chartRefs.current.selectedData = null;
                setState({ ...state, numericColumnNames: [] });
                chartRefs.current.numericColumnsFormat = {};
                if (params && params.selectedRowKeys && params.selectedRowKeys?.length > 0) {
                    chartRefs.current.selectedData = chartData.filter(x => params.selectedRowKeys.includes(x.id));
                } else {
                    chartRefs.current.selectedData = chartData;
                }

                // Filling numericColumnsfiltered if dashboard :
                if (isDashboard) {
                    if (settings?.valField && settings?.valField.length > 0) {
                        chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns.filter((col) => settings?.valField?.includes(col.Path));
                    } else {
                        chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns;
                    }

                    state.numericColumnNames = chartRefs.current.numericColumnsFiltered?.map(col => col.Path.replace('.', '_'))

                } else {
                    state.numericColumnNames = chartRefs.current.numericColumns.map(col => {
                        if (!state.numericColumnNames.includes(col.Path.replace('.', '_'))) {
                            return col.Path.replace('.', '_');
                        }
                    })

                }

                chartRefs.current.selectedData.forEach((row, rowIndex) => {
                    let obj = {};
                    chartRefs.current.numericColumns.forEach((col) => {
                        // ilk '.', '_' ile değiştirilmeli. Çünkü chart '.' içeren alanlar için legend ı gizleyebiliyor ancak geri açamıyor.
                        chartRefs.current.strKeys?.map(key => { obj[key.replace('.', '_')] = chartData[rowIndex][key.replace('_', '.')]?.DisplayText; });

                        obj[col.Path.replace('.', '_')] = chartData[rowIndex][col.Path]?.Value;

                        if (!chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')]) {
                            chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')] = {
                                alias: col.DisplayName.replace('.', '_'),
                                value: chartData[rowIndex][col.Path]?.Value.toLocaleString(),
                                formatter: (v) => {
                                    // console.log(v);
                                    if (v) return `${v.toLocaleString()}`;
                                    return `${v}`;
                                },
                            }
                        }
                    });
                    state.dataWith1String?.push(obj);
                });
                break;
        }

    }

    const initChart = ({ columns, dataList }) => {
        chartData = dataList;
        chartRefs.current.numericColumns = columns.filter(x => (!x.PrimaryKey && x.DataTypeName.toLocaleLowerCase().includes("double") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Float") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Decimal") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Int") && x.ViewEditor.TypeName !== "LookUp")); // TODO CANSU ŞİMDİLİK LOOKUPLAR ELENDİ
        chartRefs.current.strColumns = columns.filter(x => x.DataTypeName === "String");
        chartRefs.current.strCount = chartRefs.current.strColumns?.length;
        if (chartRefs.current.strCount > 0) {
            setStrKey(chartRefs.current.strColumns[0]?.Path.replace('.', '_'));  // todo cansu kaldırılacak ihtiyaç kalmayacak            
            chartRefs.current.strKeys = chartRefs.current.strColumns.map((col) => col.Path.replace('.', '_'));
        }
        Object.assign(chartRefs.current.numericColumnsFiltered, chartRefs.current.numericColumns);

        if (isDashboard && settings) {
            syncSettings(settings).then(result => {
                if (result) {
                    chartRefs.current.chartObject = chartRefs.current.numericColumns?.map(column => {
                        // color settings :
                        let colorSetting = settings["colNameColor"]?.filter(x => x["colName"] === column.Path);
                        let color = null;

                        if (colorSetting && colorSetting?.length > 0 && colorSetting[0] && colorSetting[0].color) {
                            color = colorSetting[0].color;
                        } else {
                            settings = ColorAddUpdate(settings, column.Path, color);
                            color = settings["colNameColor"]?.filter(x => x["colName"] === column.Path)[0]?.color;
                        }
                        // geometry settings :
                        let geomSetting = settings["colNameGeom"]?.filter(x => x["colName"] === column.Path);
                        let geom = null;
                        if (geomSetting && geomSetting?.length > 0 && geomSetting[0] && geomSetting[0].geometry) {
                            geom = geomSetting[0].geometry;
                        } else {
                            settings = GeomAddUpdate(settings, column.Path, geom);
                            geom = settings["colNameGeom"]?.filter(x => x["colName"] === column.Path)[0]?.geometry;
                        }
                        return Object.assign({}, column, {
                            color: color,
                            geomType: geom
                        })
                    });
                    setIsInit(chartRefs.current.chartObject?.length > 0);
                }
            });

        } else {
            chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, {
                color: randomColor(),
                geomType: GetChartGeometry(column.Path, chartRefs.current.chartObject) || 'line'
            }));
            setIsInit(chartRefs.current.chartObject?.length > 0);
        }



        if (!chartRefs.current.numericColumns ||
            (chartRefs.current.numericColumns && chartRefs.current.numericColumns?.length == 0)
            || chartRefs.current.strCount < 1) {
            setIsChartExist(false);
        } else {
            setIsChartExist(true);
        }
    }

    // export image
    const downloadImage = () => {
        var a = document.createElement("a");
        a.href = ref.current?.toDataURL(); //Image Base64 
        let date = moment().format('DD-MM-YYYY');
        a.download = `${chartRefs.current.chartSettings.chartTitle}-${date}.jpg`; //File name 
        a.click();
    };

    const manageChartChange = (chartName) => {
        switch (chartName) {
            case "bar":
            case "radial-bar":
                manipulateData("with1Numeric");
                chartRefs.current.config = {
                    isGroup: chartRefs.current.chartSettings.selectedDataViewMode?.includes("group"),
                    isStack: chartRefs.current.chartSettings.selectedDataViewMode?.includes("stack"),
                    isPercent: chartRefs.current.chartSettings.selectedDataViewMode?.includes("percent"),
                    seriesField: seriesField_with1numeric,
                    label: !chartRefs.current.chartSettings.labelActive ? null : {
                        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
                        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
                        rotate: chartRefs.current.chartSettings.isLabelRotate,
                    },
                    // scrollbar: { type: 'vertical' },
                    theme: "light",
                    colorField: seriesField_with1numeric,
                    color: ({ category }) => {
                        if (isDashboard) {
                            let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
                                || settings?.colNameColor?.filter(x => x["colName"] === category);

                            let color;
                            if (colorObj && colorObj?.length === 1 && colorObj[0]) {
                                color = colorObj[0]["color"];
                            }
                            return color || GetChartColors(category, chartRefs.current.chartObject);
                        } else {
                            return GetChartColors(category, chartRefs.current.chartObject);
                        }
                    },
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
                            && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName}\nOrt.${CalcAverageValue(state.dataWith1Numeric, seriesField_with1numeric, text)}`
                        },
                        autoEllipsis: false,
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: {
                        showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
                        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
                        formatter: (item) =>
                            ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
                        // showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
                        showCrosshairs: true, shared: true,
                        crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
                            type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
                            text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
                        } : {}
                    },
                    xAxis: xAxisNum(),
                    yAxis: yAxisNum(),
                    smooth: true,
                    animation: animationPathIn,
                    meta: chartRefs.current.numericColumnsFormat,
                    data: chartRefs.current.chartSettings.isReverseData ? state.dataWith1Numeric.reverse() : state.dataWith1Numeric,
                    xField: chartName === "bar" ? "value" : "stringColForNumeric",
                    yField: chartName === "bar" ? "stringColForNumeric" : "value",
                    slider: chartRefs.current.chartSettings.showSlider ? {
                        start: 0.0,
                        end: 1,
                        foregroundStyle: { fill: GetSliderColor(chartRefs.current.chartSettings) },
                        handlerStyle: { height: 30, highLightFill: 'lightGray', stroke: 'gray' },
                    } : null,
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };

                break;
            case "line":
            case "area":
            case "column":
            case "radar-line":
                manipulateData("with1Numeric");
                console.log("dataWith1Numeric.length : " + state.dataWith1Numeric.length);

                chartRefs.current.config = {
                    data: chartRefs.current.chartSettings.isReverseData ? state.dataWith1Numeric.reverse() : state.dataWith1Numeric,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
                    seriesField: seriesField_with1numeric,
                    label: !chartRefs.current.chartSettings.labelActive ? null : {
                        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
                        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
                        rotate: chartRefs.current.chartSettings.isLabelRotate,
                    },
                    // scrollbar: { type: 'vertical' },
                    theme: "light",
                    colorField: seriesField_with1numeric,
                    color: ({ category }) => {
                        if (isDashboard) {
                            let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
                                || settings?.colNameColor?.filter(x => x["colName"] === category);

                            let color;
                            if (colorObj && colorObj?.length === 1 && colorObj[0]) {
                                color = colorObj[0]["color"];
                            }
                            return color || GetChartColors(category, chartRefs.current.chartObject);
                            //return `l(99) 0:${color || GetChartColors(category, chartRefs.current.chartObject)} 1:rgba(255,255,255,0.2)`;

                        } else {
                            return GetChartColors(category, chartRefs.current.chartObject);
                        }
                    },
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
                            && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === text)[0]?.DisplayName}\nOrt. ${CalcAverageValue(state.dataWith1Numeric, seriesField_with1numeric, text)}`
                        },
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: {
                        showTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
                        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
                        formatter: (item) =>
                            ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: item["value"] }),
                        //showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
                        showCrosshairs: true, shared: true,
                        crosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs ? {
                            type: chartRefs.current.chartSettings.crosshairDirectionX && chartRefs.current.chartSettings.crosshairDirectionY ? 'xy' : chartRefs.current.chartSettings.crosshairDirectionX ? 'x' : chartRefs.current.chartSettings.crosshairDirectionY ? 'y' : 'xy',
                            text: { style: { fill: chartRefs.current.chartSettings.selectedCrosshairColor } }
                        } : {}
                    },
                    xAxis: xAxisNum(),
                    yAxis: yAxisNum(),
                    smooth: true,
                    animation: chartName === "column" ? animationZoomIn : animationPathIn,
                    meta: chartRefs.current.numericColumnsFormat,

                    xField: "stringColForNumeric",
                    yField: "value",
                    slider: chartRefs.current.chartSettings.showSlider ? {
                        start: 0.0,
                        end: 1,
                        foregroundStyle: { fill: GetSliderColor(chartRefs.current.chartSettings) },
                        handlerStyle: { height: 30, highLightFill: 'lightGray', stroke: 'gray' },
                    } : null,
                    // interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }, { type: 'element-highlight-by-color' }, { type: 'element-link' }],
                    // TODO CANSU AYARLARA EKLEYİP EKLEMEYECEĞİNE KARAR VER.
                    // annotations: [
                    //     {
                    //         type: 'text',
                    //         position: ['min', 'median'],
                    //         content: 'ortalama',
                    //         offsetY: -4,
                    //         style: {
                    //             textBaseline: 'bottom',
                    //         },
                    //     },
                    //     {
                    //         type: 'line',
                    //         start: ['min', 'median'],
                    //         end: ['max', 'median'],
                    //         style: {
                    //             stroke: 'blue',
                    //             lineDash: [2, 2],
                    //         },
                    //     },
                    // ],
                };
                break;
            case "pie":
                manipulateData("with1String");
                chartRefs.current.config = {
                    appendPadding: 5,
                    data: state.dataWith1String,
                    angleField: state.numericColumnNames[0],
                    colorField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
                    radius: 1,
                    radius: 0.8,
                    meta: chartRefs.current.numericColumnsFormat,
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.chartTitle && {
                            text: chartRefs.current.chartSettings.chartTitle,
                            style: legendStyle
                        },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text) => text
                        },
                    },
                    label: getLabelStr,
                    tooltip: tooltipPie,
                    animation: animationZoomIn,
                    //interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
                    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
                    // scrollbar: { type: 'vertical' },
                };
                break;
            case "dual-axis":
                manipulateData("with1String");
                chartRefs.current.config = {
                    data: [state.dataWith1String, state.dataWith1String],
                    xField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
                    yField: state.numericColumnNames,
                    meta: chartRefs.current.numericColumnsFormat,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
                    // scrollbar: { type: 'vertical' },
                    theme: "light",
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
                            && {
                            text: chartRefs.current.chartSettings.chartTitle,
                            style: legendStyle
                        },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text) => text
                        },
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: tooltipStr,
                    xAxis: xAxisNum(),
                    yAxis: yAxisNum(),
                    // xAxis: chartRefs.current.chartSettings.axisVisibility["xAxis"] && {
                    //     grid: {
                    //         line: {
                    //             style: {
                    //                 stroke: chartRefs.current.chartSettings.axisLineColor["xAxis"],
                    //                 lineWidth: chartRefs.current.chartSettings.axisLineWidth["xAxis"],
                    //                 lineDash: chartRefs.current.chartSettings.axisLineShape["xAxis"] === "line" ? null : [4, 5],
                    //                 strokeOpacity: 0.7,
                    //                 shadowColor: 'black',
                    //                 shadowBlur: 10,
                    //                 shadowOffsetX: 5,
                    //                 shadowOffsetY: 5,
                    //                 cursor: 'pointer'
                    //             }
                    //         }
                    //     }
                    // },
                    // yAxis: chartRefs.current.chartSettings.axisVisibility["yAxis"] && {
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
                    // },
                    //limitInPlot: true,
                    animation: animationPathIn,
                    geometryOptions: GetGeometryOptions(chartRefs.current.chartObject, (chartRefs.current.chartSettings.colNameGeom || settings?.colNameGeom), isDashboard),
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };
                break;
            case "bidirectional-bar-chart-horizontal":
            case "bidirectional-bar-chart-vertical":
                manipulateData("with1String");
                chartRefs.current.config = {
                    data: state.dataWith1String,
                    xField: chartRefs.current.strKeys && chartRefs.current.strKeys[0] && chartRefs.current.strKeys[0],
                    xAxis: { position: 'bottom' },
                    yField: state.numericColumnNames,
                    meta: chartRefs.current.numericColumnsFormat,
                    label: getLabelStr,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
                    // scrollbar: { type: 'vertical' },
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.chartTitle && {
                            text: chartRefs.current.chartSettings.chartTitle,
                            style: legendStyle
                        },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: tooltipStr,
                    layout: chartName === "bidirectional-bar-chart-vertical" && 'vertical',
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };
                break;
        }
        setState({ ...state, dataWith1Numeric: state.dataWith1Numeric, dataWith1String: state.dataWith1String, numericColumnNames: state.numericColumnNames });
    }
    /* USEEFFECTS */
    useEffect(() => {

        initChart(data);
    });

    useEffect(() => {
        if (strKey && chartRefs.current.numericColumns?.length > 0) {
            manageChartChange(chartName);
        }
    }, [strKey, chartRefs.current.numericColumns?.length, isSync]);

    useEffect(() => {
        chartRefs.current.config.geometryOptions = GetGeometryOptions(chartRefs.current.chartObject, (chartRefs.current.chartSettings.colNameGeom || settings?.colNameGeom), isDashboard);
        if (chartName === "dual-axis" && chartRefs.current.config.geometryOptions?.length > 0) {
            setIsGeometryOptionsReady(true);
        }
        else {
            //T O D O CANSU: Action required ?
        }
    }, [isInit]);

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

    // const Chart=()=>containerElement
    const ChartRenderer = ({ chartName }) => {
        // const chart = new Bar('containerCansu', initialBarConfig);
        switch (chartName) {
            case "bar":
                {
                    // chartRefs.current.chart = new Bar('container', {
                    const Bar = new Bar('containerCansu', {
                        "isGroup": true,
                        "isStack": false,
                        "isPercent": false,
                        "seriesField": "category",
                        "label": null,
                        "theme": "light",
                        "colorField": "category",
                        "legend": {
                            "title": false,
                            "slidable": true,
                            "position": "top-left",
                            "layout": "horizontal",
                            "itemName": {},
                            "autoEllipsis": false
                        },
                        "autoFit": true,
                        "width": false,
                        "height": false,
                        "tooltip": {
                            "showChartTitle": true,
                            "title": "",
                            "showCrosshairs": true,
                            "shared": true,
                            "crosshairs": {}
                        },
                        "xAxis": {},
                        "yAxis": {},
                        "smooth": true,
                        "animation": {
                            "appear": {
                                "animation": "path-in",
                                "duration": 5000,
                                "delay": 0
                            }
                        },
                        "meta": {},
                        "data": [
                            {
                                "value": 14418,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "GÜRPINAR"
                            },
                            {
                                "value": 248969,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "GÜRPINAR"
                            },
                            {
                                "value": 36908,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "ADNAN KAHVECİ"
                            },
                            {
                                "value": 456956,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "ADNAN KAHVECİ"
                            },
                            {
                                "value": 18158,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "CUMHURİYET"
                            },
                            {
                                "value": 120584,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "CUMHURİYET"
                            },
                            {
                                "value": 20125,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "BÜYÜKŞEHİR"
                            },
                            {
                                "value": 958547,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "BÜYÜKŞEHİR"
                            },
                            {
                                "value": 43422,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "BARIŞ"
                            },
                            {
                                "value": 255935,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "BARIŞ"
                            },
                            {
                                "value": 20995,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "YAKUPLU"
                            },
                            {
                                "value": 734506,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "YAKUPLU"
                            },
                            {
                                "value": 17285,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "MARMARA"
                            },
                            {
                                "value": 546124,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "MARMARA"
                            },
                            {
                                "value": 29163,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "SAHİL"
                            },
                            {
                                "value": 154185,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "SAHİL"
                            },
                            {
                                "value": 5486,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "KÖMÜRCÜ"
                            },
                            {
                                "value": 456,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "KÖMÜRCÜ"
                            },
                            {
                                "value": 14233,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "KAVAKLI"
                            },
                            {
                                "value": 527000,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "KAVAKLI"
                            },
                            {
                                "value": 10044,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "CANSU TEST"
                            },
                            {
                                "value": 127060.81,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "CANSU TEST"
                            },
                            {
                                "value": 23232,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "asdadf"
                            },
                            {
                                "value": 123554,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "asdadf"
                            },
                            {
                                "value": 12361,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "fdfdfdfd"
                            },
                            {
                                "value": 123789,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "fdfdfdfd"
                            },
                            {
                                "value": 5,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "sfamah"
                            },
                            {
                                "value": 999932,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "sfa2610"
                            },
                            {
                                "value": 1000,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "TESTSFA2021"
                            },
                            {
                                "value": 1000,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "TESTSFA2021"
                            },
                            {
                                "value": 1000,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "TESTSFA2021"
                            },
                            {
                                "value": 1000,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "TESTSFA2021"
                            },
                            {
                                "value": 1000,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "CANSU TESTTTT111"
                            },
                            {
                                "value": 1000.04,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "CANSU TESTTTT111"
                            },
                            {
                                "value": 22,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "sfa202108233"
                            },
                            {
                                "value": 122,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "sfa202108233"
                            },
                            {
                                "value": 10,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "BARIŞ"
                            },
                            {
                                "value": 10,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "ADNAN KAHVECİ2222"
                            },
                            {
                                "value": 100,
                                "category": "GEOMAHALLE.nufus",
                                "stringColForNumeric": "Sfa"
                            },
                            {
                                "value": 100,
                                "category": "GEOMAHALLE.mahalle_alan",
                                "stringColForNumeric": "Sfa"
                            }
                        ],
                        "xField": "value",
                        "yField": "stringColForNumeric",
                        "slider": {
                            "start": 0,
                            "end": 1,
                            "foregroundStyle": {
                                "fill": "green"
                            },
                            "handlerStyle": {
                                "height": 30,
                                "highLightFill": "lightGray",
                                "stroke": "gray"
                            }
                        },
                        "interactions": [
                            {
                                "type": "marker-active"
                            },
                            {
                                "type": "brush"
                            }
                        ]
                    });
                    return Bar;

                }
            case "radial-bar":
                return <RadialBar {...chartRefs.current.config} chartRef={ref} />;
            case "line":
                return <Line {...chartRefs.current.config} chartRef={ref} />;
            case "area":
                return <Area {...chartRefs.current.config} chartRef={ref} />;
            case "column":
                return <Column {...chartRefs.current.config} chartRef={ref} />;
            case "radar-line":
                return <Radar {...chartRefs.current.config} chartRef={ref} />;
            case "pie":
                return <Pie {...chartRefs.current.config} chartRef={ref} />;
            case "dual-axis":
                return state.dataWith1String.length > 0 && isInit && isGeometryOptionsReady && isSync && <DualAxes {...chartRefs.current.config} chartRef={ref} />;
            case "bidirectional-bar-chart-horizontal":
                return <BidirectionalBar {...chartRefs.current.config} chartRef={ref} />;
            case "bidirectional-bar-chart-vertical":
                return <BidirectionalBar {...chartRefs.current.config} chartRef={ref} />;
        }
    }

    return containerElement;
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
    //                         <div style={{ height: '75vh', width: '90vw' }}> <ChartRenderer chartName={"bar"} />  </div>
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
}
export default DynamicChart;


