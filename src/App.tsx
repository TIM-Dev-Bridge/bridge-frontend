import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationContext } from './components/Router/Router';

function App() {
  const { navigationStack, updateStack } = React.useContext(NavigationContext)
  return (
    <div className="App">
      {navigationStack[navigationStack.length - 1]}
    </div>
  );
}

export default App;
