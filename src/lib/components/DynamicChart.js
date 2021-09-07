import React, { useEffect, useRef } from 'react';
import { Bar } from '@antv/g2plot';


const DynamicChart = (props) => {
    let { data } = props;
    /** VARIABLES */
    let chartData = [];
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

    /** USE EFFECTS */
    useEffect(() => {
        console.log("useeffect...")
        const containerElement = document.getElementById("containerCansu");
        if (!containerElement) {
            let containerEl = document.createElement("div");
            containerEl.id = "containerCansu";
            document.getElementById("chartContainer").append(containerEl);

            initChart(data);

        }

        return () => {
            // cleanup
            console.log("cleanup...");
        }
    }, []);

    useEffect(() => {
        const bar = new Bar('containerCansu', {
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
            data: data,
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
        bar.render();

        return () => {
            //  cleanup
        }
    }, [document.getElementById("containerCansu")])

    /**FUNCTIONS */
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


    return (
        <div id="chartContainer">

        </div>
    )
}

export default DynamicChart
