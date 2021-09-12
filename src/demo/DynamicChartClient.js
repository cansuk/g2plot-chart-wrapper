import React from 'react';
import DynamicChart from '../lib/components/DynamicChart';

const DynamicChartClient = (props) => {
    return (
        <div style={{ padding: 50 }}>
            <DynamicChart {...props} />
        </div>
    )
}

export default DynamicChartClient;
