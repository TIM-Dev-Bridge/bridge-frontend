import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import "./Table.css";
import _ from 'lodash';

interface LeaderRow {
  key: number;
  nsTeam?: string;
  nsMps?: number;
  nsPercentage?: number;
  ewTeam?: string;
  ewMps?: number;
  ewPercentage?: number;
}

interface NSLeaderBoard {
  nsTeam: string;
  nsMps: number;
  nsPercentage: number;
}

interface EWLeaderBoard {
  ewTeam: string;
  ewMps: number;
  ewPercentage: number;
}

export interface ILeaderBoardProps {
  nsLeader: NSLeaderBoard[];
  ewLeader: EWLeaderBoard[];
}

const LeaderBoard: React.FC<ILeaderBoardProps> = (props: ILeaderBoardProps) => {

  const rawDataSource = _.zipWith(props.nsLeader,props.ewLeader, (nsObject,ewObject) => {
    return {...nsObject,...ewObject}
  });

  const dataSource: LeaderRow[] = rawDataSource.map((element,index)=>{
    return {key: index, ...element}
  })

  const dataAmount = dataSource.length;

  const columns = [
    {
      title: "Position",
      dataIndex: "key",
      key: "key",
      render: (key: number, record: LeaderRow, index: number) => {
        if (index < dataAmount) return  <span>{key + 1}</span>
        return <span className="pale">{key + 1}</span>
      }
    },
    {
      title: "N/S Team",
      dataIndex: "nsTeam",
      key: "nsTeam",
    },
    {
      title: "MPs",
      dataIndex: "nsMps",
      key: "nsMps",
    },
    {
      title: "Percentage",
      dataIndex: "nsPercentage",
      key: "nsPercentage",
      render: (percent:number) => percent && percent + '%'
    },
    {
      title: "E/W Team",
      dataIndex: "ewTeam",
      key: "ewTeam",
    },
    {
      title: "MPs",
      dataIndex: "ewMps",
      key: "ewMps",
    },
    {
      title: "Percentage",
      dataIndex: "ewPercentage",
      key: "ewPercentage",
      render: (percent:number) => percent && percent + '%'
    },
  ];

  while (dataSource.length % 8 != 0)
    dataSource.push({
      key: dataSource.length,
    });

  return (
    <div className="tableContainer" style={{ zIndex: 100 }}>
      <p className="title"> LeaderBoard </p>
      <Table
        className="leaderBoard"
        dataSource={dataSource}
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

export default LeaderBoard;
