// eslint-disable-next-line import/no-extraneous-dependencies
import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

log.setLevel('info');

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>,
);
