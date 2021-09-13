import React, { useState, useEffect, useRef } from 'react';
import { Bar, Line } from '@antv/g2plot';
import { Button, Row, notification } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDownload } from '@fortawesome/free-solid-svg-icons';
import Settings from './Settings';


const randomColor = require('randomcolor');

const DynamicChart = (props) => {
    let { data, style, chartName, settings } = props;
    chartName = chartName || "bar";
    /** CONSTANTS */
    const dataViewModes = [
        { name: "group", value: "Grup gösterimi" },
        { name: "stack", value: "Yığın gösterimi" },
        { name: "percent", value: "Yüzdelik gösterim" }
    ]

    /** VARIABLES */
    const [state, setState] = useState({
        showSettings: false,
        dataWith1Numeric: [], dataWith1String: [], numericColumnNames: []
    });
    let chartData = [];
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

    const chartRefs = useRef({
        isInit: false, isSync: false, isChartPossible: true,
        config: { ...initialBarConfig, ...style },
        selectedChart: chartName,
        numericColumsn: [], strKeys: [], strKey: null,
        strCount: 0, selectedData: [], strColumns: [], numericColumnsFiltered: [],
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



    /** USE EFFECTS */
    useEffect(() => {
        console.log("useeffect...")
        const containerElement = document.getElementById("dynamicChartContainer");
        if (containerElement) {
            let el = document.createElement("div");
            el.id = "containerCansu";
            containerElement.append(el);

            initChart(data);

        }

        return () => {
            // cleanup
            console.log("cleanup...");
        }
    }, []);
    // useEffect(() => {
    //     initChart(data);
    // }, []);

    useEffect(() => {
        const el = document.getElementById("containerCansu");
        if (chartRefs.current.strKey && chartRefs.current.numericColumns?.length > 0) {
            manageChartChange(chartName);
        }
    }, [chartRefs.current.strKey]);


    /** UTILITY FUNCTIONS */
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
    };
    const GetChartGeometry = (category, chartObj) => chartObj?.filter(x => x.Path === category)[0]?.geomType || "line";
    const GetChartColors = (category, chartObj) => {
        return chartObj?.filter(x => x.Path === category)[0]?.color || randomColor();
    };
    const CalcAverageValue = (data, type, text) => {
        const items = data.filter(x => x[type] === text);
        return items.length ? (items.reduce((a, b) => a + b.value, 0) / items.length).toFixed(1) : '-'
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
    };
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
    };

    /** CONFIG COMMONS */
    const legendStyle = {
        fill: 'black', fontSize: 18,
        shadowColor: '#C0C0C0',
        shadowBlur: 10
    }
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
    const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();
    const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();
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
    /** Other Operations */
    const [sliderColor, setSliderColor] = useState(GetSliderColor(settings));
    const manipulateData = (dataType) => { // TODO CANSU CONVERT THIS FUNCTION TO PROMISE

        state.dataWith1Numeric = []; state.dataWith1String = [];
        let cellVal = 0;

        switch (dataType) {
            case "with1Numeric":

                chartRefs.current.selectedData = chartData;

                let strVal = "";
                chartRefs.current.selectedData.forEach((row, rowIndex) => {

                    if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                        return;

                    strVal = chartData[rowIndex] && chartData[rowIndex][chartRefs.current.strKey?.replace('_', '.')]?.DisplayText;

                    cellVal = 0;
                    if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
                        chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {
                            if (!col.PrimaryKey) {
                                cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);
                                if (chartData[rowIndex][col]?.Value || cellVal) {
                                    var found = state.dataWith1Numeric.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                    if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                        found[0]["value"] += cellVal;
                                        found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                    } else {
                                        try {
                                            state.dataWith1Numeric.push({
                                                value: parseFloat(cellVal?.toFixed(2)),
                                                category: col.Path,
                                                stringColForNumeric: strVal
                                            });
                                        } catch (error) {
                                            console.error(error);
                                            return;
                                        }

                                    }
                                }
                            }
                        });
                    } else {
                        chartRefs.current.numericColumns.forEach((col, colIndex) => {
                            if (!col.PrimaryKey) {
                                cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);
                                if (chartData[rowIndex][col]?.Value || cellVal) {
                                    var found = state.dataWith1Numeric.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                    if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                        found[0]["value"] += cellVal;
                                        found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                    } else {
                                        state.dataWith1Numeric.push({
                                            value: parseFloat(cellVal?.toFixed(2)),
                                            category: col.Path,
                                            stringColForNumeric: strVal
                                        });
                                    }
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

                chartRefs.current.selectedData = chartData;

                // Filling numericColumnsfiltered if dashboard :
                if (state.isDashboard) {
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
                let obj = {};
                let strCellVal = "";
                let foundItem = null;
                chartRefs.current.selectedData.forEach((row, rowIndex) => {
                    if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                        return;

                    obj = {};
                    chartRefs.current.numericColumns.forEach((col) => {
                        // ilk '.', '_' ile değiştirilmeli. Çünkü chart '.' içeren alanlar için legend ı gizleyebiliyor ancak geri açamıyor.
                        cellVal = 0;
                        chartRefs.current.strKeys?.map(key => {
                            strCellVal = chartData[rowIndex][key.replace('_', '.')]?.DisplayText;
                            foundItem = state.dataWith1String.filter(x => x[key] === strCellVal);
                            cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);

                            if (chartRefs.current.chartSettings.isAggregate && foundItem?.length > 0) {
                                foundItem[0][col.Path.replace('.', '_')] += parseFloat(cellVal);
                            } else {
                                obj[key.replace('.', '_')] = strCellVal;
                                obj[col.Path.replace('.', '_')] = parseInt(cellVal);

                                if (!chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')]) {
                                    chartRefs.current.numericColumnsFormat[col.Path.replace('.', '_')] = {
                                        alias: col.DisplayName.replace('.', '_'),
                                        value: cellVal.toLocaleString()
                                    }
                                }
                            }
                        });
                    });
                    if (Object.keys(obj).length > 0) { // Object empty check // TODO CANSU : ADD AS UTILS FUNCTION
                        state.dataWith1String?.push(obj);
                    }
                });
                break;
        }

    }
    const manageChartChange = (chartName) => {
        switch (chartName) {
            case "bar":
            case "radial-bar":
            case "rose":
                console.log("CALLING MANIPULATE DATA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                manipulateData("with1Numeric");
                chartRefs.current.config = {
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
                        if (state.isDashboard) {
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
                            ({ name: chartRefs.current.numericColumnsFiltered.filter(x => x.ColumnName === item[seriesField_with1numeric])[0]?.DisplayName, value: parseFloat(item["value"]).toFixed(2) }),
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
                    theme: "light",
                    colorField: seriesField_with1numeric,
                    color: ({ category }) => {
                        let colorObj = chartRefs.current.chartSettings.colNameColor?.filter(x => x["colName"] === category)
                            || settings?.colNameColor?.filter(x => x["colName"] === category);

                        let color;
                        if (colorObj && colorObj?.length === 1 && colorObj[0]) {
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
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }, { type: 'element-highlight-by-color' }, { type: 'element-link' }],
                };
                break;
            case "pie":
            case "donut":

                break;
            case "dual-axis":

                break;
            case "bidirectional-bar-chart-horizontal":
            case "bidirectional-bar-chart-vertical":

                break;
        }
        setState({ ...state, dataWith1Numeric: state.dataWith1Numeric, dataWith1String: state.dataWith1String, numericColumnNames: state.numericColumnNames });
    }

    const syncSettings = (settingsObj) => {
        let promise = new Promise((resolve, reject) => {
            if (!settingsObj) resolve(true);
            if (settingsObj.categoryField) {
                chartRefs.current.strKey = settingsObj.categoryField;
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
            chartRefs.current.isSync = true;
            resolve(true);
        });

        return promise;

    }

    const saveSettings = (settingsObj) => {

        applySettings(settingsObj);

        // dashboardServices.getDashboardMeta().then((result) => {
        //     let pages = result.Data["pages"];
        //     if (pages && pages?.length === 1 && pages[0] && pages[0].data && pages[0].data[item]) {
        //         pages[0].data[item]["chartSettings"] = settingsObj;
        //     }
        //     dashboardServices.saveDashboardMeta(result.Data).then((result) => {
        //         message.info("Ayarlar kaydedildi!");
        //     }).catch(err => message.error(`Ayarlar kaydedilirken hata oluştu. ${err}`));
        // });
    }
    const showWarnings = (props) => {
        let { description } = props;
        notification.warning({
            message: `Uyarı`,
            description,
            placement: 'bottomRight'
        });
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
                        setState({ ...state, showSettings: false });
                    }
                });
            }
        });
    }
    const handleNumFieldChange = (selectedKeys) => {

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

        if (chartRefs.current.selectedChart === "dual-axis" && selectedKeys?.length < 2) {
            showWarnings({
                description: "Çift eksenli grafiğin kullanılabilmesi için minimum 2 değer kolonu seçilmelidir.",
            });
            return;
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
            chartRefs.current.strKey = chartRefs.current.strColumns[0]?.Path.replace('.', '_');
            chartRefs.current.strKeys = chartRefs.current.strColumns.map((col) => col.Path.replace('.', '_'));
            manageChartChange(chartName);
        }
        Object.assign(chartRefs.current.numericColumnsFiltered, chartRefs.current.numericColumns);

        if (settings) {
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
                    chartRefs.current.isInit = chartRefs.current.chartObject?.length > 0;
                }
            });

        } else {
            chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, {
                color: randomColor(),
                geomType: GetChartGeometry(column.Path, chartRefs.current.chartObject) || 'line'
            }));
            chartRefs.current.isInit = chartRefs.current.chartObject?.length > 0;
        }



        if (!chartRefs.current.numericColumns ||
            (chartRefs.current.numericColumns && chartRefs.current.numericColumns?.length == 0)
            || chartRefs.current.strCount < 1) {
            chartRefs.current.isChartPossible = false;
        } else {
            chartRefs.current.isChartPossible = true;
        }


    }

    useEffect(() => {
        debugger;
        if (chartRefs.current.isInit && chartRefs.current.config.data.length > 0) {
            switch (chartRefs.current.selectedChart) {
                case "bar":
                    const bar = new Bar('containerCansu', chartRefs.current.config);
                    bar.render();
                    break;
                case "line":
                    const line = new Line('containerCansu', chartRefs.current.config);
                    line.render();
                    break;

            }

        }
    }, [chartRefs.current.isInit, chartRefs.current.config.data]);

    return (
        <>
            <div id="dynamicChartContainer" />
            <Row>
                <Button type="default" onClick={() => { alert("download img") }} style={{ marginRight: 24 }}>
                    <FontAwesomeIcon icon={faDownload} size="lg" pull="left" />  Resmini indir
                </Button>
                <Button type="default" onClick={() => setState({ ...state, showSettings: true })} style={{ marginRight: 24 }}>
                    <FontAwesomeIcon icon={faCog} size="lg" pull="left" /> Ayarlar
                </Button>
            </Row>

            {state.showSettings && <Settings
                settingsObj={settings}
                onSaveChartSettings={saveSettings}
                isVisible={state.showSettings} selectedChart={chartRefs.current.selectedChart} strKey={chartRefs.current.strKey} strColumns={chartRefs.current.strColumns}
                numericColumns={chartRefs.current.numericColumns}
                numericColumnsFiltered={chartRefs.current.numericColumnsFiltered}
                handleSelectedChart={(value) => {
                    chartRefs.current.selectedChart = value;
                    chartRefs.current.chartSettings.labelActive = (value === "pie" || value === "donut");
                    chartRefs.current.chartSettings.axisVisibility["xAxis"] = (value === "radar-line");
                    chartRefs.current.chartSettings.axisVisibility["yAxis"] = (value === "radar-line");
                }}
                handleStrFieldMenuClick={(item) => { chartRefs.current.strKey = item.key; }}
                applySettings={applySettings} onClose={() => { setState({ showSettings: false }) }}
                handleNumFieldChange={handleNumFieldChange}
                isReverseData={chartRefs.current.chartSettings.isReverseData}
                handleReverseData={(checked) => chartRefs.current.chartSettings.isReverseData = checked}
                chartObject={chartRefs.current.chartObject}
                strKey={chartRefs.current.strKey}
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
                        let index = chartRefs.current.chartObject.findIndex(x => x.Path === currentColorColName);
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
            />}
        </>
    )
}

export default DynamicChart
