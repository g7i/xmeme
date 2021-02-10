import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/Hero';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {MemesProvider} from "./contexts/MemeContext";

ReactDOM.render(
    <React.StrictMode>
        <MemesProvider>
            <App/>
        </MemesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
