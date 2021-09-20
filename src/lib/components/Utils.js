



// UTILS INITIALLY -- TODO : DELETE THIS COMMENT
const randomColor = require('randomcolor');

const GetChartColors = (category, chartObj) => {
    return chartObj?.filter(x => x.Path === category)[0]?.color || randomColor();
};

const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();

const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();

const GetChartGeometry = (category, chartObj) => chartObj?.filter(x => x.Path === category)[0]?.geomType || "line";
const GetGeometryOptions = (chartObj, colNameGeom, isDashboard) => {
    let result = [];
    chartObj.forEach(obj => {
        if (isDashboard) {

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

        } else {
            result.push(Object.assign({}, {
                geometry: obj.geomType, color: obj.color, smooth: true, connectNulls: false
            }));
        }
    });
    return result;
};

const ColorAddUpdate = (obj, colName, color) => {
    if (!color) color = randomColor();
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


module.exports = {
    GetChartColors,
    GetSliderColor,
    GetAxisColor,
    GetChartGeometry,
    GetGeometryOptions,
    ColorAddUpdate,
    GeomAddUpdate,
    CalcAverageValue
}