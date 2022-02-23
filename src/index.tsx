import React from 'react';
import ReactDOM from 'react-dom';
import { AppFrame } from 'ui/frames/AppFrame';
import { AppRoot } from 'ui/root/AppRoot';
//import { StyleProvider } from 'ui/styles';
import './index.css';
// import App from './App';
//import { SettingsStorage } from './model';

// const appProps = {
//   settingsStorage: new SettingsStorage()
// };

ReactDOM.render(
  <React.StrictMode>
    <AppRoot>
      <AppFrame />
    </AppRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

