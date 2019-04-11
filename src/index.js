import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';

const rootNode = document.getElementById('root');
if (rootNode) {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    rootNode,
  );
}
