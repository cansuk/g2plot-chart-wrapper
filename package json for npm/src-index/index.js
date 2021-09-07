import DynamicChart from './lib/components/DynamicChart';
import './index.css';

import ReactDOM from "react-dom";
import { StrictMode } from "react";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);

export default { DynamicChart };

