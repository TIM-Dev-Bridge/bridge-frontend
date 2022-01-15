import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import "./ScoreBoardTable.css";

interface RoundScore {
  key: number;
  position?: "ns" | "ew";
  opponent?: string;
  contractor?: "ns" | "ew";
  nsScore?: number;
  ewScore?: number;
  mps?: number;
  totalMps?: number;
}

export interface IScoreBoardProps {
  scoreData: RoundScore[];
}

const ScoreBoard: React.FC<IScoreBoardProps> = (props: IScoreBoardProps) => {
  const ScoreData: RoundScore[] = props.scoreData;

  while (ScoreData.length % 8 != 0)
    ScoreData.push({
      key: ScoreData.length,
    });

  const columns = [
    {
      title: "Round",
      dataIndex: "key",
      key: "key",
      render: (key: string, record: RoundScore) =>
        record.hasOwnProperty("mps") ? (
          <span>{key + 1}</span>
        ) : (
          <span className="pale">{record.key + 1}</span>
        ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: string, record: RoundScore) =>
          record.hasOwnProperty("mps") ? position?.toUpperCase().split("").join("/"): <span className="pale"> {position?.toUpperCase().split("").join("/")} </span>
    },
    {
      title: "Opponent",
      dataIndex: "opponent",
      key: "opponent",
      render: (opponent: string, record: RoundScore) =>
        record.hasOwnProperty("mps") ? opponent : <span className="pale"> {opponent} </span>
    },
    {
      title: "Contractor",
      dataIndex: "contractor",
      key: "contractor",
      render: (contractor: string, record: RoundScore) =>
      record.hasOwnProperty("mps") ? contractor?.toUpperCase().split("").join("/") : <span className="pale"> {contractor?.toUpperCase().split("").join("/")} </span>,
    },
    {
      title: "N/S Score",
      dataIndex: "nsScore",
      key: "nsScore",
    },
    {
      title: "E/W Score",
      dataIndex: "ewScore",
      key: "ewScore",
    },
    {
      title: "MPs",
      dataIndex: "mps",
      key: "mps",
    },
    {
      title: "Total MPs",
      dataIndex: "totalMps",
      key: "totalMps",
    },
  ];

  return (
    <Container style={{ zIndex: 100 }}>
      <BlackOverlay style={{ zIndex: -1 }} />
      <FloatingButton style={{ position: "absolute", left: "5px", top: "5px" }}>
        <IconButton
          src={require("./../../../assets/images/WhiteCross.svg").default}
          height="auto"
          width="100%"
        />
      </FloatingButton>
      <Title> Scoreboard </Title>
      <Table
        dataSource={ScoreData}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 8 }}
        locale={{ emptyText: <span> No Data </span> }}
      />
    </Container>
  );
};

const Title = styled.p`
  font-size: 5vh;
  font-weight: bold;
  color: white;
  text-align: left;
  width: 80%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
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

export default ScoreBoard;
