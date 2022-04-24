import React from "react";
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import "./Table.css";
import { Type } from "typescript";
import { useGame } from "./GameContext";
import { useScore } from "../../../Service/SocketService"
import { useAuthen } from "../../../Authen";
import { usePlayState } from "../../PlayingContext/PlayingContext";
// import "antd/dist/antd.css";

interface TableScore {
  key: string;
  position?: "ns" | "ew";
  opponent?: string[];
  contractor?: "ns" | "ew";
  nsScore?: number;
  ewScore?: number;
  mps?: number;
  totalMps?: number;
}

export interface IScoreBoardProps {
  scoreData: TableScore[][];
  currentRound?: number;
}

const ScoreBoard: React.FC = () => {

  
  const authenContext = useAuthen();
  const playContext = usePlayState();
  const score = useScore(authenContext.authen.username ,playContext.playState.tourName)

  // const data = props.scoreData;
  
  // data.forEach((roundScore, index) => {
  //   while (roundScore.length < 8)
  //     roundScore.push({
  //       key: index.toString() + roundScore.length.toString(),
  //     });
  // });

  const [fetchedData, setFetchedData] = React.useState<TableScore[][]>([])
  // const [displayRound, setDisplayRound] = React.useState(
  //   props.currentRound || 1
  // );
  const [displayRound, setDisplayRound] = React.useState(
    playContext.playState.currentRound || 1
  );
  const [form] = Form.useForm();
  // const [currentData, setCurrentData] = React.useState(
  //   data[displayRound - 1]
  // );
  const [currentData, setCurrentData] = React.useState<TableScore[]>([]);
  const [editingKey, setEditingKey] = React.useState("");


  React.useEffect(() => {
    console.log('fetching Scoreboard Data')

    score.getScoreboard((scoreboard)=>{
      // console.log("scoreboard", scoreboard)
      const fetched: TableScore[][] = scoreboard.map((roundObjects) => {
        const fetching: TableScore[] = roundObjects.tables.map((tableScore)=>{
          let position = (tableScore.directions.find((seat)=> seat.id == authenContext.authen.username)?.direction as number)
          return {
            key: tableScore.table_id,
            position: position % 2 == 0 ? "ns" : "ew",
            opponent: tableScore.directions.filter((direction)=>{
              return (direction.direction != position && direction.direction != (position + 2)%4)
            }).map((seat)=> seat.id),
            contractor: tableScore.declarer % 2 == 0 ? "ns" : "ew",
            nsScore: tableScore.NSScore,
            ewScore: tableScore.EWScore,
            mps: tableScore.MP,
            totalMps: tableScore.totalMP
          }
        })
  
        // while (fetching.length < 8) {
        //   fetching.push({key: roundObjects.round.toString() + roundObjects.tables.length.toString()})
        // } 
        
        
        return fetching
        })

      setFetchedData(fetched)
      setCurrentData(fetched[playContext.playState.currentRound])
      setDisplayRound(playContext.playState.currentRound)

    })
  }, []);



  const isEditing = (record: TableScore) => record.key === editingKey;

  const edit = (record: Partial<TableScore> & { key: React.Key }) => {
    form.setFieldsValue({
      nsScore: "",
      ewScore: "",
      mps: "",
      totalMps: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const changeRound = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayRound(parseInt(event.target.value));
    // setCurrentData(data[parseInt(event.target.value) - 1]);
    setCurrentData(fetchedData[parseInt(event.target.value) - 1]);
    
  };

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: TableScore;
    index: number;
    children: React.ReactNode;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  // const save = async (key: React.Key) => {
  //   try {
  //     const row = (await form.validateFields()) as TableScore;

  //     const newData = [...currentData];
  //     const index = newData.findIndex((item) => key === item.key);
  //     if (index > -1) {
  //       const item = newData[index];
  //       newData.splice(index, 1, {
  //         ...item,
  //         ...row,
  //       });
  //       data[displayRound - 1] = newData;
  //       setCurrentData(newData);
  //       setEditingKey("");
  //     } else {
  //       newData.push(row);
  //       data[displayRound - 1] = newData;
  //       setCurrentData(newData);
  //       setEditingKey("");
  //     }
  //   } catch (errInfo) {
  //     console.log("Validate Failed:", errInfo);
  //   }
  // };

  const columns = [
    {
      title: "Board",
      dataIndex: "key",
      key: "key",
      width: "10%",
      editable: false,
      render: (_: any, record: TableScore, index: number) =>
        record.hasOwnProperty("mps") ? (
          <span>{index + 1}</span>
        ) : (
          <span className="pale">{index + 1}</span>
        ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: "10%",
      editable: false,
      render: (position: string, record: TableScore) =>
        record.hasOwnProperty("mps") ? (
          position?.toUpperCase().split("").join("/")
        ) : (
          <span className="pale">
            {" "}
            {position?.toUpperCase().split("").join("/")}{" "}
          </span>
        ),
    },
    {
      title: "Opponent",
      dataIndex: "opponent",
      key: "opponent",
      width: "25%",
      editable: false,
      render: (opponent: string[], record: TableScore) =>
        record.hasOwnProperty("mps") ? (
          opponent?.join(', ')
        ) : (
          <span className="pale"> {opponent?.join(', ')} </span>
        ),
    },
    {
      title: "Contractor",
      dataIndex: "contractor",
      key: "contractor",
      width: "15%",
      editable: false,
      render: (contractor: string, record: TableScore) =>
        record.hasOwnProperty("mps") ? (
          contractor?.toUpperCase().split("").join("/")
        ) : (
          <span className="pale">
            {" "}
            {contractor?.toUpperCase().split("").join("/")}{" "}
          </span>
        ),
    },
    {
      title: "N/S Score",
      dataIndex: "nsScore",
      key: "nsScore",
      width: "10%",
      editable: true,
    },
    {
      title: "E/W Score",
      dataIndex: "ewScore",
      key: "ewScore",
      width: "10%",
      editable: true,
    },
    {
      title: "MPs",
      dataIndex: "mps",
      key: "mps",
      width: "10%",
      editable: true,
    },
    {
      title: "Total MPs",
      dataIndex: "totalMps",
      key: "totalMps",
      width: "10%",
      editable: true,
    },
    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   render: (_: any, record: TableScore) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.key)}
    //           style={{ marginRight: 8 }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link
    //         disabled={editingKey !== ""}
    //         onClick={() => edit(record)}
    //       >
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableScore) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // const recordScore = (
  //   round: number,
  //   index: number,
  //   nsScore: number,
  //   ewScore: number,
  //   mps: number,
  //   totalMps: number
  // ) => {
  //   const newData = [...currentData];
  //   newData[index] = {
  //     ...data[round - 1][index],
  //     nsScore: nsScore,
  //     ewScore: ewScore,
  //     mps: mps,
  //     totalMps: totalMps,
  //   };

  //   data[displayRound - 1] = newData;
  //   setCurrentData(newData);
  // };

  // const ScoreData: TableScore[][] = [...props.scoreData];

  // ScoreData.forEach((roundScore) => {
  //   while (roundScore.length < 8)
  //     roundScore.push({
  //       key: roundScore.length,
  //     });
  // });

  return (
    <div className="tableContainer" style={{ zIndex: 100 }}>
      <p className="title"> Scoreboard </p>
      <Form form={form} component={false}>
        <Table
          className="scoreBoard"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={currentData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            hideOnSinglePage: true,
            pageSize: 32,
            onChange: cancel,
          }}
          scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
          locale={{ emptyText: <span> No Data </span> }}
        />
      </Form>
      <div className="footerWrapper">
        {/* <button
          style={{ backgroundColor: "lightgrey", width: "100%" }}
          onClick={() => recordScore(1, 1, 0, 100, 3, 11)}
        >
          setScore
        </button> */}

        <select
          className="roundSelector"
          onChange={changeRound}
          value={displayRound}
        >
          {[...Array(fetchedData.length)].map((round, index) => (
            <option value={index + 1}>Round {index + 1}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScoreBoard;
