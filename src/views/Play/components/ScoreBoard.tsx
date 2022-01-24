import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import "./Table.css";

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
      render: (key: number, record: RoundScore) => 
        record.hasOwnProperty("mps") ? (
          <span>{key + 1}</span>
        ) : (
          <span className="pale">{key + 1}</span>
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
    <div className="tableContainer" style={{ zIndex: 100 }}>
      <p className="title"> Scoreboard </p>
      <Table
        className="scoreBoard"
        dataSource={ScoreData}
        columns={columns}
        pagination={{ hideOnSinglePage: true, pageSize: 8 }}
        locale={{ emptyText: <span> No Data </span> }}
      />
    </div>
  );
};

// const Title = styled.p`
//   font-size: 5vh;
//   font-weight: bold;
//   color: white;
//   text-align: left;
//   width: 80%;
// `;

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   justify-content: center;
//   align-items: center;
// `;

export default ScoreBoard;
