import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import your worker 
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax
// Create an instance of your worker
const workerInstance = worker()
// Attach an event listener to receive calculations from your worker
workerInstance.addEventListener('message', (message) => {
  if (message === "vib") {
    window.navigator.vibrate(200);
  }
  console.log('New Message: ', message.data)
})
// Run your calculations
workerInstance.iterate(10);
ReactDOM.render(<App />, document.getElementById('root'));