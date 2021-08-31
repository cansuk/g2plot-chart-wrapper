import DynamicChart from './lib/components/DynamicChart';
import React from 'react';
import ReactDOM from 'react-dom';
import data from './tmp/data';

export { DynamicChart };

ReactDOM.render(
    <React.StrictMode>
        <DynamicChart {...data} />
    </React.StrictMode>,
    document.getElementById('root')
);
