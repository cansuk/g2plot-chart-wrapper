import React, { useEffect, useState, useRef } from 'react';
import { Button, notification, Tabs, Drawer, Select, Checkbox, Row, Col, Tooltip, Radio, Collapse, Input, Space } from 'antd';
import { SettingOutlined, ExportOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Line, Bar, Pie, Area, Column, DualAxes, BidirectionalBar, Radar, RadialBar, Rose } from '@antv/g2plot';
import uniqid from 'uniqid';
import { SketchPicker } from 'react-color';
import kindOf from "kind-of";
const randomColor = require('randomcolor');

const seriesField_with1numeric = "category";

const initialBarConfig = {
    data: [],
    isGroup: true,
    xField: "value",
    yField: "stringColForNumeric",
    seriesField: seriesField_with1numeric,
    colorField: seriesField_with1numeric,
    theme: "light"
};

/** SETTINGS */
const styles = {
    verticallyCenteredColStyle: {
        display: 'inline-flex', justifyContent: 'left', alignItems: 'center',
        '& span': { display: 'inline-block', verticalAlign: 'middle' }
    } // aligns vertically center the child span element
}

const Settings = ({ settingsObj, isDashboard, onSaveChartSettings, isVisible, applySettings, onClose, selectedChart, selectedDataViewMode,
    handleDataViewModeChange, handleSelectedChart, handleStrFieldMenuClick,
    strColumns, strKey, numericColumns, numericColumnsFiltered, handleNumFieldChange, isReverseData, handleReverseData, chartObject, sliderColor,
    handleSliderShowCheck, showSlider, handleSliderColorChange, axisVisibility, axisTitle, handleAxisTitle, axisLineColor, axisLineShape, axisLineWidth, handleAxisLineWidth, handleAxisColorChange,
    handleAxisShowCheck, handleLineTypeSelect, autoFitActive, handleAutoFitActive, chartWidth, handleChartWidth, chartHeight,
    handleChartHeight, labelActive, isLabelRotate, handleLabelRotate, handleLabelActive, labelPosition, handleLabelPosition, labelColor, handleLabelColor,
    labelFontSize, handleLabelFontSize, legendActive, handleLegendActive, legendPosition, handleLegendPosition, legendLayout,
    handleLegendLayout, isTooltipTitleActive, handleIsTooltipTitleActive, customTooltipTitle, handleCustomTooltipTitle, isAutoTooltipTitle,
    handleIsAutoTooltipTitle, showChartTitle, handleShowChartTitle, chartTitle, handleChartTitle, handleGeomTypeChange, isGrouped, isStacked, isPercent,
    dataLimitCount, handleDataLimitCount }) => {
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Panel } = Collapse;
    const [visible, setVisible] = useState(isVisible);
    const [currentColorColName, setCurrentColorColName] = useState(numericColumnsFiltered?.length > 0 ? numericColumnsFiltered[0]
        : numericColumns?.length > 0 ? numericColumns[0] : null);

    const [currentGeomType, setCurrentGeomType] = useState(GetChartGeometry(currentColorColName, chartObject));
    const [state, setState] = useState({
        selectedChart, strKey, currentAxis: 'xAxis', axisVisibility, axisTitle, axisLineColor, axisLineShape, axisLineWidth, autoFitActive, labelActive, labelColor, legendActive, isLabelRotate,
        isTooltipTitleActive, isAutoTooltipTitle, isGrouped, isStacked, isPercent, isReverseData, selectedColor: GetChartColors(currentColorColName, chartObject),
        dataLimitCount, handleDataLimitCount, chartWidth, chartHeight
    });

    const settingRefs = useRef({
        currentAxis: 'xAxis',
        settingsObj: settingsObj ||
        {
            chartType: selectedChart,
            categoryField: strKey,
            valField: numericColumnsFiltered?.map(x => x),
            selectedDataViewMode: "group",
            isGrouped: isGrouped,
            isStacked: isStacked,
            isPercent: isPercent,
            isReverseData: isReverseData,
            colNameColor: [],
            colNameGeom: [],
            showSlider: showSlider,
            showChartTitle: showChartTitle,
            chartTitle: chartTitle,
            autoFitActive: autoFitActive,
            chartWidth: chartWidth,
            chartHeight: chartHeight,
            labelActive: labelActive,
            labelPosition: labelPosition,
            labelFontSize: labelFontSize,
            labelColor: labelColor,
            isLabelRotate: isLabelRotate,
            legendActive: legendActive,
            legendPosition: legendPosition,
            legendLayout: legendLayout,
            isTooltipTitleActive: isTooltipTitleActive,
            isAutoTooltipTitle: isAutoTooltipTitle,
            customTooltipTitle: customTooltipTitle,
            axisLineColor: { xAxis: "black", yAxis: "black" },
            axisVisibility: { xAxis: false, yAxis: false },
            axisTitle: { xAxis: "", yAxis: "" },
            dataLimitCount: 0 // no limit
        }
    });

    const renderTabBar = (props, DefaultTabBar) => (
        <DefaultTabBar {...props} style={{ top: 0 }} />
    );

    const tabBody =
        <><TabPane tab="Chart" key="1">

            <Row gutter={[8, 8]} justify="center">
                <Col span={24}>
                    <h3>Chart Type</h3>
                </Col>
                <Col span={24}>
                    <Select defaultValue={state.selectedChart} style={{ width: "100%" }} onSelect={(value) => {
                        setState({ ...state, selectedChart: value, labelActive: (value === "pie") });
                        settingRefs.current.settingsObj.chartType = value;
                        settingRefs.current.settingsObj.labelActive = (value === "pie");
                        settingRefs.current.settingsObj.axisVisibility["xAxis"] = (value === "radar-line");
                        settingRefs.current.settingsObj.axisVisibility["yAxis"] = (value === "radar-line");
                        handleSelectedChart(value);
                    }}>
                        {(() => ChartTypes.map((item) => {
                            // return <Option value={item}>{i18n.t(item)}</Option>
                            return <Option value={item}>{item}</Option>
                        }))()}
                    </Select>
                </Col>
                <Col span={24} style={{ paddingTop: 30 }}>
                    <h3>Data</h3>
                </Col>
                <Col span={10} style={styles.verticallyCenteredColStyle}>
                    <span>Category :</span>
                </Col>
                <Col span={14}>
                    <Select defaultValue={state.strKey} style={{ width: "100%" }}
                        onSelect={(value) => {
                            setState({ ...state, strKey: value });
                            settingRefs.current.settingsObj.categoryField = value;
                            handleStrFieldMenuClick(value);
                        }}>

                        {strColumns.map((item) => {
                            return <Option key={uniqid()} value={item}>{item}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={10} style={styles.verticallyCenteredColStyle}>
                    <span>Value : </span>
                </Col>
                <Col span={14}>
                    {<Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Seçiniz"
                        defaultValue={numericColumnsFiltered?.map(x => x)}
                        onChange={(value) => { settingRefs.current.settingsObj.valField = value; handleNumFieldChange(value); }}
                    >
                        {numericColumns?.map((item) => <Option key={uniqid()} value={item}>{item}</Option>)}
                    </Select>}
                </Col>

                <Col span={10} style={styles.verticallyCenteredColStyle}>
                    <Tooltip title={"Either one of grouped or stacked display can be selected. Once either of them selected, Percentage display will be enabled for selection."} mouseEnterDelay="0.1">
                        <span> Data display mode : </span>
                    </Tooltip>
                </Col>
                <Col span={14}>
                    {<Select

                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Select"
                        defaultValue={selectedDataViewMode}
                        onChange={(value) => {
                            settingRefs.current.settingsObj.selectedDataViewMode = value;
                            setState({ ...state, isGrouped: value.includes("group") });
                            setState({ ...state, isStacked: value.includes("stack") });
                            setState({ ...state, isPercent: value.includes("percent") });

                            settingRefs.current.settingsObj.isGrouped = value.includes("group");
                            settingRefs.current.settingsObj.isStacked = value.includes("stack");
                            settingRefs.current.settingsObj.isPercent = value.includes("percent");

                            handleDataViewModeChange(value);
                        }}
                    >
                        <Option key={"group"} value={"group"}
                            disabled={settingRefs.current.settingsObj.isStacked}>{"Grouped"}</Option>
                        <Option key={"stack"} value={"stack"}
                            disabled={settingRefs.current.settingsObj.isGrouped}>{"Stacked"}</Option>
                        <Option key={"percent"} value={"percent"}
                            disabled={!(settingRefs.current.settingsObj.isStacked || settingRefs.current.settingsObj.isGrouped)}
                        >{"Percent"}</Option>
                    </Select>}

                </Col>

                <Col span={10} style={styles.verticallyCenteredColStyle}>
                    <Tooltip title={"Data limit count to display. Default is 250.  If you don't want to limit data count, you can enter 0 or leave empty."} mouseEnterDelay="0.1">
                        <span> Data limit : </span>
                    </Tooltip>
                </Col>
                <Col span={14}>
                    <Input min={200} max={1920} style={{ textAlign: 'right' }} value={state.dataLimitCount} defaultValue={state.dataLimitCount}
                        size="small" onChange={(event) => {
                            const { value } = event.target;
                            if (isNaN(value)) {
                                return;
                            } else if (!value) {
                                setState({ ...state, dataLimitCount: 0 });
                            } else {
                                setState({ ...state, dataLimitCount: value });
                            }
                            settingRefs.current.settingsObj.dataLimitCount = parseInt(value);
                            handleDataLimitCount(parseInt(value));
                        }} />
                </Col>

                <Col span={24} style={{ paddingTop: 10 }}>
                    <Checkbox defaultChecked={state.isReverseData} onChange={(event) => {
                        const { checked } = event.target;
                        setState({ ...state, isReverseData: checked });
                        settingRefs.current.settingsObj.isReverseData = checked;
                        handleReverseData(checked)
                    }}>Reverse data order</Checkbox>
                </Col>
                <Col span={24} style={{ paddingTop: 30 }}>
                    <h3>Chart format</h3>
                </Col>
                <Col span={14}>
                    <Select defaultValue={numericColumnsFiltered?.filter(x => x === currentColorColName)[0]} style={{ width: "100%" }}
                        onSelect={(key) => {
                            setCurrentColorColName(key.replace('_', '.'));
                            setCurrentGeomType(GetChartGeometry(key.replace('_', '.'), chartObject));
                            setState({ ...state, selectedColor: GetChartColors(key.replace('_', '.'), chartObject) });
                        }}>
                        {numericColumnsFiltered.map((col) => <Option key={uniqid()} value={col}>{col}</Option>)}
                    </Select>
                </Col>
                <Col span={10} type="flex" align="right" >
                    <Tooltip title={<SketchPicker
                        color={state.selectedColor}
                        onChangeComplete={(color) => {
                            setState({ ...state, selectedColor: color.hex });
                            settingRefs.current.settingsObj = ColorAddUpdate(settingRefs.current.settingsObj, currentColorColName, color.hex);
                            let colorIndex = chartObject.findIndex(x => x["column"] === currentColorColName);
                            chartObject[colorIndex]["color"] = color.hex;
                        }}
                    />} color="white" trigger={['click']}>
                        {state.selectedColor && <div style={{ width: 40, height: 20, backgroundColor: state.selectedColor }} ></div>}
                    </Tooltip>
                </Col>

                <Col span={10} style={styles.verticallyCenteredColStyle}>
                    <span> Column shape : </span>
                </Col>
                <Col span={14}>
                    <Tooltip title={"Available for dual-axis charts only."}>
                        {currentGeomType &&
                            <Select value={GetChartGeometry(currentColorColName, chartObject)} style={{ width: "100%" }} disabled={(state.selectedChart !== "dual-axis")}
                                onChange={(value) => {
                                    let settingsIndex = settingRefs.current.settingsObj.colNameGeom.findIndex(x => x["colName"] === currentColorColName);
                                    // TODO CANSU Utils/GeomAddUpdate fonksiyonunu çağırabilirsin.
                                    if (settingsIndex === -1) {
                                        // add
                                        settingRefs.current.settingsObj.colNameGeom.push({ colName: currentColorColName, geometry: value });
                                    } else {
                                        // update
                                        settingRefs.current.settingsObj.colNameGeom[settingsIndex]["geometry"] = value;
                                    }

                                    setCurrentGeomType(value);
                                    handleGeomTypeChange(value, currentColorColName);
                                }}>
                                <Option value="column" >Column </Option>
                                <Option value="line">  Line</Option>
                            </Select>}
                    </Tooltip>
                </Col>


                <Col span={24}>
                    <h3>Slider</h3>
                </Col>
                <Col span={24}>
                    <Checkbox defaultChecked={showSlider} onChange={(event) => {
                        const { checked } = event.target;
                        settingRefs.current.settingsObj.showSlider = checked;
                        handleSliderShowCheck(checked);
                    }}> Show slider </Checkbox>
                </Col>
                {/* <Col span={8} type="flex" align="right" style={styles.verticallyCenteredColStyle}>
                    <span>Slider color :</span>
                </Col> */}
                {/* <Col span={4} type="flex" align="right" >
                    {showSlider && <Tooltip title={<SketchPicker color={sliderColor}
                        onChangeComplete={(color) => { settingRefs.current.settingsObj.sliderColor = color.hex; handleSliderColorChange(color); }} />} color="white" trigger={['click']}>
                        <div style={{ width: 40, height: 20, backgroundColor: sliderColor }}></div>
                    </Tooltip>}
                </Col> */}
            </Row>
        </TabPane>
            <TabPane tab="Axis" key="2">
                <Row gutter={[12, 12]}>
                    <Col span={24} type="flex" justify="center" align="middle" >
                        <Radio.Group defaultValue={state.currentAxis} buttonStyle="solid" onChange={(event) => {
                            setState({ ...state, currentAxis: event.target.value });
                        }}>
                            <Radio.Button value="xAxis">Horizontal Axis</Radio.Button>
                            <Radio.Button value="yAxis">Vertical Axis </Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col span={24}>
                        <Checkbox checked={state.axisVisibility[state.currentAxis]} onChange={(event) => {
                            const { checked } = event.target;
                            state.axisVisibility[state.currentAxis] = checked;
                            setState({ ...state, axisVisibility: state.axisVisibility });
                            settingRefs.current.settingsObj.axisVisibility[state.currentAxis] = checked;
                            handleAxisShowCheck(checked, state.currentAxis);
                        }}> Show axis line</Checkbox>
                    </Col>
                    <Col span={10} style={styles.verticallyCenteredColStyle}>
                        <span>Line type: </span>
                    </Col>
                    {state.currentAxis && <Col span={14}>
                        <Select value={state.axisLineShape[state.currentAxis]} style={{ width: "100%" }} disabled={!state.axisVisibility[state.currentAxis]}
                            onSelect={(value) => {
                                state.axisLineShape[state.currentAxis] = value;
                                setState({ ...state, axisLineShape: state.axisLineShape });
                                settingRefs.current.settingsObj.axisLineShape[state.currentAxis] = value;
                                handleLineTypeSelect(value, state.currentAxis);
                            }}>
                            {/* {chartAxisLineShapes.map((shape) => <Option value={shape}>{i18n.t(shape)}</Option>)} */}
                            {ChartAxisLineShapes.map((shape) => <Option value={shape}>{shape}</Option>)}
                        </Select>
                    </Col>}
                    <Col span={10} style={styles.verticallyCenteredColStyle}>
                        <span> Line thickness : </span>
                    </Col>
                    {state.currentAxis && <Col span={14}>
                        <Select value={state.axisLineWidth[state.currentAxis]} style={{ width: "100%", textAlign: 'right' }} disabled={!state.axisVisibility[state.currentAxis]}
                            onSelect={(value) => {
                                state.axisLineWidth[state.currentAxis] = value;
                                setState({ ...state, axisLineWidth: state.axisLineWidth });
                                settingRefs.current.settingsObj.axisLineWidth[state.currentAxis] = value;
                                handleAxisLineWidth(value);
                            }}>
                            {Array(8).fill().map((_, id) => id + 1).map((size) =>
                                <Option value={size}>{size + "px"}</Option>)}
                        </Select>
                    </Col>}
                    <Col span={10}>
                        Axis color :
                    </Col>
                    {state.currentAxis && <Col span={14}>
                        <Tooltip title={
                            <SketchPicker color={state.axisLineColor[state.currentAxis]}
                                onChangeComplete={(color) => {
                                    settingRefs.current.settingsObj.axisLineColor[state.currentAxis] = color.hex;
                                    let axisLineColorObj = {}; axisLineColorObj[state.currentAxis] = color.hex;
                                    setState({ ...state, axisLineColor: axisLineColorObj });
                                    handleAxisColorChange(color, state.currentAxis);
                                }} />
                        } color="white" trigger={['click']}>
                            <div style={{ width: 40, height: 20, backgroundColor: settingRefs.current.settingsObj.axisLineColor[state.currentAxis] }}></div>
                        </Tooltip>
                    </Col>}


                    <Col span={10} style={styles.verticallyCenteredColStyle}>
                        <span>Axis title :</span>
                    </Col>
                    <Col span={14}>
                        <Input value={state.axisTitle[state.currentAxis]}
                            onChange={(event) => {
                                const { value } = event.target;
                                state.axisTitle[state.currentAxis] = value;
                                setState({ ...state, axisTitle: state.axisTitle });
                                settingRefs.current.settingsObj.axisTitle[state.currentAxis] = value;
                                handleAxisTitle(value);
                            }} />
                    </Col>


                </Row>
            </TabPane>
            <TabPane tab="Appearance" key="3">

                <Collapse defaultActiveKey={['31']} onChange={(key) => { console.log(key) }} style={{ width: "100%" }} >
                    <Panel header="Header" key="31">
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <Checkbox defaultChecked={showChartTitle}
                                    onChange={(event) => {
                                        const { checked } = event.target;
                                        settingRefs.current.settingsObj.showChartTitle = checked;
                                        handleShowChartTitle(checked);
                                    }}> Show chart title </Checkbox>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Chart title :</span>
                            </Col>
                            <Col span={14}>
                                <Input defaultValue={chartTitle}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        settingRefs.current.settingsObj.chartTitle = value;
                                        handleChartTitle(value);
                                    }} />
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Dimension" key="32">
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <Checkbox defaultChecked={autoFitActive}
                                    onChange={(event) => {
                                        const { checked } = event.target;
                                        settingRefs.current.settingsObj.autoFitActive = checked;
                                        setState({ ...state, autoFitActive: checked });
                                        handleAutoFitActive(checked);
                                    }}> Auto dimension </Checkbox>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Width:</span>
                            </Col>
                            <Col span={14}>
                                <Input min={200} max={1920} style={{ textAlign: 'right' }} addonAfter={"px"} value={state.chartWidth}
                                    defaultValue={chartWidth} size="small" disabled={state.autoFitActive}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        if (isNaN(value)) {
                                            return;
                                        }
                                        setState({ ...state, chartWidth: value });
                                        settingRefs.current.settingsObj.chartWidth = parseInt(value);
                                        handleChartWidth(value);
                                    }} />
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Height:</span>
                            </Col>
                            <Col span={14}>
                                <Input min={200} max={1920} style={{ textAlign: 'right' }} addonAfter={"px"} value={state.chartHeight}
                                    defaultValue={chartHeight} size="small" disabled={state.autoFitActive}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        if (isNaN(value)) {
                                            return;
                                        }
                                        setState({ ...state, chartHeight: value });
                                        settingRefs.current.settingsObj.chartHeight = parseInt(value);
                                        handleChartHeight(value);
                                    }} />
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Label" key="33">
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <Tooltip title="Displays all values on chart." mouseEnterDelay="0.1">
                                    <Checkbox defaultChecked={state.labelActive}
                                        onChange={(event) => {
                                            const { checked } = event.target;
                                            settingRefs.current.settingsObj.labelActive = checked;
                                            setState({ ...state, labelActive: checked });
                                            handleLabelActive(checked);
                                        }}> Show Label</Checkbox>
                                </Tooltip>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Label position:</span>
                            </Col>
                            <Col span={14}>
                                <Select defaultValue={labelPosition} style={{ width: "100%" }} disabled={!state.labelActive}
                                    onSelect={(value) => {
                                        settingRefs.current.settingsObj.labelPosition = value;
                                        handleLabelPosition(value);
                                    }}>
                                    {LabelPositionTypes.map((position) => {
                                        // return <Option value={position}>{i18n.t(position)}</Option>
                                        return <Option value={position}>{position}</Option>

                                    })}
                                </Select>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Font size:</span>
                            </Col>
                            <Col span={14}>
                                <Input min={8} max={32} disabled={!state.labelActive}
                                    style={{ textAlign: 'right' }}
                                    defaultValue={labelFontSize}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        settingRefs.current.settingsObj.labelFontSize = parseInt(value);
                                        handleLabelFontSize(value);
                                    }}
                                    addonAfter={"px"}
                                />
                            </Col>
                            <Col span={10}>
                                Font color:
                            </Col>
                            <Col span={14}>
                                {
                                    <Tooltip title={
                                        <SketchPicker color={state.labelColor || 'black'}
                                            onChangeComplete={(color) => {
                                                settingRefs.current.settingsObj.selectedLabelColor = color.hex;
                                                setState({ ...state, labelColor: color.hex });
                                                handleLabelColor(color);
                                            }} />
                                    } color="white" trigger={['click']}>
                                        <div style={{ width: 40, height: 20, backgroundColor: state.labelColor || "black" }}></div>
                                    </Tooltip>
                                }

                            </Col>
                            <Col span={24}>
                                <Checkbox defaultChecked={state.isLabelRotate}
                                    onChange={(event) => {
                                        const { checked } = event.target;
                                        settingRefs.current.settingsObj.isLabelRotate = checked;
                                        setState({ ...state, isLabelRotate: checked });
                                        handleLabelRotate(checked);
                                    }} disabled={!state.labelActive}> Rotate label</Checkbox>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Legend" key="34">
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <Checkbox defaultChecked={state.legendActive}
                                    onChange={(event) => {
                                        const { checked } = event.target;
                                        settingRefs.current.settingsObj.legendActive = checked;
                                        setState({ ...state, legendActive: checked });
                                        handleLegendActive(checked);
                                    }}> Show legend</Checkbox>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Legend position:</span>
                            </Col>
                            <Col span={14}>
                                <Select defaultValue={legendPosition} style={{ width: "100%" }} disabled={!state.legendActive}
                                    onSelect={(value) => {
                                        settingRefs.current.settingsObj.legendPosition = value;
                                        handleLegendPosition(value)
                                    }}>
                                    {LegendPositionTypes.map((position) =>
                                        // <Option value={position}>{i18n.t(position)}</Option>)}
                                        <Option value={position}>{position}</Option>)}
                                </Select>
                            </Col>
                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Legend layout:</span>
                            </Col>
                            <Col span={14}>
                                <Select defaultValue={legendLayout} style={{ width: "100%" }} disabled={!state.legendActive}
                                    onSelect={(value) => { settingRefs.current.settingsObj.legendLayout = value; handleLegendLayout(value); }}>
                                    {/* <Option value="horizontal">{i18n.t("horizontal")}</Option>
                                    <Option value="vertical">{i18n.t("vertical")}</Option> */}
                                    <Option value="horizontal">{"horizontal"}</Option>
                                    <Option value="vertical">{"vertical"}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Tooltip" key="35">
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <Tooltip title="Tooltip başlığını göster veya gizle." mouseEnterDelay="0.1">
                                    <Checkbox defaultChecked={state.isTooltipTitleActive}
                                        onChange={(event => {
                                            const { checked } = event.target;
                                            settingRefs.current.settingsObj.isTooltipTitleActive = checked;
                                            setState({ ...state, isTooltipTitleActive: checked });
                                            handleIsTooltipTitleActive(checked);
                                        })}> Show tooltip title</Checkbox>
                                </Tooltip>
                            </Col>
                            <Col span={24}>
                                <Tooltip title="Generate tooltip title automatically." mouseEnterDelay="0.1">
                                    <Checkbox defaultChecked={state.isAutoTooltipTitle}
                                        onChange={(event) => {
                                            const { checked } = event.target;
                                            settingRefs.current.settingsObj.isAutoTooltipTitle = checked;
                                            setState({ ...state, isAutoTooltipTitle: checked });
                                            handleIsAutoTooltipTitle(checked);
                                        }} disabled={!state.isTooltipTitleActive}> Generate Auto Tooltip </Checkbox>
                                </Tooltip>
                            </Col>

                            <Col span={10} style={styles.verticallyCenteredColStyle}>
                                <span>Tooltip title :</span>
                            </Col>
                            <Col span={14}>
                                <Input defaultValue={customTooltipTitle}
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        settingRefs.current.settingsObj.customTooltipTitle = value;
                                        handleCustomTooltipTitle(value);
                                    }} disabled={!state.isTooltipTitleActive || (state.isTooltipTitleActive && state.isAutoTooltipTitle)} />
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>

            </TabPane>
        </>;

    return (
        <>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute', display: 'inline-flex' }}
                width={"35%"}
                height={"100%"}
                keyboard={true}
                closable={true}
                closeIcon={<CloseOutlined />}
                mask={false}
                maskClosable={false}
                headerStyle={{ border: 'none' }}
                footer={
                    <Space>

                        {<Button type="default" onClick={(event) => { onSaveChartSettings(settingRefs.current.settingsObj); }} icon={<SaveOutlined />}>Save</Button>}
                    </Space>
                }
            >
                <Tabs tabPosition="top"
                    renderTabBar={renderTabBar}
                    animated={true}
                >
                    {tabBody}
                </Tabs>


            </Drawer >

        </>
    )
}

/** CONSTANTS */
const ChartDataType = {
    bar: "with1Numeric",
    line: "with1Numeric",
    area: "with1Numeric",
    pie: "with1String",
    donut: "with1String",
    column: "with1Numeric",
    dualAxes: "with1String",
    bidirectionalBarHorizontal: "with1String",
    bidirectionalBarVertical: "with1String",
    radarLine: "with1Numeric",
    radialBar: "with1Numeric",
    rose: "with1Numeric"
};


const ChartTypes = [
    "bar",
    "radialBar",
    "line",
    "pie",
    "donut",
    "area",
    "column",
    "dualAxes",
    "bidirectionalBarHorizontal",
    "bidirectionalBarVertical",
    "radarLine",
    "rose"
];

const ChartInstanceType = {
    bar: Bar,
    line: Line,
    area: Area,
    pie: Pie,
    donut: Pie,
    column: Column,
    dualAxes: DualAxes,
    bidirectionalBarHorizontal: BidirectionalBar,
    bidirectionalBarVertical: BidirectionalBar,
    radarLine: Radar,
    radialBar: RadialBar,
    rose: Rose,
}

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
    { name: "group", value: "Grouped" },
    { name: "stack", value: "Stacked" },
    { name: "percent", value: "Percent" }
]

/** DEFAULTS */
const dataLimitCount = 250;

/** UTILS */

const GetChartColors = (category, chartObj) => {
    return chartObj?.filter(x => x["column"] === category)[0]?.color || randomColor();
};

const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();

const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();

const GetChartGeometry = (category, chartObj) => chartObj?.filter(x => x["column"] === category)?.[0]?.geomType || "line";

const GetGeometryOptions = (chartObj, colNameGeom) => {
    let result = [];
    chartObj?.forEach(obj => {


        let geomObj = colNameGeom?.filter(x => x["colName"] === obj);

        let geom = "line";
        if (geomObj && geomObj?.length === 1 && geomObj[0]) {
            geom = geomObj[0]["geometry"] || "line";
        }

        result.push(
            Object.assign({}, {
                geometry: geom || GetChartGeometry(obj, chartObj),
                color: obj.color, smooth: true, connectNulls: false
            })
        );


    });
    return result;
};

const ColorAddUpdate = (obj, colName, color) => {
    if (!color) { color = randomColor(); }
    if (!obj.colNameColor) { obj.colNameColor = []; }
    let settingsIndex = obj.colNameColor.findIndex(x => x["colName"] === colName);
    if (settingsIndex === -1) {
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
    if (settingsIndex === -1) {
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



/** DYNAMICCHARTS**************************************************************************** */

const DynamicChart = (props) => {
    let { data, style, chartName, settings, strKeys, numericColumns } = props;

    // TODO CANSU TEST İÇİN EKLENDİ, SİLİNECEK
    if (settings && settings.chartType) {
        chartName = settings.chartType;
    } else if (!chartName) {
        chartName = "bar";
    }

    const [visible, setVisible] = useState(false);
    const [sliderColor, setSliderColor] = useState(GetSliderColor(settings));

    const chartRefs = useRef({
        chartData: [],
        data: {},
        chart: null,
        isInit: false, isSync: false, isChartPossible: true,
        config: { ...initialBarConfig, ...style },
        selectedChart: chartName,
        dataWith1Numeric: [], dataWith1String: [], numericColumnNames: [],
        strKey: null,
        strCount: 0, selectedData: [], numericColumnsFiltered: [],
        numericColumnsFormat: {},
        chartObject: [],
        geometryOptions: [],
        // chart settings :
        chartSettings: settings || {
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
        settings =
        {
            chartType: chartRefs.current.selectedChart,
            categoryField: chartRefs.current.strKey,
            valField: chartRefs.current.numericColumnsFiltered,
            selectedDataViewMode: [dataViewModes?.[0]?.name],
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
            dataLimitCount: chartRefs.current.chartSettings.dataLimitCount,
            isAggregate: chartRefs.current.chartSettings.isAggregate,
        }
    }

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
                formatter: (text, item) => chartRefs.current.numericColumnsFiltered.filter(x => x === text)?.[0]
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
            ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x === item[seriesField_with1numeric])?.[0], value: item["value"] }),
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
                    shadowBlur: 0,
                    cursor: 'pointer'
                }
            },
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
                    shadowBlur: 0,
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

    // -- data with 1 string config -- 
    const labelStr = {
        type: 'spider',
        labelHeight: 28,
        content: ({ percent }) => `${(percent * 100).toFixed(2)}%`,
        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
        rotate: chartRefs.current.chartSettings.isLabelRotate,
        animate: true,
        layout: 'overlap',

    }

    // -- common configs end --

    const tooltipStr = {
        shared: true,
        showMarkers: false,
        showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
        showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs,
    };

    const SetObjColor = (selectedKeys) => {
        // sets color to object and returns it back
        let index, existingColor, newColor = randomColor();
        let promise = new Promise((resolve, reject) => {
            let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
                index = chartRefs.current.chartObject.findIndex(x => x === column);
                existingColor = chartRefs.current.chartObject[index]?.color;

                if (!existingColor) {
                    settings = ColorAddUpdate(settings, column, newColor);
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

    const SetObjGeom = (selectedKeys) => {
        // sets geometry to object and returns it back
        let index, existingGeom, newGeom = "line"
        let promise = new Promise((resolve, reject) => {
            if (chartRefs.current.chartObject?.length === 0) { reject("hata"); }

            let result = chartRefs.current.numericColumnsFiltered?.map((column) => {
                index = chartRefs.current.chartObject.findIndex(x => { return x && x === column });
                existingGeom = chartRefs.current.chartObject[index]?.geometry;

                if (!existingGeom) {
                    settings = GeomAddUpdate(settings, column, newGeom);
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

        chartRefs.current.numericColumnsFiltered = numericColumns?.filter(x => selectedKeys.includes(x));
        if (chartRefs.current.selectedChart !== "dualAxes") {
            SetObjColor(selectedKeys).then((result) => chartRefs.current.chartObject = result);
        } else {
            SetObjColor(selectedKeys).then((result) => {
                chartRefs.current.chartObject = result;
                SetObjGeom(selectedKeys).then((result) => {
                    chartRefs.current.chartObject = result;
                })
            });
        }

        if (chartRefs.current.selectedChart === "dualAxes" && selectedKeys?.length < 2) {
            showWarnings({
                description: "warningDualAxisUsage",
            });
            return;
        }
    }

    const syncSettings = (settingsObj) => {
        let promise = new Promise((resolve, reject) => {
            if (!settingsObj) { resolve(true); }
            if (settingsObj.categoryField) {
                chartRefs.current.strKey = settingsObj.categoryField;
            }
            if (settingsObj.valField?.length > 0) {
                if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumnsFiltered.filter((col) => settingsObj.valField.includes(col));
                } else {
                    chartRefs.current.numericColumnsFiltered = numericColumns?.filter((col) => settingsObj.valField.includes(col));
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
            chartRefs.current.chartSettings.dataLimitCount = settingsObj.dataLimitCount ? settingsObj.dataLimitCount : dataLimitCount;
            chartRefs.current.chartSettings.isAggregate = settingsObj.isAggregate;

            resolve(true);
        });

        return promise;

    }

    const validateSettings = () => {
        let promise = new Promise((resolve, reject) => {
            if (chartRefs.current.selectedChart === "dualAxes" && chartRefs.current.numericColumnsFiltered?.length < 2) {
                showWarnings({
                    title: "İşlem başarısız",
                    description: "warningdualAxesUsage"
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
                        // ----handleChartTypeSelection----
                        renderChart(chartRefs.current.selectedChart);
                        setVisible(false);
                    }
                });
            }
        });
    }

    const saveSettings = (settingsObj) => {

        applySettings(settingsObj);

        // dashboardServices.getDashboardMeta().then((result) => {
        //     let pages = result.Data["pages"];
        //     if (pages?.[0].data?.[item]) {
        //         pages[0].data[item]["chartSettings"] = settingsObj;
        //     }
        //     dashboardServices.saveDashboardMeta(result.Data).then((result) => {
        //         message.info(i18n.t("settingsSaveSuccess"));
        //     }).catch(err => message.error(`${i18n.t("errSettingsSave")} : ${err}`));
        // });
    }


    const GetManipulatedData = (chartName) => {

        let promise = new Promise((resolve, reject) => {

            let dataType = ChartDataType[chartName];

            let cellVal = 0;

            switch (dataType) {
                case "with1Numeric":

                    chartRefs.current.dataWith1Numeric = [];
                    chartRefs.current.selectedData = chartRefs.current.chartData;

                    let strVal = "";
                    chartRefs.current.selectedData.forEach((row, rowIndex) => {

                        if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                            return;

                        strVal = chartRefs.current.chartData[rowIndex] && chartRefs.current.chartData[rowIndex][chartRefs.current.strKey?.replace('_', '.')];

                        cellVal = 0;
                        if (chartRefs.current.numericColumnsFiltered?.length > 0) {
                            chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {

                                cellVal = parseInt(chartRefs.current.chartData[rowIndex][col]);
                                if (chartRefs.current.chartData[rowIndex][col] || cellVal) {
                                    var found = chartRefs.current.dataWith1Numeric?.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col);
                                    if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                        found[0]["value"] += cellVal;
                                        found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                    } else {
                                        try {
                                            chartRefs.current.dataWith1Numeric?.push({
                                                value: parseFloat(cellVal?.toFixed(2)),
                                                category: col,
                                                stringColForNumeric: strVal
                                            });
                                        } catch (error) {
                                            console.error(error);
                                            return;
                                        }

                                    }
                                }

                            });
                        } else {
                            numericColumns?.forEach((col, colIndex) => {
                                if (!col.PrimaryKey) {
                                    cellVal = parseInt(chartRefs.current.chartData[rowIndex][col]);
                                    if (chartRefs.current.chartData[rowIndex][col] || cellVal) {
                                        var found = chartRefs.current.dataWith1Numeric?.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col);
                                        if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                            found[0]["value"] += cellVal;
                                            found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                        } else {
                                            chartRefs.current.dataWith1Numeric?.push({
                                                value: parseFloat(cellVal?.toFixed(2)),
                                                category: col,
                                                stringColForNumeric: strVal
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    });

                    resolve({ data: chartRefs.current.dataWith1Numeric });
                    break;
                case "with1String":
                    chartRefs.current.dataWith1String = [];
                    chartRefs.current.selectedData = null;
                    chartRefs.current.numericColumnsFormat = {};

                    chartRefs.current.selectedData = chartRefs.current.chartData;

                    if (settings?.valField && settings?.valField.length > 0) {
                        chartRefs.current.numericColumnsFiltered = numericColumns?.filter((col) => settings?.valField?.includes(col));
                    } else {
                        chartRefs.current.numericColumnsFiltered = numericColumns;
                    }

                    chartRefs.current.numericColumnNames = chartRefs.current.numericColumnsFiltered?.map(col => col.replace('.', '_'))

                    let obj = {};
                    let strCellVal = "";
                    let foundItem = null;
                    chartRefs.current.selectedData.forEach((row, rowIndex) => {
                        if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                            return;

                        obj = {};
                        numericColumns?.forEach((col) => {
                            // ilk '.', '_' ile değiştirilmeli. Çünkü chart '.' içeren alanlar için legend ı gizleyebiliyor ancak geri açamıyor.
                            cellVal = 0;
                            strKeys?.map(key => {
                                strCellVal = chartRefs.current.chartData[rowIndex][key.replace('_', '.')];
                                foundItem = chartRefs.current.dataWith1String?.filter(x => x[key] === strCellVal);
                                cellVal = parseInt(chartRefs.current.chartData[rowIndex][col]);

                                if (chartRefs.current.chartSettings.isAggregate && foundItem?.length > 0) {
                                    foundItem[0][col.replace('.', '_')] += parseFloat(cellVal);
                                } else {
                                    obj[key.replace('.', '_')] = strCellVal;
                                    obj[col.replace('.', '_')] = parseInt(cellVal);

                                    if (!chartRefs.current.numericColumnsFormat[col.replace('.', '_')]) {
                                        chartRefs.current.numericColumnsFormat[col.replace('.', '_')] = {
                                            alias: col.replace('.', '_'),
                                            value: cellVal.toLocaleString()
                                        }
                                    }
                                }
                            });
                        });
                        if (Object.keys(obj).length > 0) { // Object empty check // TODO CANSU : ADD AS UTILS FUNCTION
                            chartRefs.current.dataWith1String?.push(obj);
                        }
                    });

                    resolve({ data: chartRefs.current.dataWith1String });
                    break;
                default:
                    resolve([]);
                    break;
            }

        });
        return promise;
    };

    const SetChartConfig = (chartName) => {
        switch (chartName) {
            case "bar":
            case "radialBar":
            case "rose":
                chartRefs.current.config = {
                    data: chartRefs.current.chartSettings.isReverseData ? chartRefs.current.dataWith1Numeric.reverse() : chartRefs.current.dataWith1Numeric,
                    isGroup: (chartName !== "rose" && chartRefs.current.chartSettings.selectedDataViewMode?.includes("group")),
                    isStack: (chartName === "rose" ? true : chartRefs.current.chartSettings.selectedDataViewMode?.includes("stack")),
                    isPercent: (chartName !== "rose" && chartRefs.current.chartSettings.selectedDataViewMode?.includes("percent")),
                    seriesField: seriesField_with1numeric,
                    label: (chartName === "rose" ? false : !chartRefs.current.chartSettings.labelActive ? null : {
                        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
                        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
                        rotate: chartRefs.current.chartSettings.isLabelRotate,
                    }),
                    theme: "light",
                    colorField: seriesField_with1numeric,
                    color: ({ category }) => {
                        let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
                            || settings?.colNameColor?.filter(x => x["colName"] === category);

                        let color;
                        if (colorObj?.[0]) {
                            color = colorObj[0]["color"];
                        }
                        return color || GetChartColors(category, chartRefs.current.chartObject);

                    },
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
                            && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered?.filter(x => x === text)?.[0]}\nOrt.${CalcAverageValue(chartRefs.current.dataWith1Numeric, seriesField_with1numeric, text)}`
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
                            ({ name: chartRefs.current.numericColumnsFiltered?.filter(x => x === item[seriesField_with1numeric])?.[0], value: parseFloat(item["value"]).toFixed(2) }),
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
            case "radarLine":
                chartRefs.current.config = {
                    data: chartRefs.current.chartSettings.isReverseData ? chartRefs.current.dataWith1Numeric.reverse() : chartRefs.current.dataWith1Numeric,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
                    seriesField: seriesField_with1numeric,
                    label: !chartRefs.current.chartSettings.labelActive ? null : {
                        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
                        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
                        rotate: chartRefs.current.chartSettings.isLabelRotate,
                    },
                    theme: "light",
                    colorField: seriesField_with1numeric,
                    color: ({ category }) => {
                        let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
                            || settings?.colNameColor?.filter(x => x["colName"] === category);

                        let color;
                        if (colorObj?.[0]) {
                            color = colorObj[0]["color"];
                        }
                        return color || GetChartColors(category, chartRefs.current.chartObject);
                        //return `l(99) 0:${color || GetChartColors(category, chartRefs.current.chartObject)} 1:rgba(255,255,255,0.2)`;


                    },
                    legend: chartRefs.current.chartSettings.legendActive && {
                        title: chartRefs.current.chartSettings.showChartTitle && chartRefs.current.chartSettings.chartTitle
                            && { text: chartRefs.current.chartSettings.chartTitle, style: legendStyle },
                        slidable: true,
                        position: chartRefs.current.chartSettings.legendPosition,
                        layout: chartRefs.current.chartSettings.legendLayout,
                        itemName: {
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered?.filter(x => x === text)?.[0]}\nOrt. ${CalcAverageValue(chartRefs.current.dataWith1Numeric, seriesField_with1numeric, text)}`
                        },
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: {
                        showTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
                        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
                        formatter: (item) =>
                            ({ name: chartRefs.current.numericColumnsFiltered?.filter(x => x === item[seriesField_with1numeric])?.[0], value: item["value"] }),
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
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }, { type: 'element-highlight-by-color' }, { type: 'element-link' }],
                };
                break;
            case "pie":
            case "donut":
                chartRefs.current.config = {
                    appendPadding: 5,
                    data: chartRefs.current.dataWith1String,
                    angleField: chartRefs.current.numericColumnNames?.[0],
                    colorField: strKeys && strKeys?.[0],
                    radius: 1,
                    innerRadius: chartName === "donut" ? 0.6 : false,
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
                    //  label: getLabelStr,
                    label: {
                        type: 'outer',
                        labelHeight: 28,
                        content: chartRefs.current.chartSettings.isPercent ? ({ percent }) => `${(percent * 100).toFixed(2)}%` : '',
                        style: { fontSize: chartRefs.current.chartSettings.labelFontSize, fill: chartRefs.current.chartSettings.selectedLabelColor },
                        position: chartRefs.current.chartSettings.labelPosition === 'auto' ? '' : chartRefs.current.chartSettings.labelPosition,
                        rotate: chartRefs.current.chartSettings.isLabelRotate,
                        animate: true,
                        layout: 'overlap'
                    },
                    tooltip: {
                        fields: [...chartRefs.current.numericColumnNames],
                    },
                    animation: animationZoomIn,
                    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
                    statistic: {
                        title: { formatter: (item) => "Total" },
                        content: {
                            style: {
                                whiteSpace: "pre-wrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            },
                        }
                    },
                };
                break;
            case "dualAxes":
                chartRefs.current.config = {
                    data: [chartRefs.current.dataWith1String, chartRefs.current.dataWith1String],
                    xField: strKeys?.[0],
                    yField: chartRefs.current.numericColumnNames,
                    meta: chartRefs.current.numericColumnsFormat,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
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
                    animation: animationPathIn,
                    geometryOptions: GetGeometryOptions(chartRefs.current.chartObject, (chartRefs.current.chartSettings.colNameGeom || settings?.colNameGeom)),
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };
                break;
            case "bidirectionalBarHorizontal":
            case "bidirectionalBarVertical":
                chartRefs.current.config = {
                    data: chartRefs.current.dataWith1String,
                    xField: strKeys?.[0],
                    xAxis: { position: 'bottom' },
                    yField: chartRefs.current.numericColumnNames,
                    meta: chartRefs.current.numericColumnsFormat,
                    label: chartRefs.current.chartSettings.labelActive && labelStr,
                    isGroup: chartRefs.current.chartSettings.isGrouped,
                    isStack: chartRefs.current.chartSettings.isStack,
                    isPercent: chartRefs.current.chartSettings.isPercent,
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
                    layout: chartName === "bidirectionalBarVertical" && 'vertical',
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };

                break;
            default:

                break;
        }
    }

    const initChart = () => {
        chartRefs.current.chartData = data;
        chartRefs.current.strCount = strKeys?.length;

        chartRefs.current.strKey = strKeys?.[0];
        Object.assign(chartRefs.current.numericColumnsFiltered, numericColumns);

        if (settings) {
            syncSettings(settings).then(result => {
                if (result) {
                    chartRefs.current.chartObject = numericColumns?.map(column => {
                        // color settings :
                        let colorSetting = settings["colNameColor"]?.filter(x => x["colName"] === column);
                        let color = null;

                        if (colorSetting?.[0]?.color) {
                            color = colorSetting[0].color;
                        } else {
                            settings = ColorAddUpdate(settings, column, color);
                            color = settings["colNameColor"]?.filter(x => x["colName"] === column)?.[0]?.color;
                        }
                        // geometry settings :
                        let geomSetting = settings["colNameGeom"]?.filter(x => x["colName"] === column);
                        let geom = null;
                        if (geomSetting?.[0]?.geometry) {
                            geom = geomSetting[0].geometry;
                        } else {
                            settings = GeomAddUpdate(settings, column, geom);
                            geom = settings["colNameGeom"]?.filter(x => x["colName"] === column)?.[0]?.geometry;
                        }
                        return Object.assign({}, { column }, {
                            color: color,
                            geomType: geom
                        })
                    });
                }
            });

        } else {
            chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, {
                color: randomColor(),
                geomType: GetChartGeometry(column, chartRefs.current.chartObject) || 'line'
            }));
            //setIsInit(chartRefs.current.chartObject?.length > 0);
        }


        chartRefs.current.isChartPossible = (!numericColumns ||
            (numericColumns && numericColumns?.length === 0)
            || chartRefs.current.strCount < 1)
    }

    // export image
    const downloadImage = () => {
        var a = document.createElement("a");
        a.href = document.querySelectorAll('#dynamicChartContainer canvas')?.[0].toDataURL()
        a.download = `${chartRefs.current.chartSettings.chartTitle || chartName}.jpg`; //File name 
        a.click();
    };

    const renderChart = (chartName) => {
        if (document.getElementById("dynamicChartContainer")) {
            GetManipulatedData(chartName).then(({ data }) => {
                SetChartConfig(chartName);
                chartRefs.current.chart?.destroy();
                if (chartName === "dualAxes") {
                    chartRefs.current.chart = new ChartInstanceType[chartName]("dynamicChartContainer", { ...chartRefs.current.config, data: [data, data] });
                }
                else {
                    chartRefs.current.chart = new ChartInstanceType[chartName]("dynamicChartContainer", { ...chartRefs.current.config, ...{ data } });
                }
                chartRefs.current.chart?.render();
            });

        }
    }

    useEffect(() => {
        const containerElement = document.getElementById("dynamicChartContainer");
        if (containerElement) {
            initChart();
            renderChart(chartName);
        }

        return () => {
            // cleanup
            // TODO CANSU BUNA GEREK KALMAYABİLİR.
        }
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <div id="dynamicChartContainer" style={style} />
            <>

                <Button type="default" onClick={downloadImage} style={{ marginRight: 24 }}>
                    <ExportOutlined /> Download image
                </Button>
                <Button type="default" onClick={() => setVisible(true)} style={{ marginRight: 24 }}>
                    <SettingOutlined /> Settings
                </Button>
            </>
            {
                visible && <Settings
                    settingsObj={settings}
                    onSaveChartSettings={saveSettings}
                    isVisible={visible} selectedChart={chartRefs.current.selectedChart} strKey={chartRefs.current.strKey} strColumns={strKeys}
                    numericColumns={numericColumns}
                    numericColumnsFiltered={chartRefs.current.numericColumnsFiltered}
                    handleSelectedChart={(value) => {
                        chartRefs.current.selectedChart = value;
                        chartRefs.current.chartSettings.labelActive = (value === "pie" || value === "donut");
                        chartRefs.current.chartSettings.axisVisibility["xAxis"] = (value === "radarLine");
                        chartRefs.current.chartSettings.axisVisibility["yAxis"] = (value === "radarLine");
                    }}
                    handleStrFieldMenuClick={(item) => chartRefs.current.strKey = item.key}
                    applySettings={applySettings} onClose={() => setVisible(false)}
                    handleNumFieldChange={handleNumFieldChange}
                    isReverseData={chartRefs.current.chartSettings.isReverseData}
                    handleReverseData={(checked) => chartRefs.current.chartSettings.isReverseData = checked}
                    chartObject={chartRefs.current.chartObject}
                    sliderColor={sliderColor}
                    showSlider={chartRefs.current.chartSettings.showSlider}
                    handleSliderShowCheck={(checked) => chartRefs.current.chartSettings.showSlider = checked}
                    handleSliderColorChange={(color) => setSliderColor(color.hex)}
                    axisVisibility={chartRefs.current.chartSettings.axisVisibility}
                    axisLineColor={chartRefs.current.chartSettings.axisLineColor}
                    axisLineShape={chartRefs.current.chartSettings.axisLineShape}
                    axisLineWidth={chartRefs.current.chartSettings.axisLineWidth}
                    axisTitle={chartRefs.current.chartSettings.axisTitle}
                    handleAxisTitle={(value) => chartRefs.current.chartSettings.axisTitle[chartRefs.current.selectedAxis] = value}
                    handleAxisLineWidth={(value, selectedAxis) => chartRefs.current.chartSettings.axisLineWidth[selectedAxis] = value}
                    handleAxisColorChange={(color, selectedAxis) => { chartRefs.current.chartSettings.axisLineColor[selectedAxis] = color.hex; }}
                    handleAxisShowCheck={(checked, selectedAxis) => { chartRefs.current.chartSettings.axisVisibility[selectedAxis] = checked }}
                    handleLineTypeSelect={(key, selectedAxis) => { chartRefs.current.chartSettings.axisLineShape[selectedAxis] = key; }}
                    autoFitActive={chartRefs.current.chartSettings.autoFitActive}
                    handleAutoFitActive={(checked) => chartRefs.current.chartSettings.autoFitActive = checked}
                    chartWidth={chartRefs.current.chartSettings.chartWidth}
                    handleChartWidth={(value) => chartRefs.current.chartSettings.chartWidth = parseInt(value)}
                    chartHeight={chartRefs.current.chartSettings.chartHeight}
                    handleChartHeight={(value) => chartRefs.current.chartSettings.chartHeight = parseInt(value)}
                    labelActive={chartRefs.current.chartSettings.labelActive}
                    labelPosition={chartRefs.current.chartSettings.labelPosition}
                    labelFontSize={chartRefs.current.chartSettings.labelFontSize}
                    isLabelRotate={chartRefs.current.chartSettings.isLabelRotate}
                    handleLabelRotate={(checked) => chartRefs.current.chartSettings.isLabelRotate = checked}
                    handleLabelFontSize={(value) => { chartRefs.current.chartSettings.labelFontSize = parseInt(value); }}
                    handleLabelPosition={(value) => { chartRefs.current.chartSettings.labelPosition = value }}
                    handleLabelActive={(checked) => chartRefs.current.chartSettings.labelActive = checked}
                    labelColor={chartRefs.current.chartSettings.selectedLabelColor}
                    handleLabelColor={(color) => {
                        chartRefs.current.chartSettings.selectedLabelColor = color.hex;
                        chartRefs.current.chartSettings.isCustomLabelColor = true
                    }}
                    legendActive={chartRefs.current.chartSettings.legendActive}
                    handleLegendActive={(checked) => chartRefs.current.chartSettings.legendActive = checked}
                    legendPosition={chartRefs.current.chartSettings.legendPosition}
                    handleLegendPosition={(value) => chartRefs.current.chartSettings.legendPosition = value}
                    legendLayout={chartRefs.current.chartSettings.legendLayout}
                    handleLegendLayout={(value) => chartRefs.current.chartSettings.legendLayout = value}
                    isTooltipTitleActive={chartRefs.current.chartSettings.isTooltipTitleActive}
                    handleIsTooltipTitleActive={(checked) => chartRefs.current.chartSettings.isTooltipTitleActive = checked}
                    isAutoTooltipTitle={chartRefs.current.chartSettings.isAutoTooltipTitle}
                    handleIsAutoTooltipTitle={(checked) => chartRefs.current.chartSettings.isAutoTooltipTitle = checked}
                    customTooltipTitle={chartRefs.current.chartSettings.customTooltipTitle}
                    handleCustomTooltipTitle={(value) => chartRefs.current.chartSettings.customTooltipTitle = value}
                    showChartTitle={chartRefs.current.showChartTitle}
                    handleShowChartTitle={(checked) => chartRefs.current.chartSettings.showChartTitle = checked}
                    chartTitle={chartRefs.current.chartSettings.chartTitle}
                    handleChartTitle={(value) => chartRefs.current.chartSettings.chartTitle = value}
                    handleGeomTypeChange={(value, currentColorColName) => {
                        chartRefs.current.currentGeomType = value;
                        if (currentColorColName) {
                            let index = chartRefs.current.chartObject.findIndex(x => x === currentColorColName);
                            chartRefs.current.chartObject[index].geomType = value;
                        }
                    }}
                    isGrouped={chartRefs.current.chartSettings.isGrouped}
                    isStacked={chartRefs.current.chartSettings.isStack}
                    isPercent={chartRefs.current.chartSettings.isPercent}
                    selectedDataViewMode={chartRefs.current.chartSettings.selectedDataViewMode}
                    handleDataViewModeChange={(value) => chartRefs.current.chartSettings.selectedDataViewMode = value}
                    dataLimitCount={chartRefs.current.chartSettings.dataLimitCount}
                    handleDataLimitCount={(value) => chartRefs.current.chartSettings.dataLimitCount = value}
                    isAggregate={chartRefs.current.chartSettings.isAggregate}
                    handleIsAggregate={(checked) => chartRefs.current.chartSettings.isAggregate = checked}
                />
            }
        </>);
}

/** DATAPROCESSOR */
function DataProcessingException(message) {
    this.message = message;
    this.name = 'DataProcessException';
}

const DataProcessor = (data) => {
    let numericColumns = [], strKeys = [];
    const promise = new Promise((resolve, reject) => {

        if (kindOf(data) === "array") {
            console.log("yes, continue...");
            if (data?.length === 0) {
                reject("Data is Null or Empty");
            }
            if (kindOf(data[0]) === "object") {
                for (const [key, value] of Object.entries(data[0])) {
                    console.log(key, value);
                    if (kindOf(value) === "number") {
                        numericColumns.push(key);
                    } else if (kindOf(value) === "string") {
                        strKeys.push(key);
                    }
                }
            }
            resolve({ strKeys, numericColumns });

        } else {
            reject(data);
            throw new DataProcessingException("Data is not an array!");
        }

    });
    return promise;
}

/** DYNAMICCHARTCLIENT */
const DynamicChartClient = (props) => {
    const { data } = props;
    const [strKeys, setStrKeys] = useState([]);
    const [numericColumns, setNumericColumns] = useState([]);

    useEffect(() => {

        DataProcessor(data).then((result) => {
            const { strKeys, numericColumns } = result;
            setStrKeys(strKeys);
            setNumericColumns(numericColumns);
        });

        return () => {

        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {strKeys.length > 0 && numericColumns.length > 0 && <DynamicChart {...{ strKeys, numericColumns, data }} style={{ height: '85vh', width: '95vw' }} />}
        </>
    )
}


export default DynamicChartClient;
