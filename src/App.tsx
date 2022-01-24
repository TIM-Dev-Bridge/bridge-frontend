import React from 'react';
import logo from './logo.svg';
import NavigationBar from './components/NavigationBar/NavigationBar'
import './App.css';
import { NavigationContext } from './components/Router/Router';
import CreateTourPopup from './views/Popup/CreateTourPopup';
import PlayPage from './views/Play/Play';
import PlayingPage from './views/Play/components/PlayState';
// import PlayPage from './views/Play/Play';

function App() {
  const { navigationStack, updateStack } = React.useContext(NavigationContext)
  React.useEffect(()=> {
    // console.log(navigationStack[navigationStack.length - 1])
    // console.log("INIT LOCATION", window.location.pathname)
  })
  return (
    <div className="App" style={{height: "100vh"}}>
      {
        window.location.pathname === '/' || window.location.pathname === '/lobby' ?  <></> : <NavigationBar />
      }
      {navigationStack[navigationStack.length - 1]}
      {/* <CreateTourPopup isVisible={false} onDismiss={function (): void {
        throw new Error('Function not implemented.');
      } } /> */}

      {/* <PlayPage /> */}
    </div>

    
    // <div className="App" style={{height: "100vh"}}>
    //   {
    //     window.location.pathname === '/' || window.location.pathname === '/lobby' ?  <></> : <NavigationBar />
    //   }
    //   {navigationStack[navigationStack.length - 1]}
    //   {/* <CreateTourPopup isVisible={false} onDismiss={function (): void {
    //     throw new Error('Function not implemented.');
    //   } } /> */}
    // </div>
  );
}

export default App;
