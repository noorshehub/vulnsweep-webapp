import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function reportWebVitals() {
  console.log('Metrics logging');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optionally include web vitals or other performance monitoring
reportWebVitals();