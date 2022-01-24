import React from "react";
import styled from "styled-components";
import ScoreBoard, { IScoreBoardProps } from "./ScoreBoard";
import LeaderBoard, { ILeaderBoardProps } from "./LeaderBoard";

const PlayArea: React.FC = () => {
  const [scoreBoardData, setScoreBoardData] = React.useState<IScoreBoardProps>({
    scoreData: [
      {
        key: 0,
        position: "ns",
        opponent: "Team B",
        contractor: "ew",
        nsScore: 250,
        ewScore: 0,
        mps: 8,
        totalMps: 8,
      },
      {
        key: 1,
        position: "ew",
        opponent: "Team C",
        contractor: "ns",
      },
      {
        key: 2,
        position: "ns",
        opponent: "Team D",
      },
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
      ],
    });

  function recordContractor(index: number, position: "ns" | "ew") {
    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      contractor: position,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  }

  function recordScore(
    index: number,
    nsScore: number,
    ewScore: number,
    mps: number,
    totalMps: number
  ) {
    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      nsScore: nsScore,
      ewScore: ewScore,
      mps: mps,
      totalMps: totalMps,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  }

  function recordTeamPosition(
    index: number,
    position: "ns" | "ew",
    opponent: string
  ) {
    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      key: index,
      position: position,
      opponent: opponent,
    };

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData],
    });
  }

  return (
    <Container>
      <BlackOverlay />
      <FloatingButton style={{ position: "absolute", left: "5px", top: "5px" }}>
        <IconButton
          src={require("./../../../assets/images/WhiteCross.svg").default}
          height="auto"
          width="100%"
        />
      </FloatingButton>

      {/* <ScoreBoard {...scoreBoardData} /> */}
      <LeaderBoard {...leaderBoardData} />

      {/* <div style={{display:"flex", flexDirection: "column", rowGap:"20px"}}>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={() => recordScore(1, 0, 100, 3, 11)}
        >
          setScore
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={() => recordContractor(2, "ew")}
        >
          assign Contrator
        </button>
        <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={() => recordTeamPosition(3, "ns", "Team E")}
        >
          setTeam
        </button>
      </div> */}
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #0c6b3f;
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

export default PlayArea;
