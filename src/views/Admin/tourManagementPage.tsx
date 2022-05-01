import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Switch from "../../components/Switch/Switch";
import TextField from "../../components/TextField/TextField";
import { motion } from "framer-motion";
import BackButton from "../../components/Button/BackButton";
import { TitleText } from "../../components/Text/Text";
import OnlineFriends from "../../components/OnlineFriends/OnlineFriends";
import Chat from "../../components/Chatbox/ChatBox";
import { Table, Tag, Button, Popconfirm, Space } from "antd";
import { FormInstance } from "antd/lib/form";
import './adminTable.css';
import { ChatChanelType, ChatUseCase } from "../../Chat/ChatUseCases";
// import 'antd/dist/antd.css';

const TourManagement = () => {
  interface User {
    key: string;
    username: string;
    displayname: string;
    status: string;
    type: string;
  }

  //   const [data, setData] = React.useState<User[]>([]);
  const [data, setData] = React.useState<User[]>([
    {
      key: "1",
      username: "Ice",
      displayname: "CryoHerz",
      status: "Active",
      type: "admin",
    },
    {
      key: "2",
      username: "Mark",
      displayname: "Blueberry",
      status: "Active",
      type: "td",
    },
    {
      key: "3",
      username: "Tae",
      displayname: "TaeTae01",
      status: "Ban",
      type: "user",
    },
  ]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
    },
    {
      title: "Display Name",
      dataIndex: "displayname",
      key: "displayname",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => <b>{status}</b>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "15%",
      render: (type: string) => {
        let color = "gray";
        if (type === "user") {
          color = "#5283ec";
        } else if (type === "td") {
          color = "#eea538";
        } else if (type === "admin") {
          color = "#54c450";
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (text: string, record: User) => (
        <Space size="middle">
          <a>Promote to TD</a>
          <a>Suspend</a>
          <a>Ban</a>
        </Space>
      ),
    },
  ];

  return (
    <CenterContainer>
      {/* <BackButton display={false} /> */}
      <GridContainer>
        <InnerContainer id="user-window">
          <div className="flex">
            <div className="self-start pt-4 pb-4 pl-8">
              <TitleText medium>User Management</TitleText>
            </div>
          </div>
          <SearchBar />
          {/* <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Status</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <TableItem
                img={"kae"}
                username={"Charles"}
                status={"Leshair"}
                usertype={"user"}
              />
            </tbody>
          </table> */}
            <Table 
                columns={columns}
                dataSource={data}
                className="userManage"
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 32,
                }}
                scroll={{ y: "60vh", scrollToFirstRowOnChange: true }}
                locale={{ emptyText: <span> No Data </span> }}
                // bordered 
            />
          <Stack></Stack>
        </InnerContainer>
        <RightSideBox>
          {/* <OnlineFriends display={false} tourName={''} /> */}
          <Chat display={false} sendMessageUseCase={new ChatUseCase(ChatChanelType.lobby).getSendMessageToLobbyUseCase('')} updateChatUseCase={new ChatUseCase(ChatChanelType.lobby).getUpdateMessageUseCase()} />
        </RightSideBox>
      </GridContainer>
    </CenterContainer>
  );
};

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <div
        style={{ display: "inlineFlex", height: "32px", verticalAlign: "middle", lineHeight:"32px"}}
      >
        Search
      </div>
      <TextField />
      {/* <Switch onCheck={(isCheck) => console.log(isCheck)} /> */}
    </SearchBarContainer>
  );
};

interface TableItemProps {
  img: string;
  username: string;
  status: string;
  usertype: string;
}

const TableItem = (props: TableItemProps) => {
  return (
    <tr>
      <td></td>
      <td>{props.username}</td>
      <td>{props.status}</td>
      <td>{props.usertype}</td>
      <td>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginLeft: "16px", marginRight: "16px" }}>Add TD</div>
          <div style={{ marginLeft: "16px", marginRight: "16px" }}>Suspend</div>
          <div style={{ marginLeft: "16px", marginRight: "16px" }}>Ban</div>
        </div>
      </td>
    </tr>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  box-sizing: border-box;
  padding-right: 10px;
  justify-content: center;
  align-content: center;
`;

const CenterContainer = styled.div`
  height: calc(100vh - 56px);
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
`;

const GridContainer = styled.div`
  display: grid;
  /* position: absolute; */
  /* top: 5px; */
  gap: 10px;
  grid-template-columns: 2fr 1fr;
  height: 95%;
  width: 95%;
  min-height: 720px;
  min-width: "800px";
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 15px;
  margin: 0 auto;
  background-color: white;
`;

const InnerContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-right: 0.5px solid #e6e6e6;
  padding-right: 1vw;
`;
const LobbyContainer = styled.div<{ hide: boolean }>`
  height: 100%;
  width: 100%;
  ${(props) =>
    props.hide &&
    css`
      transform: translateX(0px);
      --webkit-transform: translateX(0px);
      opacity: 1;
      transition: transform 0.3s, opacity 0.1s;
      --webkit-transition: transform 0.3s, opacity 0.1s;
    `}
  ${(props) =>
    !props.hide &&
    css`
      transform: translateX(-50px);
      --webkit-transform: translateX(-50px);
      opacity: 0;
      transition: transform 0.3s, opacity 0.1s;
      --webkit-transition: transform 0.3s, opacity 0.1s;
    `}
`;

const LobbyList = styled.div`
  /* grid-column: 1; */
  height: 100%;
  width: 100%;
`;

const JoinRoomContainer = styled(motion.div)<{ display: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding-right: 15px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px);
  --webkit-backdrop-filter: blur(24px);
  transform: translateY(${(props) => (props.display ? "50px" : "0px")});
  --webkit-transform: translateY(
    ${(props) => (props.display ? "50px" : "0px")}
  );
  transition: transform 0.2s;
  --webkit-transition: transform 0.2s;
`;

const JoinRoomContainerVariants = {
  show: { y: 0 },
  hide: { y: 48 },
};

const RightSideBox = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const Stack = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
`;

const LobbyVariants = {
  hide: { x: -50, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default TourManagement;
