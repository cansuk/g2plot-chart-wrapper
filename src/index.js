import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./App";
import 'antd/dist/antd.css';
import ChartDemo from "./lib/components/ChartDemo";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
