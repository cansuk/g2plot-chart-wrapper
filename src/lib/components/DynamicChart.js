import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar, Pie, Area, Column, DualAxes, BidirectionalBar, Radar, RadialBar, Rose } from '@antv/g2plot';


import { Radio } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const randomColor = require('randomcolor');

const DynamicChart = (props) => {
    const { data, style, settings } = props;
    const chartName = props.chartName || "bar";
    const [state, setState] = useState({
        showSettings: false,

    });

    const seriesField_with1numeric = "category";

    const dataViewModes = [
        { name: "group", value: "Grup gösterimi" },
        { name: "stack", value: "Yığın gösterimi" },
        { name: "percent", value: "Yüzdelik gösterim" }
    ];

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
        chartData: [],
        chart: null,
        isInit: false, isSync: false, isChartPossible: true,
        config: { ...initialBarConfig, ...style },
        selectedChart: chartName,

        dataWith1Numeric: [], dataWith1String: [], numericColumnNames: [],

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
    const tooltipStr = {
        shared: true,
        showMarkers: false,
        showChartTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
        showCrosshairs: chartRefs.current.chartSettings.showTooltipCrosshairs
    };

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

    // let chartData = [];
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
        const items = data?.filter(x => x[type] === text);
        return items.length ? (items.reduce((a, b) => a + b.value, 0) / items.length).toFixed(1) : '-'
    };
    const SetObjColor = (selectedKeys) => {
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
    const SetObjGeom = (selectedKeys) => {
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
    const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();

    const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();
    const GetGeometryOptions = (chartObj, colNameGeom) => {
        let result = [];
        chartObj.forEach(obj => {
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


        });
        return result;
    };
    /**end of utility functions */

    const syncSettings = (settingsObj) => {
        let promise = new Promise((resolve, reject) => {
            if (!settingsObj) resolve(true);
            if (settingsObj.categoryField) {
                chartRefs.current.strKey = settingsObj.categoryField;
            }
            if (settingsObj.valField?.length > 0) {
                if (chartRefs.current.numericColumnsFiltered?.length > 0) {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumnsFiltered?.filter((col) => settingsObj.valField.includes(col.Path));
                } else {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter((col) => settingsObj.valField.includes(col.Path));
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
    const initChart = async ({ columns, dataList }) => {
        chartRefs.current.chartData = dataList;
        chartRefs.current.numericColumns = columns?.filter(x => (!x.PrimaryKey && x.DataTypeName.toLocaleLowerCase().includes("double") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Float") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Decimal") && x.ViewEditor.TypeName !== "LookUp") ||
            (!x.PrimaryKey && x.DataTypeName.includes("Int") && x.ViewEditor.TypeName !== "LookUp")); // TODO CANSU ŞİMDİLİK LOOKUPLAR ELENDİ
        chartRefs.current.strColumns = columns?.filter(x => x.DataTypeName === "String");
        chartRefs.current.strCount = chartRefs.current.strColumns?.length;
        if (chartRefs.current.strCount > 0) {
            chartRefs.current.strKey = chartRefs.current.strColumns[0]?.Path.replace('.', '_');
            chartRefs.current.strKeys = chartRefs.current.strColumns.map((col) => col.Path.replace('.', '_'));
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
            chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns;
            chartRefs.current.chartObject = chartRefs.current.numericColumnsFiltered?.map(column => Object.assign({}, column, {
                color: randomColor(),
                geomType: GetChartGeometry(column.Path, chartRefs.current.chartObject) || 'line'
            }));
            chartRefs.current.isInit = chartRefs.current.chartObject?.length > 0;
        }



        if (!chartRefs.current.numericColumns ||
            (chartRefs.current.numericColumns && chartRefs.current.numericColumns?.length === 0)
            || chartRefs.current.strCount < 1) {
            chartRefs.current.isChartPossible = false;
        } else {
            chartRefs.current.isChartPossible = true;
        }


    }

    const ChartDataType = {
        bar: "with1Numeric",
        line: "with1Numeric",
        area: "with1Numeric",
        pie: "with1String",
        donut: "with1String",
        column: "with1Numeric",
        dualAxes: "with1String",
        bidirectionalBar: "with1String",
        radarLine: "with1Numeric",
        radialBar: "with1Numeric",
        rose: "with1Numeric"
    };

    const ChartType = {
        bar: Bar,
        line: Line,
        area: Area,
        pie: Pie,
        donut: Pie,
        column: Column,
        dualAxes: DualAxes,
        bidirectionalBar: BidirectionalBar,
        radarLine: Radar,
        radialBar: RadialBar,
        rose: Rose,
    }

    const GetManipulatedData = (chartName) => {

        let promise = new Promise((resolve, reject) => {
            debugger;
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

                        strVal = chartRefs.current.chartData[rowIndex] && chartRefs.current.chartData[rowIndex][chartRefs.current.strKey?.replace('_', '.')]?.DisplayText;

                        cellVal = 0;
                        if (chartRefs.current.numericColumnsFiltered?.length > 0) {
                            chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {
                                if (!col.PrimaryKey) {
                                    cellVal = parseInt(chartRefs.current.chartData[rowIndex][col.Path]?.Value);
                                    if (chartRefs.current.chartData[rowIndex][col]?.Value || cellVal) {
                                        var found = chartRefs.current.dataWith1Numeric?.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                        if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                            found[0]["value"] += cellVal;
                                            found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                        } else {
                                            try {
                                                chartRefs.current.dataWith1Numeric?.push({
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
                                    cellVal = parseInt(chartRefs.current.chartData[rowIndex][col.Path]?.Value);
                                    if (chartRefs.current.chartData[rowIndex][col]?.Value || cellVal) {
                                        var found = chartRefs.current.dataWith1Numeric?.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                        if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                            found[0]["value"] += cellVal;
                                            found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                        } else {
                                            chartRefs.current.dataWith1Numeric?.push({
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

                    resolve({ data: chartRefs.current.dataWith1Numeric });
                    break;
                case "with1String":
                    chartRefs.current.dataWith1String = [];
                    chartRefs.current.selectedData = null;
                    setState({ ...state, numericColumnNames: [] });
                    chartRefs.current.numericColumnsFormat = {};

                    chartRefs.current.selectedData = chartRefs.current.chartData;

                    if (settings?.valField && settings?.valField.length > 0) {
                        chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns?.filter((col) => settings?.valField?.includes(col.Path));
                    } else {
                        chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns;
                    }

                    chartRefs.current.numericColumnNames = chartRefs.current.numericColumnsFiltered?.map(col => col.Path.replace('.', '_'))


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
                                strCellVal = chartRefs.current.chartData[rowIndex][key.replace('_', '.')]?.DisplayText;
                                foundItem = chartRefs.current.dataWith1String?.filter(x => x[key] === strCellVal);
                                cellVal = parseInt(chartRefs.current.chartData[rowIndex][col.Path]?.Value);

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
                            chartRefs.current.dataWith1String?.push(obj);
                        }
                    });

                    resolve({ data: chartRefs.current.dataWith1String });
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
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered?.filter(x => x.ColumnName === text)?.[0]?.DisplayName}\nOrt.${CalcAverageValue(chartRefs.current.dataWith1Numeric, seriesField_with1numeric, text)}`
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
                            ({ name: chartRefs.current.numericColumnsFiltered?.filter(x => x.ColumnName === item[seriesField_with1numeric])?.[0]?.DisplayName, value: parseFloat(item["value"]).toFixed(2) }),
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
                            formatter: (text, item) => `${chartRefs.current.numericColumnsFiltered?.filter(x => x.ColumnName === text)?.[0]?.DisplayName}\nOrt. ${CalcAverageValue(chartRefs.current.dataWith1Numeric, seriesField_with1numeric, text)}`
                        },
                    },
                    autoFit: chartRefs.current.chartSettings.autoFitActive,
                    width: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartWidth,
                    height: !chartRefs.current.chartSettings.autoFitActive && chartRefs.current.chartSettings.chartHeight,
                    tooltip: {
                        showTitle: chartRefs.current.chartSettings.isTooltipTitleActive,
                        title: chartRefs.current.chartSettings.isAutoTooltipTitle ? '' : chartRefs.current.chartSettings.customTooltipTitle,
                        formatter: (item) =>
                            ({ name: chartRefs.current.numericColumnsFiltered?.filter(x => x.ColumnName === item[seriesField_with1numeric])?.[0]?.DisplayName, value: item["value"] }),
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
                    colorField: chartRefs.current.strKeys && chartRefs.current.strKeys?.[0],
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
                    xField: chartRefs.current.strKeys?.[0],
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
            case "bidirectionalBar":
                chartRefs.current.config = {
                    data: chartRefs.current.dataWith1String,
                    xField: chartRefs.current.strKeys?.[0],
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
                    layout: chartName === "bidirectional-bar-chart-vertical" && 'vertical',
                    interactions: [{ type: 'marker-active' }, { type: 'brush' }],
                };

                break;
        }
    }



    useEffect(() => {
        initChart(data);

        if (document.getElementById("container")) {

            // GetManipulatedData(chartName).then(({ data }) => {
            //     chartRefs.current.chart = new ChartType[chartName]("container", { ...chartRefs.current.config, ...{ data } });
            //     chartRefs.current.chart?.render();
            // });

            GetManipulatedData(chartName).then(({ data }) => {
                if (chartName === "dualAxis")
                    chartRefs.current.chart = new ChartType[chartName]("container", { ...chartRefs.current.config, ...{ ...[data, data] } });
                else
                    chartRefs.current.chart = new ChartType[chartName]("container", { ...chartRefs.current.config, ...{ data } });
                chartRefs.current.chart?.render();
            });

        }
    }, []);

    const handleChartTypeSelection = (e) => {
        chartRefs.current.selectedChart = e.target.value;

        chartRefs.current.chart?.destroy();


        GetManipulatedData(chartRefs.current.selectedChart).then(({ data }) => {
            SetChartConfig(chartRefs.current.selectedChart);
            chartRefs.current.chart = new ChartType[chartRefs.current.selectedChart]("container", { ...chartRefs.current.config });
            chartRefs.current.chart?.render();
        }).catch(err => console.error("exception while preparing data... ", err));

        // GetManipulatedData(chartRefs.current.selectedChart).then(({ data }) => {
        //     var test = new ChartType[chartRefs.current.selectedChart]("container", {});
        //     console.log(test);
        //     if (chartRefs.current.selectedChart === "dualAxis") {
        //         debugger;
        //         chartRefs.current.chart = new ChartType[chartRefs.current.selectedChart]("container", { ...chartRefs.current.config, ...{ ...[data, data] } });
        //     }
        //     else {
        //         debugger;
        //         chartRefs.current.chart = new ChartType[chartRefs.current.selectedChart]("container", { ...chartRefs.current.config, ...{ data } });
        //     }
        //     chartRefs.current.chart?.render();
        // });
    }

    return (
        <>
            <Radio.Group onChange={handleChartTypeSelection} defaultValue="bar">
                <Radio.Button value="bar">Bar</Radio.Button>
                <Radio.Button value="line">Line</Radio.Button>
                <Radio.Button value="area">Area</Radio.Button>
                <Radio.Button value="pie">Pie</Radio.Button>
                <Radio.Button value="column">Column</Radio.Button>
                <Radio.Button value="dualAxes">DualAxes</Radio.Button>
                <Radio.Button value="bidirectionalBar">Bidirectional Bar</Radio.Button>
                <Radio.Button value="radarLine">Radar</Radio.Button>
                <Radio.Button value="radialBar">RadialBar</Radio.Button>
                <Radio.Button value="rose">Rose</Radio.Button>
            </Radio.Group>
            <div id="container" />
        </>
    )
}
export default DynamicChart;