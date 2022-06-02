import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Table, Form, InputRef, Input } from "antd";
import { PrimaryButton } from "../../components/Button/Button";
import { FormInstance } from "antd/lib/form";
import { useAuthen } from "../../Authen";
import { useScore } from "../../Service/SocketService";
import { useProfile } from "../UserProfile/ProfileContext";
import printJS from "print-js";
import _ from "lodash";

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

export interface IViewRankingProps {
  tourId: string;
  setViewingTour: Function;
  viewingState: string;
  setViewingState: Function;
}

const ViewRanking: React.FC<IViewRankingProps> = (props: IViewRankingProps) => {
  const authenContext = useAuthen();
  const profile = useProfile();
  const score = useScore(authenContext.authen.username, props.tourId || "");

  const [currentData, setCurrentData] = React.useState<LeaderRow[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = React.useState("");

  React.useEffect(() => {
    if (props.tourId == "") return;
    console.log("Fetching Finished Tournament Ranking");
    score.getEndedLeaderboard((leaderBoard) => {
      const nsLeader: NSLeaderBoard[] = leaderBoard.nsRanking.map((nsRank) => {
        return {
          nsTeam: nsRank.players.toString(),
          nsMps: nsRank.totalMP,
          nsPercentage: nsRank.rankPercent,
        };
      });
      const ewLeader: EWLeaderBoard[] = leaderBoard.ewRanking.map((ewRank) => {
        return {
          ewTeam: ewRank.players.toString(),
          ewMps: ewRank.totalMP,
          ewPercentage: ewRank.rankPercent,
        };
      });
      const fetchedData = _.zipWith(
        nsLeader.sort((a, b) => b.nsPercentage - a.nsPercentage),
        ewLeader.sort((a, b) => b.ewPercentage - a.ewPercentage),
        (nsObject, ewObject) => {
          return { ...nsObject, ...ewObject };
        }
      );

      const fetchedDataSource: LeaderRow[] = fetchedData.map(
        (element, index) => {
          return { key: index.toString(), ...element };
        }
      );

      setCurrentData(fetchedDataSource);
    });
  }, [props.tourId]);

  interface EditableRowProps {
    index: number;
  }

  const EditableContext = React.createContext<FormInstance<any> | null>(null);

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof LeaderRow;
    record: LeaderRow;
    handleSave: (record: LeaderRow) => void;
  }

  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef<InputRef>(null);
    const form = React.useContext(EditableContext)!;

    React.useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();

        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  type EditableTableProps = Parameters<typeof Table>[0];

  interface DataType {
    key: string;
    nsTeam?: string;
    nsMps?: number;
    nsPercentage?: number;
    ewTeam?: string;
    ewMps?: number;
    ewPercentage?: number;
  }

  interface EditableTableState {
    dataSource: DataType[];
    count: number;
  }

  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

  const refColumn = [
    {
      title: "Position",
      dataIndex: "key",
      width: "10%",
      render: (_: any, __: any, index: number) => <b>{index + 1}</b>,
    },
    {
      title: "N/S Team",
      dataIndex: "nsTeam",
      width: "20%",
    },
    {
      title: "MPs",
      dataIndex: "nsMps",
      width: "10%",
      //   render: (nsMps: number) => <b>{position}</b>,
    },
    {
      title: "Percentage",
      dataIndex: "nsPercentage",
      width: "15%",
      editable: profile.profile.access === "td",
      render: (percentage: number) => `${percentage}%`,
    },
    {
      title: "E/W Team",
      dataIndex: "ewTeam",
      width: "20%",
    },
    {
      title: "MPs",
      dataIndex: "ewMps",
      width: "10%",
      //   render: (nsMps: number) => <b>{position}</b>,
    },
    {
      title: "Percentage",
      dataIndex: "ewPercentage",
      width: "15%",
      editable: profile.profile.access === "td",
      render: (percentage: number) => `${percentage}%`,
    },
  ];

  const handleSave = (row: DataType) => {
    const newCurrentData = [...currentData];
    const index = newCurrentData.findIndex((item) => row.key === item.key);
    const item = newCurrentData[index];
    newCurrentData.splice(index, 1, {
      ...item,
      ...row,
    });
    setCurrentData(newCurrentData);
    // WIP
    // score.updateFinishedScore(props.tourId, displayBoard, row.pair_id, "boardScores", "score", row.score)
  };

  const columns = refColumn.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  const printRanking = () => {
    let printData: any = [];
    currentData.forEach((ranking, rIdx) => {
      printData.push({
        position: rIdx,
        "N/S team": ranking.nsTeam,
        "N/S MPs": ranking.nsMps,
        "N/S percentage": ranking.nsPercentage,
        "E/W team": ranking.ewTeam,
        "E/W MPs": ranking.ewMps,
        "E/W percentage": ranking.ewPercentage,
      });
    });

    printJS({
      printable: printData,
      documentTitle: `Leaderboard of ${props.tourId}`,
      properties: [
        "position",
        "N/S team",
        "N/S MPs",
        "N/S percentage",
        "E/W team",
        "E/W MPs",
        "E/W percentage",
      ],
      type: "json",
    });
  };

  const printCSV = () => {
    let printData: any = [];
    currentData.forEach((ranking, rIdx) => {
      printData.push({
        position: rIdx,
        "N/S team": ranking.nsTeam,
        "N/S MPs": ranking.nsMps,
        "N/S percentage": ranking.nsPercentage,
        "E/W team": ranking.ewTeam,
        "E/W MPs": ranking.ewMps,
        "E/W percentage": ranking.ewPercentage,
      });
    });

    let output = printData.map((obj: any) => {
      return Object.keys(obj)
        .sort()
        .map(function (key) {
          return obj[key];
        });
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    output.splice(0, 0, [
      "ewMPs",
      "ewPercentage",
      "ewPlayer 1",
      "ewPlayer 2",
      "nsMPs",
      "nsPercentage",
      "nsPlayer 1",
      "nsPlayer 2",
      "Position",
    ]);
    output.forEach((outputArray: []) => {
      let row = outputArray.join(",");
      csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${props.tourId}_Ranking.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return props.tourId && props.viewingState === "Ranking" ? (
    <PopupContainer id="admintable">
      <BlackOverlay />
      <FloatingButton
        style={{
          position: "absolute",
          left: "5px",
          top: "5px",
          cursor: "pointer",
          zIndex: 101,
        }}
        onClick={async () => {
          setCurrentData([]);
          props.setViewingTour("");
          props.setViewingState("");
        }}
      >
        <IconButton
          src={require("./../../assets/images/WhiteCross.svg").default}
          height="auto"
          width="100%"
        />
      </FloatingButton>

      <TableContainer>
        <TitleContainer>
          <Title> {props.tourId} </Title>
          <PrintContainer>
            <PrimaryButton onClick={printRanking}>Print Ranking</PrimaryButton>
          </PrintContainer>
          <PrintContainer>
            <PrimaryButton onClick={printCSV}>Save as CSV</PrimaryButton>
          </PrintContainer>
        </TitleContainer>
        <Form form={form} component={false}>
          <Table
            className="finishedTourScore"
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            dataSource={currentData}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              hideOnSinglePage: true,
              pageSize: 32,
            }}
            scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
            locale={{ emptyText: <span> No Data </span> }}
            bordered
          />
        </Form>
      </TableContainer>
    </PopupContainer>
  ) : (
    <></>
  );
};

const PopupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 56px);
`;

const TableContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10vh 5vw;
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

const Title = styled.p`
  font-size: 5vh;
  font-weight: bold;
  color: white;
  text-align: left;
  width: 70%;
`;

const PrintContainer = styled.div`
  width: 15%;
  height: 50%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default ViewRanking;
