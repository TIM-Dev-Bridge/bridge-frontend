import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavigationBar from './components/NavigationBar/NavigationBar'
import LandingPage from './views/LandingPage/LandingPage'

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    {/* <App /> */}
    <LandingPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
