import { render } from 'react-dom';
import React from 'react';

import './style/index.less'

import App from './components/App.js';


render(<App />, document.body.appendChild(document.createElement('div')))
// render(<Model />, document.body.appendChild(document.createElement('div')))
