import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavigationBar from './components/NavigationBar/NavigationBar'
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/Login/Login';
import { AuthenProvider } from './Authen';
import { NavigationView } from './components/Router/Router';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <AuthenProvider>
    <NavigationView>
      <App />
      </NavigationView>
    </AuthenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function NavigationContext(NavigationContext: any): { navigationStack: any; updateStack: any; } {
  throw new Error('Function not implemented.');
}

