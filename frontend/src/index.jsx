import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import './index.css'

const rootElement = document.querySelector('#root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);