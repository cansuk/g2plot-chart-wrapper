"use strict";

var ChartTypes = ["bar", "radial-bar", "line", "pie", "area", "column", "dual-axis", "bidirectional-bar-chart-horizontal", "bidirectional-bar-chart-vertical", "radar-line"];
var ChartAxisLineShapes = ["line", "dashedLine"];
var LabelPositionTypes = ["auto", "top", "bottom", "middle", "right", "left"];
var LegendPositionTypes = ["top", "bottom", "left", "right", "top-left", "top-right", "bottom-right", "bottom-left"];
var DataViewModes = [{
  name: "group",
  value: "Grup gösterimi"
}, {
  name: "stack",
  value: "Yığın gösterimi"
}, {
  name: "percent",
  value: "Yüzdelik gösterim"
}];
module.exports = {
  ChartTypes: ChartTypes,
  ChartAxisLineShapes: ChartAxisLineShapes,
  LabelPositionTypes: LabelPositionTypes,
  LegendPositionTypes: LegendPositionTypes,
  DataViewModes: DataViewModes
};