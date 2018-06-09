import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import skygear from 'skygear';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Set your own endPoint and apiKey here, overwrite these values
let endPoint = 'https://demo934.skygeario.com/';
let apiKey = 'c3f090ac5a954c2b82b63a1623acfee9';

skygear.config({
    endPoint,
    apiKey
  }).then(value => console.info(value))
    .catch(error => console.error(error));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
