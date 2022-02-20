import React from "react";
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import "./Table.css";
import { Type } from "typescript";
import { forEach } from "lodash";
// import 'antd/dist/antd.css'

interface BoardScore {
  key: string;
  declarer?: "North" | "East" | "West" | "South";
  contract?: string;
  made?: number;
  nsScore?: number;
  ewScore?: number;
  nsMps?: number;
  ewMps?: number;
}

interface RoundScore {
  key: string;
  nsTeam?: string;
  ewTeam?: string;
  children?: BoardScore[];
}

export interface IRecapSheetProps {
  scoreData: RoundScore[][];
  currentRound?: number;
}

const RecapSheet: React.FC<IRecapSheetProps> = (props: IRecapSheetProps) => {
  const data = props.scoreData;

  data.forEach((roundScore, index) => {
    while (roundScore.length < 8)
      roundScore.push({
        key: index.toString() + roundScore.length.toString(),
      });
  });

  const [displayRound, setDisplayRound] = React.useState<number>(
    props.currentRound || 1
  );
  const [form] = Form.useForm();
  const [currentData, setCurrentData] = React.useState(data[displayRound - 1]);
  const [editingKey, setEditingKey] = React.useState("");
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<React.Key[]>([]);

  // const focusDiv = React.useRef();
  // React.useEffect(() => {
  //   if (focusDiv.current) focusDiv.current.focus();
  // }, [focusDiv]);

  const isEditing = (record: BoardScore) => record.key === editingKey;

  const edit = (record: Partial<BoardScore> & { key: React.Key }) => {
    form.setFieldsValue({
      nsScore: "",
      ewScore: "",
      nsMps: "",
      ewMps: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const changeRound = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayRound(parseInt(event.target.value));
    setCurrentData(data[parseInt(event.target.value) - 1]);
  };

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: BoardScore;
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
      const row = (await form.validateFields()) as BoardScore;
      let deepIndex = -1;
      const newData = [...currentData];
      const index = newData.findIndex((roundScore) => {
        roundScore.children &&
          (deepIndex = roundScore.children?.findIndex((boardScore) => {
            return key == boardScore.key;
          }));
        return (deepIndex as number) > -1;
      });
      if (index > -1) {
        const item = newData[index];
        const newItem = newData[index];
        newItem.children &&
          newItem.children.splice(deepIndex, 1, {
            ...newItem.children[deepIndex],
            ...row,
          });
        newData.splice(index, 1, {
          ...item,
          ...newItem,
        });
        data[displayRound - 1] = newData;
        setCurrentData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        data[displayRound - 1] = newData;
        setCurrentData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // console.log('ScoreData', ScoreData);

  const columns = [
    {
      title: "Table",
      dataIndex: "key",
      key: "key",
      width: "7.5%",
      editable: false,
      render: (key: string, record: BoardScore, index: number) => {
        const editable = isEditing(record);
        return record.hasOwnProperty("children") ? (
          <p
            style={{
              display: "inline-flex",
              width: "80%",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {index + 1}
          </p>
        ) : record.hasOwnProperty("contract") ? (
          editable ? (
            <span>
              <button
                onClick={() => save(record.key)}
                style={{ height: "3vh", width: "3vh" }}
              >
                <img
                  src={
                    require("./../../../assets/images/PlaySideTab/Submit.png")
                      .default
                  }
                  height="auto"
                  width="100%"
                  style={{ display: "inline-block" }}
                />
              </button>
              <button
                onClick={cancel}
                style={{ height: "3vh", width: "3vh" }}
              >
                <img
                  src={
                    require("./../../../assets/images/PlaySideTab/Cross.png")
                      .default
                  }
                  height="auto"
                  width="100%"
                  style={{ display: "inline-block" }}
                />
              </button>
              {/* <Typography.Link
                onClick={() => save(record.key)}
                style={{ marginRight: 8 }}
              >
                Save
              </Typography.Link> */}

              {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm> */}
            </span>
          ) : (
            <button
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{ height: "3vh", width: "3vh" }}
            >
              <img
                src={
                  require("./../../../assets/images/PlaySideTab/Edit.png")
                    .default
                }
                height="auto"
                width="100%"
                style={{ display: "inline-block" }}
              />
            </button>
          )
        ) : (
          <p
            className="pale"
            style={{
              display: "inline-flex",
              width: "80%",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {index + 1}
          </p>
        );
      },
      // onCell: (record: BoardScore, index: number | undefined) =>
      //   !record.hasOwnProperty("children") && record.hasOwnProperty("contract")
      //     ? ({ colSpan: 1 } as React.HTMLAttributes<HTMLElement>)
      //     : {},
    },
    {
      title: "N/S Team",
      dataIndex: "nsTeam",
      key: "nsTeam",
      width: "12.5%",
      editable: false,
      render: (key: string, record: BoardScore, index: number) =>
        record.hasOwnProperty("children") ? (
          key
        ) : record.hasOwnProperty("contract") ? (
          <text>
            Board {index + 1} /{" "}
            {currentData[parseInt(record.key.charAt(0))].children?.length}
          </text>
        ) : (
          {}
        ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? ({ colSpan: 2 } as React.HTMLAttributes<HTMLElement>)
          : {},
    },
    {
      title: "E/W Team",
      dataIndex: "ewTeam",
      key: "ewTeam",
      width: "12.5%",
      editable: false,
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>)
          : {},
    },
    {
      title: "Declarer",
      dataIndex: "declarer",
      key: "declarer",
      width: "10%",
      editable: false,
      render: (data: string, record: BoardScore, index: number) =>
        record.hasOwnProperty("children") ? (
          expandedRowKeys.includes(record.key) ? (
            <p className="pale">Collapse</p>
          ) : (
            <p className="pale">Expand</p>
          )
        ) : record.hasOwnProperty("contract") ? (
          <p>{data}</p>
        ) : (
          {}
        ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 7 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "Contract",
      dataIndex: "contract",
      key: "contract",
      width: "10%",
      editable: false,
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "Made",
      dataIndex: "made",
      key: "made",
      width: "7.5%",
      editable: false,
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "N/S Score",
      dataIndex: "nsScore",
      key: "nsScore",
      width: "10%",
      editable: true,
      // render: (data: string, record: BoardScore, index: number) => (
      //   <EditableScore data={data} />
      // ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "E/W Score",
      dataIndex: "ewScore",
      key: "ewScore",
      width: "10%",
      editable: true,
      // render: (data: string, record: BoardScore, index: number) => (
      //   <EditableScore data={data} />
      // ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "N/S MPs",
      dataIndex: "nsMps",
      key: "nsMps",
      width: "10%",
      editable: false,
      // render: (data: string, record: BoardScore, index: number) => (
      //   <EditableScore data={data} />
      // ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
    {
      title: "E/W MPs",
      dataIndex: "ewMps",
      key: "ewMps",
      width: "10%",
      editable: false,
      // render: (data: string, record: BoardScore, index: number) => (
      //   <EditableScore data={data} />
      // ),
      onCell: (record: BoardScore, index: number | undefined) =>
        record.hasOwnProperty("contract")
          ? {}
          : ({ colSpan: 0 } as React.HTMLAttributes<HTMLElement>),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: BoardScore) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // const rowSelection = {
  //   onChange: (selectedRowKeys : string[] | number[], selectedRows: number[]) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   onSelect: (record , selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };

  const onTableRowExpand = (collapsed: boolean, record: RoundScore) => {
    const keys = expandedRowKeys;
    if (collapsed) {
      if(record.hasOwnProperty("children")){
      keys.push(record.key); // I have set my record.id as row key. Check the documentation for more details.
      setExpandedRowKeys(keys);
      }
    } else {
      setExpandedRowKeys(keys.filter((key) => key != record.key));
    }
  };

  return (
    <div className="tableContainer" style={{ zIndex: 100 }}>
      <p className="title"> Recap Sheet </p>
      <Form form={form} component={false}>
        <Table
          className="recapSheet"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
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
          bordered
          expandable={{ expandRowByClick: true }}
          expandedRowKeys={expandedRowKeys}
          onExpand={onTableRowExpand}
        />
      </Form>
      <div className="footerWrapper">
        <select
          className="roundSelector"
          onChange={changeRound}
          value={displayRound}
        >
          {[...Array(data.length)].map((round, index) => (
            <option value={index + 1}>Round {index + 1}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// const EditableScore: React.FC<{ data: string }> = (props: { data: string }) => {
//   const [disabled, setDisabled] = React.useState(true);
//   const [image, setImage] = React.useState("Edit");

  // const focusDiv = React.useRef();
  // React.useEffect(() => {
  //   if (focusDiv.current) focusDiv.current.focus();
  // }, [focusDiv]);

//   function handleClick() {
//     setDisabled(!disabled);
//     image === "Edit" ? setImage("Submit") : setImage("Edit");
//     document.getElementById("aaa")?.focus();
//   }

//   return (
//     <span>
//       <img
//         src={
//           require(`./../../../assets/images/PlaySideTab/${image}.png`).default
//         }
//         height="auto"
//         width="15%"
//         style={{ display: "inline-block", cursor: "pointer" }}
//         onClick={handleClick}
//       />
//       <ScoreInput
//         // ref={(ip) => (this.myInp = ip)}
//         className="typing-container"
//         type="number"
//         defaultValue={props.data}
//         disabled={disabled}
//       />
//     </span>
//   );
// };

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

// const ScoreInput = styled.input`
//   font-weight: bold;
//   background-color: rgba(0, 0, 0, 0);
//   width: 70%;
//   padding-left: 1vw;

//   &:focus {
//     outline: none;
//     /* text-decoration: underline; */
//     border: 0;
//     border-bottom: 2px solid rgba(0, 0, 0, 0.6);
//   }
// `;

export default RecapSheet;
