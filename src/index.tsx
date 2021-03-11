import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { TaskProvider } from './app/common/context/TaskContext';
import './app/styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
