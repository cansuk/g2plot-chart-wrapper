import { useEffect, useState } from 'react';
import DynamicChart from './DynamicChart';
import DataProcessor from './DataProcessor';

const DynamicChartClient = (props) => {
    const { data } = props;
    const [strKeys, setStrKeys] = useState([]);
    const [numericColumns, setNumericColumns] = useState([]);

    useEffect(() => {

        DataProcessor(data).then((result) => {
            const { strKeys, numericColumns } = result;
            setStrKeys(strKeys);
            setNumericColumns(numericColumns);
        });

        return () => {

        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {strKeys.length > 0 && numericColumns.length > 0 && <DynamicChart {...{ strKeys, numericColumns, data }} style={{ height: '85vh', width: '95vw' }} />}
        </>
    )
}

export default DynamicChartClient;
