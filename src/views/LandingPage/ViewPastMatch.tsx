import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Table, Form, InputRef, Input } from "antd";
import { PrimaryButton } from "../../components/Button/Button";
import { FormInstance } from "antd/lib/form";
import { useAuthen } from "../../Authen";
import { useScore } from "../../Service/SocketService";
import { useProfile } from "../UserProfile/ProfileContext";
import printJS from "print-js";

interface BoardScore {
  key: string;
  players: string;
  position: "N/S" | "E/W";
  score: number;
  pair_id: number;
}

export interface IViewPastMatchProps {
  tourId: string;
  setViewingTour: Function;
  viewingState: string;
  setViewingState: Function;
}

const ViewPastMatch: React.FC<IViewPastMatchProps> = (
  props: IViewPastMatchProps
) => {
  const authenContext = useAuthen();
  const profile = useProfile();
  const score = useScore(authenContext.authen.username, props.tourId || "");

  const [data, setData] = React.useState<BoardScore[][]>([]);
  const [currentData, setCurrentData] = React.useState<BoardScore[]>([]);
  const [form] = Form.useForm();
  const [displayBoard, setDisplayBoard] = React.useState(1);

  React.useEffect(() => {
    if (props.tourId == "") return
    console.log("Fetching Finished Tournament Score");
      score.getScoreFinishedTour((tourScore) => {
        const fetchedData: BoardScore[][] = tourScore.map((boardScores) => {
          return boardScores.newScore.map((score) => {
            return {
              key:
                boardScores.board_num.toString().padStart(2, "0") +
                score.pair_id.toString().padStart(2, "0"),
              players: score.name1 + ", " + score.name2,
              position: score.direction % 2 == 0 ? "N/S" : "E/W",
              score: score.score,
              pair_id: score.pair_id,
            };
          });
        });
        setData(fetchedData);
        setCurrentData(fetchedData[0]);
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
    dataIndex: keyof BoardScore;
    record: BoardScore;
    handleSave: (record: BoardScore) => void;
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

  const changeBoard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayBoard(parseInt(event.target.value));
    setCurrentData(data[parseInt(event.target.value) - 1]);
  };

  type EditableTableProps = Parameters<typeof Table>[0];

  interface DataType {
    key: string;
    players: string;
    position: "N/S" | "E/W";
    score: number;
    pair_id: number;
  }

  interface EditableTableState {
    dataSource: DataType[];
    count: number;
  }

  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

  const refColumn = [
    {
      title: "Pair",
      dataIndex: "key",
      width: "15%",
      render: (_: any, __: any, index: number) => <b>{index + 1}</b>,
    },
    {
      title: "Players",
      dataIndex: "players",
      width: "30%",
      // render: (players:string) => players
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "15%",
      render: (position: number) => <b>{position}</b>,
    },
    {
      title: "Score",
      dataIndex: "score",
      width: "20%",
      editable: profile.profile.access === "td",
      // editable: true,
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
    const newData = [...data];
    newData.splice(displayBoard - 1, 1, newCurrentData);
    setCurrentData(newCurrentData);
    setData(newData);
    score.updateFinishedScore(
      props.tourId,
      displayBoard,
      row.pair_id,
      "boardScores",
      "score",
      row.score
    );
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

  const printScore = () => {
    console.log("data :>> ", data);
    let printData: any = [];
    data.forEach((rd, rIdx) => {
      rd.forEach((bd) => {
        printData.push({
          Round: rIdx,
          Pair: bd.pair_id,
          Players: bd.players,
          Position: bd.position,
          Score: bd.score,
        });
      });
    });

    printJS({
      printable: printData,
      documentTitle: `Scoreboard of ${props.tourId}`,
      properties: ["Round", "Pair", "Players", "Position", "Score"],
      type: "json",
    });
  };

  const printCSV = () => {
    let printData: any = []
    data.forEach((rd, rIdx) => {
      rd.forEach((bd) => {
        printData.push({
          Round: rIdx,
          Pair: bd.pair_id,
          Players: bd.players,
          Position: bd.position,
          Score: bd.score,
        });
      });
    });

    let output = printData.map((obj: any) => {
        return Object.keys(obj).sort().map(function(key) { 
          return obj[key];
        });
      });
    
    let csvContent = "data:text/csv;charset=utf-8,";
    output.splice(0, 0, ["Pair", "Player 1", "Player 2", "Position", "Round", "Score"]);
    output.forEach((outputArray: []) => {
        let row = outputArray.join(",");
        csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${props.tourId}_Score.csv`);
    document.body.appendChild(link);
    link.click();
  }

  return props.tourId && props.viewingState === "Score" ? (
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
        onClick={() => {setData([]); setCurrentData([]); props.setViewingTour(""); props.setViewingState(""); }}
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
            <PrimaryButton onClick={printScore}>Print Score</PrimaryButton>
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
        <FooterWrapper>
          <BoardSelector onChange={changeBoard} value={displayBoard}>
            {[...Array(data.length)].map((boards, index) => (
              <option value={index + 1}>Round {index + 1}</option>
            ))}
          </BoardSelector>
        </FooterWrapper>
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

const FooterWrapper = styled.div`
  height: 5vh;
  width: 100%;
  text-align: right;
  line-height: 5vh;
`;

const BoardSelector = styled.select`
  margin: 1vh;
  width: 7.5vw;
  height: 3vh;
  font-size: 1.75vh;
  font-weight: 500;
  min-width: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2.5px;
  cursor: pointer;
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

export default ViewPastMatch;
