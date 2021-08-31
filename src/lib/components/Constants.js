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

const DataViewModes = [
    { name: "group", value: "Grup gösterimi" },
    { name: "stack", value: "Yığın gösterimi" },
    { name: "percent", value: "Yüzdelik gösterim" }
]


module.exports = {
    ChartTypes,
    ChartAxisLineShapes,
    LabelPositionTypes,
    LegendPositionTypes,
    DataViewModes
}