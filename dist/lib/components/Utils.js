"use strict";

var randomColor = require('randomcolor');

var GetChartColors = function GetChartColors(category, chartObj) {
  var _chartObj$filter$;

  return (chartObj === null || chartObj === void 0 ? void 0 : (_chartObj$filter$ = chartObj.filter(function (x) {
    return x.Path === category;
  })[0]) === null || _chartObj$filter$ === void 0 ? void 0 : _chartObj$filter$.color) || randomColor();
};

var GetSliderColor = function GetSliderColor(chartSettings) {
  return (chartSettings === null || chartSettings === void 0 ? void 0 : chartSettings.sliderColor) || randomColor();
};

var GetAxisColor = function GetAxisColor(axisLineColorData, axis) {
  return axisLineColorData[axis] || randomColor();
};

var GetChartGeometry = function GetChartGeometry(category, chartObj) {
  var _chartObj$filter$2;

  return (chartObj === null || chartObj === void 0 ? void 0 : (_chartObj$filter$2 = chartObj.filter(function (x) {
    return x.Path === category;
  })[0]) === null || _chartObj$filter$2 === void 0 ? void 0 : _chartObj$filter$2.geomType) || "line";
};

var GetGeometryOptions = function GetGeometryOptions(chartObj, colNameGeom, isDashboard) {
  var result = [];
  chartObj.forEach(function (obj) {
    if (isDashboard) {
      var geomObj = colNameGeom === null || colNameGeom === void 0 ? void 0 : colNameGeom.filter(function (x) {
        return x["colName"] === obj.Path;
      });
      var geom = "line";

      if (geomObj && (geomObj === null || geomObj === void 0 ? void 0 : geomObj.length) === 1 && geomObj[0]) {
        geom = geomObj[0]["geometry"] || "line";
      }

      result.push(Object.assign({}, {
        geometry: geom || GetChartGeometry(obj.Path, chartObj),
        color: obj.color,
        smooth: true,
        connectNulls: false
      }));
    } else {
      result.push(Object.assign({}, {
        geometry: obj.geomType,
        color: obj.color,
        smooth: true,
        connectNulls: false
      }));
    }
  });
  return result;
};

var ColorAddUpdate = function ColorAddUpdate(obj, colName, color) {
  if (!color) color = randomColor();

  if (!obj.colNameColor) {
    obj.colNameColor = [];
  }

  var settingsIndex = obj.colNameColor.findIndex(function (x) {
    return x["colName"] === colName;
  });

  if (settingsIndex == -1) {
    // add
    obj.colNameColor.push({
      colName: colName,
      color: color
    });
  } else {
    // update
    obj.colNameColor[settingsIndex]["color"] = color;
  }

  return obj;
};

var GeomAddUpdate = function GeomAddUpdate(obj, colName, geom) {
  if (!obj.colNameGeom) {
    obj.colNameGeom = [];
  }

  var settingsIndex = obj.colNameGeom.findIndex(function (x) {
    return x["colName"] === colName;
  });

  if (settingsIndex == -1) {
    // add
    obj.colNameGeom.push({
      colName: colName,
      geometry: geom
    });
  } else {
    // update
    obj.colNameGeom[settingsIndex]["geometry"] = geom;
  }

  return obj;
};

var CalcAverageValue = function CalcAverageValue(data, type, text) {
  var items = data.filter(function (x) {
    return x[type] === text;
  });
  return items.length ? (items.reduce(function (a, b) {
    return a + b.value;
  }, 0) / items.length).toFixed(1) : '-';
};

module.exports = {
  GetChartColors: GetChartColors,
  GetSliderColor: GetSliderColor,
  GetAxisColor: GetAxisColor,
  GetChartGeometry: GetChartGeometry,
  GetGeometryOptions: GetGeometryOptions,
  ColorAddUpdate: ColorAddUpdate,
  GeomAddUpdate: GeomAddUpdate,
  CalcAverageValue: CalcAverageValue
};