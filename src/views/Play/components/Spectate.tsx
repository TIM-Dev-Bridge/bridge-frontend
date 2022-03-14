import React from "react";
import styled from "styled-components";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import "./Table.css";
import _ from "lodash";

interface SpectateRow {
  key: string;
  nsTeam?: string;
  ewTeam?: string;
  status?: "Ongoing" | "Finished";
}

export interface ISpectateProps {
  spectateList: SpectateRow[];
}

const Spectate: React.FC<ISpectateProps> = (props: ISpectateProps) => {
  const spectateData: SpectateRow[] = [...props.spectateList];

  while (spectateData.length % 8 != 0) {
    spectateData.push({
      key: spectateData.length.toString(),
    });
  }

  const [form] = Form.useForm();
  const [currentData, setCurrentData] = React.useState(spectateData);
  const [editingKey, setEditingKey] = React.useState("");

  const isEditing = (record: SpectateRow) => record.key === editingKey;

  const edit = (record: Partial<SpectateRow> & { key: React.Key }) => {
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
    record: SpectateRow;
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
      const row = (await form.validateFields()) as SpectateRow;

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
      title: "Table",
      dataIndex: "key",
      key: "key",
      editable: false,
      render: (_: any, record: SpectateRow, index: number) =>
        record.hasOwnProperty("status") ? (
          <span>{index + 1}</span>
        ) : (
          <span className="pale">{index + 1}</span>
        ),
    },
    {
      title: "N/S Team",
      dataIndex: "nsTeam",
      key: "nsTeam",
      editable: false,
    },
    {
      title: "E/W Team",
      dataIndex: "ewTeam",
      key: "ewTeam",
      editable: false,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      editable: false,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "spec",
      editable: false,
      render: (_: any, record: SpectateRow, index: number) => {
        return record.hasOwnProperty("status") ? (
          record.status === "Ongoing" ? (
            <button style={{ fontWeight: "inherit" }}>
              <span>
                <img
                  src={
                    require("./../../../assets/images/PlaySideTab/Spectate.png")
                      .default
                  }
                  height="auto"
                  width="10%"
                  style={{ display: "inline-block" }}
                />
                <text> Spectate</text>
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                console.log("first");
              }}
              disabled
              className="pale"
              style={{ cursor: "default", fontWeight: "inherit" }}
            >
              <span>
                <img
                  src={
                    require("./../../../assets/images/PlaySideTab/Spectate.png")
                      .default
                  }
                  height="auto"
                  width="10%"
                  style={{ display: "inline-block" }}
                />
                <text> Spectate</text>
              </span>
            </button>
          )
        ) : (
          {}
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: SpectateRow) => ({
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
      <p className="title"> Spectate </p>
      <Form form={form} component={false}>
        <Table
          className="spectate"
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

export default Spectate;
