// const manipulateData = () => {

// }

const manipulateData = (dataType) => { // TODO CANSU CONVERT THIS FUNCTION TO PROMISE

    state.dataWith1Numeric = []; state.dataWith1String = [];
    let cellVal = 0;

    switch (dataType) {
        case "with1Numeric":

            chartRefs.current.selectedData = chartData;

            let strVal = "";
            chartRefs.current.selectedData.forEach((row, rowIndex) => {

                if (chartRefs.current.chartSettings.dataLimitCount !== 0 && rowIndex >= chartRefs.current.chartSettings.dataLimitCount)
                    return;

                strVal = chartData[rowIndex] && chartData[rowIndex][chartRefs.current.strKey?.replace('_', '.')]?.DisplayText;

                cellVal = 0;
                if (chartRefs.current.numericColumnsFiltered && chartRefs.current.numericColumnsFiltered?.length > 0) {
                    chartRefs.current.numericColumnsFiltered.forEach((col, colIndex) => {
                        if (!col.PrimaryKey) {
                            cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);
                            if (chartData[rowIndex][col]?.Value || cellVal) {
                                var found = state.dataWith1Numeric.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                    found[0]["value"] += cellVal;
                                    found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                } else {
                                    try {
                                        state.dataWith1Numeric.push({
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
                            cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);
                            if (chartData[rowIndex][col]?.Value || cellVal) {
                                var found = state.dataWith1Numeric.filter(x => x["stringColForNumeric"] === strVal && x["category"] === col.Path);
                                if (chartRefs.current.chartSettings.isAggregate && found?.length > 0) {
                                    found[0]["value"] += cellVal;
                                    found[0]["value"] = parseFloat(found[0]["value"].toFixed(2));
                                } else {
                                    state.dataWith1Numeric.push({
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

            break;
        case "with1String":
            chartRefs.current.selectedData = null;
            setState({ ...state, numericColumnNames: [] });
            chartRefs.current.numericColumnsFormat = {};

            chartRefs.current.selectedData = chartData;

            // Filling numericColumnsfiltered if dashboard :
            if (state.isDashboard) {
                if (settings?.valField && settings?.valField.length > 0) {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns.filter((col) => settings?.valField?.includes(col.Path));
                } else {
                    chartRefs.current.numericColumnsFiltered = chartRefs.current.numericColumns;
                }

                state.numericColumnNames = chartRefs.current.numericColumnsFiltered?.map(col => col.Path.replace('.', '_'))

            } else {
                state.numericColumnNames = chartRefs.current.numericColumns.map(col => {
                    if (!state.numericColumnNames.includes(col.Path.replace('.', '_'))) {
                        return col.Path.replace('.', '_');
                    }
                })

            }
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
                        strCellVal = chartData[rowIndex][key.replace('_', '.')]?.DisplayText;
                        foundItem = state.dataWith1String.filter(x => x[key] === strCellVal);
                        cellVal = parseInt(chartData[rowIndex][col.Path]?.Value);

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
                    state.dataWith1String?.push(obj);
                }
            });
            break;
    }

}