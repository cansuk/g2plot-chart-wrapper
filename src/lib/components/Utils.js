const randomColor = require('randomcolor');

export const GetChartColors = (category, chartObj) => {
    return chartObj?.filter(x => x["column"] === category)[0]?.color || randomColor();
};

export const GetSliderColor = (chartSettings) => chartSettings?.sliderColor || randomColor();

export const GetAxisColor = (axisLineColorData, axis) => axisLineColorData[axis] || randomColor();

export const GetChartGeometry = (category, chartObj) => chartObj?.filter(x => x["column"] === category)[0]?.geomType || "line";
export const GetGeometryOptions = (chartObj, colNameGeom) => {
    let result = [];
    chartObj?.forEach(obj => {


        let geomObj = colNameGeom?.filter(x => x["colName"] === obj);

        let geom = "line";
        if (geomObj && geomObj?.length === 1 && geomObj[0]) {
            geom = geomObj[0]["geometry"] || "line";
        }

        result.push(
            Object.assign({}, {
                geometry: geom || GetChartGeometry(obj, chartObj),
                color: obj.color, smooth: true, connectNulls: false
            })
        );


    });
    return result;
};

export const ColorAddUpdate = (obj, colName, color) => {
    if (!color) { color = randomColor(); }
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

export const GeomAddUpdate = (obj, colName, geom) => {
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


export const CalcAverageValue = (data, type, text) => {
    const items = data.filter(x => x[type] === text);
    return items.length ? (items.reduce((a, b) => a + b.value, 0) / items.length).toFixed(1) : '-'
};
