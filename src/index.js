import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application.jsx';
import * as serviceWorker from './serviceWorker';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7-React Plugin
import Framework7React from 'framework7-react';

// Init F7-React Plugin
Framework7.use(Framework7React);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
