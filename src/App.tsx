import React from 'react';
import logo from './logo.svg';
import NavigationBar from './components/NavigationBar/NavigationBar'
import './App.css';
import { NavigationContext } from './components/Router/Router';
import CreateTourPopup from './views/Popup/CreateTourPopup';

function App() {
  const { navigationStack, updateStack } = React.useContext(NavigationContext)
  React.useEffect(()=> {
    console.log(navigationStack[navigationStack.length - 1])
  })
  return (
    <div className="App" style={{height: "100vh"}}>
      <NavigationBar />
      {/* <CreateTourPopup /> */}
      {navigationStack[navigationStack.length - 1]}
    </div>
  );
}

export default App;
