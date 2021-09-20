import React, { useEffect, useRef } from 'react'
import { initialBarConfig } from './Constants';

const Chart = (props) => {
    const { data } = props;
    let chart;

    const chartRefs = useRef({ selectedChart: "line", config: { initialBarConfig } });

    useEffect(() => {
        if (document.getElementById("container")) {
            chart.update(chartRefs.current.config);
            chart.render();
        }
    }, []);

    // const ChartRenderer = () => {
    //     switch (chartRefs.current.selectedChart) {
    //         case "line":

    //             break;
    //         case "bar":

    //             break;
    //         default:
    //             break;
    //     }
    // }

    return (
        <div id="container" />
    )
}

export default Chart
