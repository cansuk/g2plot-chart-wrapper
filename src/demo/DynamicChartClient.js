import React, { useEffect, useState } from 'react';
import DynamicChart from '../lib/components/DynamicChart';
import DataProcessor from '../lib/components/DataProcessor';

const DynamicChartClient = (props) => {
    const { data } = props;
    const [strKeys, setStrKeys] = useState([]);
    const [numericColumns, setNumericColumns] = useState([]);

    useEffect(() => {

        DataProcessor(data).then((result) => {
            const { strKeys, numericColumns } = result;
            console.log("data is processed.:");
            setStrKeys(strKeys);
            setNumericColumns(numericColumns);

            console.log({ strKeys, numericColumns, data });
        });

        return () => {

        }
    }, []);

    return (
        <div style={{ padding: 50 }}>
            {/* <DynamicChart strKeys={strKeys} numericColumns={numericColumns} data={data} /> */}
            {strKeys.length > 0 && numericColumns.length > 0 && <DynamicChart {...{ strKeys, numericColumns, data }} />}

        </div>
    )
}

export default DynamicChartClient;
