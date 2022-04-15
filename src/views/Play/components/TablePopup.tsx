import React from "react";
import styled from "styled-components";
import ScoreBoard, { IScoreBoardProps } from "./ScoreBoard";
import LeaderBoard, { ILeaderBoardProps } from "./LeaderBoard";
import Spectate, { ISpectateProps } from "./Spectate";
import TdChatSelect, { ITdChatSelectProps } from "./TdChatSelect";
import RecapSheet, { IRecapSheetProps } from "./RecapSheet";

interface ITablePopupProps {
    selectedPopup : string | null,
    setSelectedPopup: Function,
  }

const TablePopup: React.FC<ITablePopupProps> = (props: ITablePopupProps) => {

  const [scoreBoardData, setScoreBoardData] = React.useState<IScoreBoardProps>({
    scoreData: [
      [
        {
          key: "00",
          position: "ns",
          opponent: "Team B",
          contractor: "ew",
          nsScore: 250,
          ewScore: 0,
          mps: 8,
          totalMps: 8,
        },
        {
          key: "01",
          position: "ew",
          opponent: "Team C",
          contractor: "ns",
        },
        {
          key: "02",
          position: "ns",
          opponent: "Team D",
        },
      ],
      [
        {
          key: "10",
          position: "ew",
          opponent: "Team X",
          contractor: "ew",
          nsScore: 250,
          ewScore: 0,
          mps: 8,
          totalMps: 8,
        },
        {
          key: "11",
          position: "ew",
          opponent: "Team Y",
          contractor: "ns",
        },
        {
          key: "12",
          position: "ns",
          opponent: "Team Z",
        },
      ],
    ],
  });

  const [leaderBoardData, setLeaderBoardData] =
    React.useState<ILeaderBoardProps>({
      nsLeader: [
        {
          nsTeam: "Team A",
          nsMps: 28,
          nsPercentage: 100,
        },
        {
          nsTeam: "Team C",
          nsMps: 23,
          nsPercentage: 85,
        },
        {
          nsTeam: "Team E",
          nsMps: 21,
          nsPercentage: 80,
        },
      ],
      ewLeader: [
        {
          ewTeam: "Team B",
          ewMps: 22,
          ewPercentage: 100,
        },
        {
          ewTeam: "Team D",
          ewMps: 17,
          ewPercentage: 62,
        },
        {
          ewTeam: "Team F",
          ewMps: 15,
          ewPercentage: 55,
        },
        {
          ewTeam: "Team G",
          ewMps: 21,
          ewPercentage: 80,
        },
      ],
    });

  const [spectateData, setSpectateData] = React.useState<ISpectateProps>({
    spectateList: [
      {
        key: "0",
        nsTeam: "Team A",
        ewTeam: "Team B",
        status: "Ongoing",
      },
      {
        key: "1",
        nsTeam: "Team C",
        ewTeam: "Team D",
        status: "Finished",
      },
    ],
  });

  const [tablePlayersData, setTablePlatersData] =
    React.useState<ITdChatSelectProps>({
      playerList: [
        {
          key: "0",
          north: "Seele",
          south: "Rozaliya",
          east: "Bronya",
          west: "Liliya",
        },
        {
          key: "1",
          north: "Kiana",
          south: "Theresa",
          east: "Sirin",
          west: "Bianka",
        },
      ],
    });

  // const [recapData, setRecapData] = React.useState<IRecapSheetProps>({
  //   scoreData: [
  //     [
  //       {
  //         key: '00',
  //         nsTeam: "Team A",
  //         ewTeam: "Team B",
  //         children: [
  //           {
  //             key: '000',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '001',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '002',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //         ],
  //       },
  //       {
  //         key: '01',
  //         nsTeam: "Team C",
  //         ewTeam: "Team D",
  //         children: [
  //           {
  //             key: '010',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '011',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '012',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //         ],
  //       },
  //     ],
  //     [
  //       {
  //         key: '10',
  //         nsTeam: "Team E",
  //         ewTeam: "Team F",
  //         children: [
  //           {
  //             key: '101',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '102',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '103',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //         ],
  //       },
  //       {
  //         key: '11',
  //         nsTeam: "Team G",
  //         ewTeam: "Team H",
  //         children: [
  //           {
  //             key: '110',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '111',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //           {
  //             key: '112',
  //             declarer: "North",
  //             contract: "3H",
  //             made: 4,
  //             nsScore: 170,
  //             ewScore: 0,
  //             nsMps: 4,
  //             ewMps: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   ],
  // });

  const recordContractor = (
    round: number,
    index: number,
    position: "ns" | "ew"
  ) => {
    scoreBoardData.scoreData[round][index] = {
      ...scoreBoardData.scoreData[round][index],
      contractor: position,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  };

  const recordScore = (
    round: number,
    index: number,
    nsScore: number,
    ewScore: number,
    mps: number,
    totalMps: number
  ) => {
    scoreBoardData.scoreData[round][index] = {
      ...scoreBoardData.scoreData[round][index],
      nsScore: nsScore,
      ewScore: ewScore,
      mps: mps,
      totalMps: totalMps,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  };

  const recordTeamPosition = (
    round: number,
    index: number,
    position: "ns" | "ew",
    opponent: string
  ) => {
    scoreBoardData.scoreData[round][index] = {
      ...scoreBoardData.scoreData[round][index],
      key: index.toString(),
      position: position,
      opponent: opponent,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  };

  const updateNsLeaderBoard = (
    nsTeam: string,
    nsMps: number,
    nsPercentage: number
  ) => {
    const index = leaderBoardData.nsLeader.findIndex(
      (object) => object.nsTeam === nsTeam
    );
    leaderBoardData.nsLeader[index] = {
      ...leaderBoardData.nsLeader[index],
      nsMps: nsMps,
      nsPercentage: nsPercentage,
    };

    setLeaderBoardData({
      ...leaderBoardData,
      nsLeader: [...leaderBoardData.nsLeader],
    });
  };

  const updateEwLeaderBoard = (
    ewTeam: string,
    ewMps: number,
    ewPercentage: number
  ) => {
    const index = leaderBoardData.ewLeader.findIndex(
      (object) => object.ewTeam === ewTeam
    );
    leaderBoardData.ewLeader[index] = {
      ...leaderBoardData.ewLeader[index],
      ewMps: ewMps,
      ewPercentage: ewPercentage,
    };

    setLeaderBoardData({
      ...leaderBoardData,
      ewLeader: [...leaderBoardData.ewLeader],
    });
  };

  const popups = {
    null : {},
    RecapSheet: <RecapSheet />,
    ScoreBoard: <ScoreBoard {...scoreBoardData}/>,
    LeaderBoard: <LeaderBoard {...leaderBoardData}/>,
    Spectate: <Spectate {...spectateData}/>,
    Chat: <TdChatSelect {...tablePlayersData}/>,
}

  
  return ((!!props.selectedPopup) ?
      <PopupContainer>
        <BlackOverlay />
        <FloatingButton
          style={{ position: "absolute", left: "5px", top: "5px" ,cursor: "pointer", zIndex:101}}
          onClick= {() => props.setSelectedPopup(null)}
        >
          <IconButton
            src={require("./../../../assets/images/WhiteCross.svg").default}
            height="auto"
            width="100%"
          />
        </FloatingButton>

        {popups[props.selectedPopup as keyof typeof popups]}
        {/* <ScoreBoard {...scoreBoardData} /> */}
        {/* <LeaderBoard {...leaderBoardData} /> */}
        {/* <Spectate {...spectateData} /> */}
        {/* <TdChatSelect {...tablePlayersData} /> */}
        {/* <RecapSheet currentRound={2} /> */}
      </PopupContainer>
      : <></>
  );
};

const PopupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BlackOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
`;

const IconButton = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FloatingButton = styled.div`
  display: block;
  height: 5vmin;
  width: 5vmin;
  max-height: 50px;
  max-width: 50px;
  border-radius: 50%;
  background: #ed1c24;
  box-shadow: 4px 4px 22px -9px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default TablePopup;
