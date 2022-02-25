import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { PrimarySqButton } from "../../components/Button/Button";
import { navigate, useNavigator } from "../../components/Router/Router";
import { device } from "../../Device";
import { api } from "../../Service/ApiService";
import BiddingPage from "../Bidding/BiddingPage";
import { ConnectTable, useTable } from "../TourRoom/UseTable";
import { useProfile } from "../UserProfile/ProfileContext";
import PlayArea from "./components/PlayArea";
import PlaySideTab, { IPlaySideTabProps } from "./components/PlaySideTab";
import PlayingPage from "./components/PlayState";

interface PlayPageProps extends HTMLAttributes<HTMLDivElement> {
  tableId: string
  tableDetail?: ConnectTable | undefined
  ref?:  React.RefObject<HTMLDivElement>
}

const PlayPage = (props: PlayPageProps) => {
  const table = useTable()

  React.useEffect(()=> {
    window.getComputedStyle(document.body)
  }, [])

  React.useEffect(()=> {
      if (props.tableDetail != null || props.tableDetail != undefined) {
        console.log("CONNECT TO",  props.tableId, props.tableDetail)
        table.connect(props.tableId, props.tableDetail)
      }
  }, [props.tableDetail])

  const [sideTabInfo, setSideTabInfo] =
    React.useState<IPlaySideTabProps>({
      round: 1,
      permission: "td",
      boardsPerRound: 8,
      boardsPlayed: 1,
      boardType: {
        boardNo: 1,
        dealer: "North",
        vulnerable: 1,
      },
      auction: {
        declarer: "North",
        contract: "3_NT",
      },
      tricks: {
        nsTricks: 0,
        ewTricks: 2,
      },
      setSelectedPopup: setSelectedPopup,
    });

  

  function changeBoardType() {
    setSideTabInfo({
      ...sideTabInfo,
      boardType: {
        boardNo: 2,
        dealer: "East",
        vulnerable: 2,
      },
    });
  }

  function changeContract() {
    setSideTabInfo({
      ...sideTabInfo,
      auction: {
        declarer: "East",
        contract: "4_H",
      },
    });
  }

  function changeTricks() {
    setSideTabInfo({
      ...sideTabInfo,
      tricks: {
        ewTricks: 1,
        nsTricks: 2,
      },
    });
  }

  function changePermission() {
    setSideTabInfo({
      ...sideTabInfo,
      permission: 'spectator'
    });
  }

  function changeRound() {
    setSideTabInfo({
      ...sideTabInfo,
      round: 2
    });
  }

  return (
    <Container ref={props.ref}>
      <PlaySideTab {...sideTabInfo} />
      {/* <PlayArea /> */}
      <PlayingPage tableDetail={props.tableDetail}/>
      {/* <div className="lg:flex flex-col w-1/6 h-screen overflow-hidden justify-around">
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={changeBoardType}
        >
          BoardType
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={changeContract}
        >
          Contract
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={changeTricks}
        >
          Tricks
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={changePermission}
        >
          Permission
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={changeRound}
        >
          Round
        </button>
      </div> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`

export default PlayPage;
