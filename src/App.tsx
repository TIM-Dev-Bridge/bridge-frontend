import React from 'react';
import logo from './logo.svg';
import NavigationBar from './components/NavigationBar/NavigationBar'
import './App.css';
import { NavigationContext } from './components/Router/Router';
// import CreateTourPopup from './views/Popup/CreateTourPopup';
// import PlayPage from './views/Play/Play';
// import PlayingPage from './views/Play/components/PlayState';
// // import PlayPage from './views/Play/Play';
// import BiddingControl from './views/Bidding/BiddingCotrol';
// import BiddingTable from './views/Bidding/BiddingPage';
// import BiddingPage from './views/Bidding/BiddingPage';
// import AdminPageContainer from './views/Admin/AdminPage';
// import DefaultPage from './views/DefaultPage/DefaultPage';
// import Winner from './views/Summary/Winner';
// import DefaultPlace from './views/Summary/DefaultPlace';
import Summary from './views/Summary/Summary';
import styled from 'styled-components';
import { SummaryRank } from './views/Bidding/UsePlaying';

function App() {
  const { navigationStack, updateStack } = React.useContext(NavigationContext)

  const mockRank: SummaryRank[] = [
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    },
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    },
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    },
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    },
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    },
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
    ,
    {
        pair_id: 4, 
        name1: "string", 
        name2: "string", 
        totalMP: 4, 
        rankPercent: 4
    }
]

  React.useEffect(()=> {
    // console.log(navigationStack[navigationStack.length - 1])
    // console.log("INIT LOCATION", window.location.pathname)
  })
  return (
    <div className="App" style={{height: "100vh"}}>
      {
        window.location.pathname === '/' || window.location.pathname === '/lobby' ?  <></> : <NavigationBar />
      }

      {/* <Summary /> */}
      {navigationStack[navigationStack.length - 1]}

      {/* <WaitingPage>
          <Summary summaryRank={mockRank} />
      </WaitingPage> */}


      {/* <DefaultPage leftSideContainer={<AdminPageContainer />} displayTourRoom={false} title='User Management' /> */}
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

const WaitingPage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    visibility: visible;
`



export default App;
