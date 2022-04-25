import React from "react";
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import "./Table.css";
import _ from "lodash";
import { useAuthen } from "../../../Authen";
import { usePlayState } from "../../PlayingContext/PlayingContext";
import { useScore } from "../../../Service/SocketService";
// import 'antd/dist/antd.css'

interface LeaderRow {
  key: string;
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

  const authenContext = useAuthen();
  const playContext = usePlayState();
  const score = useScore(authenContext.authen.username ,playContext.playState.tourName);

  
  const [form] = Form.useForm();
  const [currentData, setCurrentData] = React.useState<LeaderRow[]>([]);
  const [editingKey, setEditingKey] = React.useState("");

  React.useEffect(() => {
    console.log('fetching Leaderboard Data')

    score.getLeaderboard((leaderBoard)=>{
      const nsLeader: NSLeaderBoard[] = leaderBoard.nsRanking.map((nsRank)=> {
        return {
          nsTeam: nsRank.pair_id.toString(),
          nsMps: nsRank.totalMP,
          nsPercentage: nsRank.rankPercent,
        }
      })
      const ewLeader: EWLeaderBoard[] = leaderBoard.ewRanking.map((ewRank)=> {
        return {
          ewTeam: ewRank.pair_id.toString(),
          ewMps: ewRank.totalMP,
          ewPercentage: ewRank.rankPercent,
        }
      })
      const fetchedData = _.zipWith(
        nsLeader.sort((a,b)=> b.nsPercentage-a.nsPercentage),
        ewLeader.sort((a,b)=> b.ewPercentage-a.ewPercentage),
        (nsObject, ewObject) => {
          return { ...nsObject, ...ewObject}
        }
      )

      const fetchedDataSource: LeaderRow[] = fetchedData.map((element,index) => {
        return { key: index.toString(), ...element };
      })

      while (fetchedDataSource.length % 8 != 0)
      fetchedDataSource.push({
          key: fetchedDataSource.length.toString(),
      });

      setCurrentData(fetchedDataSource)
    })

  },[])

  const rawDataSource = _.zipWith(
    props.nsLeader,
    props.ewLeader,
    (nsObject, ewObject) => {
      return { ...nsObject, ...ewObject };
    }
  );

  const dataSource: LeaderRow[] = rawDataSource.map((element, index) => {
    return { key: index.toString(), ...element };
  });


  while (dataSource.length % 8 != 0)
    dataSource.push({
      key: dataSource.length.toString(),
    });


  const isEditing = (record: LeaderRow) => record.key === editingKey;

  const edit = (record: Partial<LeaderRow> & { key: React.Key }) => {
    form.setFieldsValue({
      nsMps: "",
      ewMps: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: LeaderRow;
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

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as LeaderRow;

      const newData = [...currentData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setCurrentData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setCurrentData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Position",
      dataIndex: "key",
      key: "key",
      width: "10%",
      editable: false,
      render: (_: any, record: LeaderRow, index: number) =>
        record.hasOwnProperty("nsMps") || record.hasOwnProperty("ewMps") ? (
          <span>{index + 1}</span>
        ) : (
          <span className="pale">{index + 1}</span>
        ),
    },
    {
      title: "N/S Team",
      dataIndex: "nsTeam",
      key: "nsTeam",
      width: "20%",
      editable: false,
    },
    {
      title: "MPs",
      dataIndex: "nsMps",
      key: "nsMps",
      width: "10%",
      editable: true,
    },
    {
      title: "Percentage",
      dataIndex: "nsPercentage",
      key: "nsPercentage",
      width: "15%",
      editable: false,
      render: (percent: number) => percent !== undefined ? percent + "%" : {},
    },
    {
      title: "E/W Team",
      dataIndex: "ewTeam",
      key: "ewTeam",
      width: "20%",
      editable: false,
    },
    {
      title: "MPs",
      dataIndex: "ewMps",
      key: "ewMps",
      width: "10%",
      editable: true,
    },
    {
      title: "Percentage",
      dataIndex: "ewPercentage",
      key: "ewPercentage",
      width: "15%",
      editable: false,
      render: (percent: number) => percent !== undefined ? percent + "%" : {},
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: LeaderRow) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="tableContainer" style={{ zIndex: 100 }}>
      <p className="title"> LeaderBoard </p>
      <Form form={form} component={false}>
        <Table
          className="leaderBoard"
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
            pageSize: 20,
            onChange: cancel,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
          scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
          locale={{ emptyText: <span> No Data </span> }}
        />
      </Form>
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
