import DynamicChart from './src/components/DynamicChart';

import './src/index.css';

import ReactDOM from "react-dom";
import { StrictMode } from "react";

import App from "./src/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);

export { DynamicChart, Button };