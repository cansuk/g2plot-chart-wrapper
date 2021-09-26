import { Line, Bar, Pie, Area, Column, DualAxes, BidirectionalBar, Radar, RadialBar, Rose } from '@antv/g2plot';
export const ChartDataType = {
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


export const ChartTypes = [
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


export const ChartInstanceType = {
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

export const ChartAxisLineShapes = [
    "line",
    "dashedLine",
];

export const LabelPositionTypes = [
    "auto",
    "top",
    "bottom",
    "middle",
    "right",
    "left",
];
export const LegendPositionTypes = [
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "top-right",
    "bottom-right",
    "bottom-left"
];

export const DataViewModes = [
    { name: "group", value: "Grouped" },
    { name: "stack", value: "Stacked" },
    { name: "percent", value: "Percent" }
]