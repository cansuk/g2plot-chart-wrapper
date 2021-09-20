import React, { useEffect, useRef, useState } from 'react';
import { Line, Bar } from '@antv/g2plot';
import { Button } from "antd";
import { is } from '@babel/types';
const ChartDemo = (props) => {
    //const { data } = props;
    const [state, setState] = useState({ selectedChart: "line" })
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    const element = <div id="dynamicChart" />;
    let line;
    let chart;
    // const line = new Line(element, {
    //     data,
    //     xField: 'year',
    //     yField: 'value',
    //     label: {},
    //     point: {
    //         size: 5,
    //         shape: 'diamond',
    //         style: {
    //             fill: 'red',
    //             stroke: '#5B8FF9',
    //             lineWidth: 2,
    //         },
    //     },
    //     tooltip: { showMarkers: false },
    //     state: {
    //         active: {
    //             style: {
    //                 shadowBlur: 4,
    //                 stroke: '#000',
    //                 fill: 'red',
    //             },
    //         },
    //     },
    //     interactions: [{ type: 'marker-active' }],
    // });
    useEffect(() => {
        // document.getElementById("container").append(element);
        // line = new Line("container", {})
        chart = new Line("container", {});
        if (document.getElementById("container")) {
            chart.update({
                data,
                xField: 'year',
                yField: 'value',
                label: {},
                point: {
                    size: 15,
                    shape: 'diamond',
                    style: {
                        fill: 'orange',
                        stroke: '#5B8FF9',
                        lineWidth: 2,
                    },
                },
                tooltip: { showMarkers: false },
                state: {
                    active: {
                        style: {
                            shadowBlur: 4,
                            stroke: '#000',
                            fill: 'red',
                        },
                    },
                },
                interactions: [{ type: 'marker-active' }],
            })
            chart.render();
        }
    }, []);
    const chartRefs = useRef({
        config: {
        }
    });
    // useEffect(() => {
    //     if (state.selectedChart === "line") {
    //         const line = new Line('container', {
    //             data,
    //             xField: 'year',
    //             yField: 'value',
    //             label: {},
    //             point: {
    //                 size: 5,
    //                 shape: 'diamond',
    //                 style: {
    //                     fill: 'white',
    //                     stroke: '#5B8FF9',
    //                     lineWidth: 2,
    //                 },
    //             },
    //             tooltip: { showMarkers: false },
    //             state: {
    //                 active: {
    //                     style: {
    //                         shadowBlur: 4,
    //                         stroke: '#000',
    //                         fill: 'red',
    //                     },
    //                 },
    //             },
    //             interactions: [{ type: 'marker-active' }],
    //         });
    //         line.update();
    //     } else if (state.selectedChart === "bar") {
    //         const bar = new Bar('container', {
    //             data,
    //             xField: 'value',
    //             yField: 'year',
    //             seriesField: 'year',
    //             legend: {
    //                 position: 'top-left',
    //             },
    //         });
    //         bar.update();
    //     }
    // }, [state.selectedChart]);
    const handleBar = () => {
        // setState({ ...state, selectedChart: "bar" })
        const bar = new Bar('container', {
            data,
            xField: 'value',
            yField: 'year',
            seriesField: 'year',
            legend: {
                position: 'top-left',
            },
        });
        bar.update();
    }
    const handleLine = () => {
        //setState({ ...state, selectedChart: "line" })
        const line = new Line('container', {
            data,
            xField: 'year',
            yField: 'value',
            label: {},
            point: {
                size: 5,
                shape: 'diamond',
                style: {
                    fill: 'white',
                    stroke: '#5B8FF9',
                    lineWidth: 2,
                },
            },
            tooltip: { showMarkers: false },
            state: {
                active: {
                    style: {
                        shadowBlur: 4,
                        stroke: '#000',
                        fill: 'red',
                    },
                },
            },
            interactions: [{ type: 'marker-active' }],
        });
        line.update();
    }
    const handleLineUpdate = () => {
        console.log(chart.type);
        chart.destroy();

        chart = new Bar("container", {});
        chart.update({
            data,
            xField: 'value',
            yField: 'year',
            seriesField: 'year',
            legend: {
                position: 'top-left',
            },
        });
        // chart.update({
        //     data,
        //     xField: 'year',
        //     yField: 'value',
        //     label: {},
        //     point: {
        //         size: 5,
        //         shape: 'diamond',
        //         style: {
        //             fill: 'white',
        //             stroke: '#5B8FF9',
        //             lineWidth: 2,
        //         },
        //     },
        //     tooltip: { showMarkers: false },
        //     state: {
        //         active: {
        //             style: {
        //                 shadowBlur: 4,
        //                 stroke: '#000',
        //                 fill: 'red',
        //             },
        //         },
        //     },
        //     interactions: [{ type: 'marker-active' }],
        // });
    }
    return (
        <>
            <Button onClick={handleBar} title="BAR"> BAR </Button>
            <Button onClick={handleLine} title="LINE">LINE </Button>
            <Button onClick={handleLineUpdate} title="UPDATE LINE">UPDATE LINE </Button>
            {/* <Button title="CHANGE" /> */}
            <div id="container" />
        </>
    )
}
export default ChartDemo;