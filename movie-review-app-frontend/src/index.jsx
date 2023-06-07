import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './components/context/ThemeProvider'


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
<React.StrictMode>
    <BrowserRouter>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
</React.StrictMode>
);