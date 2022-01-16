import React from "react";
import styled from "styled-components";
import ScoreBoard, { IScoreBoardProps } from "./ScoreBoard";

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

  function recordContractor(index: number, position: 'ns'|'ew') {

    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      contractor: position,
    }

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData]
    })
  }

  function recordScore(index: number, nsScore: number, ewScore: number, mps: number, totalMps: number) {

    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      nsScore: nsScore,
      ewScore: ewScore,
      mps: mps,
      totalMps: totalMps,
    }

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData]
    })
  }

  function recordTeamPosition(index: number, position: 'ns'|'ew', opponent: string){

    scoreBoardData.scoreData[index] = {
      ...scoreBoardData.scoreData[index],
      key: index,
      position: position,
      opponent: opponent,
    }

    setScoreBoardData({
      scoreData: [...scoreBoardData.scoreData]
    })

  }

  return (
    <Container>
      <ScoreBoard {...scoreBoardData} />

      
      <button style={{ backgroundColor: "lightgrey", width: "10%" }} onClick={() => recordScore(1,0,100,3,11)}>
        setScore
      </button>
      <button style={{ backgroundColor: "lightgrey", width: "10%" }} onClick={() => recordContractor(2,'ew')}>
        assign Contrator
      </button>
      <button style={{ backgroundColor: "lightgrey", width: "10%" }} onClick={() => recordTeamPosition(3,'ns','Team E')}>
        setTeam
      </button>
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

export default PlayArea;
