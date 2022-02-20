import React from "react";
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import "./Table.css";
import _ from "lodash";
import { relative } from "path";

interface TablePlayers {
  key: string;
  north?: string;
  east?: string;
  south?: string;
  west?: string;
}

export interface ITdChatSelectProps {
  playerList: TablePlayers[];
}

const TdChatSelect: React.FC<ITdChatSelectProps> = (
  props: ITdChatSelectProps
) => {
  const chatData: TablePlayers[] = [...props.playerList];

  while (chatData.length % 8 != 0) {
    chatData.push({
      key: chatData.length.toString(),
    });
  }

  const chatIcon =
    require("./../../../assets/images/PlaySideTab/Chat.png").default;

  const [form] = Form.useForm();
  const [currentData, setCurrentData] = React.useState(chatData);
  const [editingKey, setEditingKey] = React.useState("");

  const isEditing = (record: TablePlayers) => record.key === editingKey;

  const edit = (record: Partial<TablePlayers> & { key: React.Key }) => {
    form.setFieldsValue({
      nsTeam: "",
      ewTeam: "",
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
    record: TablePlayers;
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
      const row = (await form.validateFields()) as TablePlayers;

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

  function chatSpan(text: string) {
    return (
      <span
        style={{
          display: "inline-block",
          width: "100%",
        }}
      >
        <img
          onClick={() => {
            console.log("text", text);
          }}
          src={chatIcon}
          height="auto"
          width="10%"
          style={{
            cursor: "pointer",
            display: "inline-block",
            width: "20%",
            paddingLeft: "1vw",
          }}
        />
        <text style={{ display: "inline-block", width: "80%" }}>{text}</text>
      </span>
    );
  }

  const columns = [
    {
      title: "Table",
      dataIndex: "key",
      key: "key",
      width: "20%",
      editable: false,

      render: (key: string, record: TablePlayers, index: number) =>
        record.hasOwnProperty("north") ? (
          chatSpan((index + 1).toString())
        ) : (
          <span
            className="pale"
            style={{
              cursor: "pointer",
              display: "inline-block",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "20%",
                paddingLeft: "1vw",
              }}
            />
            <text style={{ display: "inline-block", width: "80%" }}>
              {index + 1}
            </text>
          </span>
        ),
    },
    {
      title: "North",
      dataIndex: "north",
      key: "north",
      width: "20%",
      editable: false,
      render: (key: string, record: TablePlayers) =>
        record.hasOwnProperty("north") ? chatSpan(key) : {},
    },
    {
      title: "East",
      dataIndex: "east",
      key: "east",
      width: "20%",
      editable: false,
      render: (key: string, record: TablePlayers) =>
        record.hasOwnProperty("east") ? chatSpan(key) : {},
    },
    {
      title: "South",
      dataIndex: "south",
      key: "south",
      width: "20%",
      editable: false,
      render: (key: string, record: TablePlayers) =>
        record.hasOwnProperty("south") ? chatSpan(key) : {},
    },
    {
      title: "West",
      dataIndex: "west",
      key: "west",
      width: "20%",
      editable: false,
      render: (key: string, record: TablePlayers) =>
        record.hasOwnProperty("west") ? chatSpan(key) : {},
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TablePlayers) => ({
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
      <p className="title"> Chat </p>
      <Form form={form} component={false}>
        <Table
          className="tdChatTable"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={currentData}
          columns={mergedColumns}
          pagination={{
            hideOnSinglePage: true,
            pageSize: 20,
            onChange: cancel,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
          scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
          locale={{ emptyText: <span> No Data </span> }}
          bordered
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

export default TdChatSelect;
