import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Switch from "../../components/Switch/Switch";
import { motion } from "framer-motion";
import BackButton from "../../components/Button/BackButton";
import { TitleText } from "../../components/Text/Text";
import OnlineFriends from "../../components/OnlineFriends/OnlineFriends";
import Chat from "../../components/Chatbox/ChatBox";
import { Table, Tag, Space, Popconfirm } from "antd";
import { useAuthen } from "../../Authen";
import { useManage } from "../../Service/SocketService";
import { values } from "lodash";
import { PrimaryButton } from "../../components/Button/Button";
import "./adminTable.css";
// import 'antd/dist/antd.css';

const UserManagement: React.FC = () => {
  interface User {
    key: string;
    access: string;
    display_name: string;
    username: string;
    email: string;
  }

  const authContext = useAuthen();
  const { getUserList, promoteToTD, demoteFromTD, banUser, enableUser } =
    useManage(authContext.authen.username);

  const [data, setData] = React.useState<User[]>([]);
  const [filteredData, setFilteredData] = React.useState<User[]>(data);
  const [nameSearch, setNameSearch] = React.useState<string>("");

  React.useEffect(() => {
    // let userList: User[] = []
    // const fetchData = async () => {
    //   await getUserList((users) => {userList = users})
    // }

    // console.log("fetching Data");
    // fetchData().then(()=>{
    //   console.log(userList)
    //   setData(userList);
    //   setFilteredData(data)
    // })
    // .catch(console.error)

    getUserList((userList) => {
      setData(userList);
      setFilteredData(userList);
    });
  }, []);

  const tagColor: Record<string, string> = {
    user: "#5283ec",
    td: "#eea538",
    admin: "#54c450",
    ban: "#ff3b3b",
    suspend: "#ff7b00",
  };

  const handleSearch = (nameSearch: string) => {
    setFilteredData(data.filter((user) => user.username.includes(nameSearch)));
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      handleSearch(e.target.value);
    }
  };

  const handleChange = (e: any) => {
    setNameSearch(e.target.value);
  };

  const updateRole = (username:string, role:string) => {
    const index = data.findIndex((e) => e.username === username)
    data[index].access = role
    setFilteredData([...data].filter((user) => user.username.includes(nameSearch)))
  }

  const handlePromote = (username: string) => {
    promoteToTD(username);
    updateRole(username,'td')
  };

  const handleDemote = (username: string) => {
    demoteFromTD(username);
    updateRole(username,'user')
  };

  const handleBan = (username: string) => {
    banUser(username);
    updateRole(username,'ban')
  };

  const handleEnable = (username: string) => {
    enableUser(username);
    updateRole(username,'user')
  };
  // const getColumnSearchProps = (dataIndex: keyof User) =>({
  //   onFilter: (value:string, record:User) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  // })

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "15%",
      render: (status: string) => <b>{status}</b>,
      // ...getColumnSearchProps("username"),
      // onFilter: (value: string | number | boolean, record: User) =>
      //   record["username"]
      //     .toString()
      //     .toLowerCase()
      //     .includes(value.toString().toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Display Name",
      dataIndex: "display_name",
      key: "display_name",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "access",
      key: "access",
      width: "15%",
      render: (access: string) => {
        return (
          <Tag color={tagColor[access.toLowerCase()]} key={access}>
            {access.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (text: string, record: User) => {
        return (
          <Space size="middle">
            {record.access.toLowerCase() === "user" && (
              <Popconfirm
                title={`Promote ${record.username} to TD?`}
                onConfirm={() => handlePromote(record.username)}
              >
                <a>Promote to TD</a>
              </Popconfirm>
            )}
            {record.access.toLowerCase() === "td" && (
              <Popconfirm
                title={`Demote ${record.username} from TD?`}
                onConfirm={() => handleDemote(record.username)}
              >
                <a>Demote from TD</a>
              </Popconfirm>
            )}
            {/* {<a>Suspend</a>} */}
            {(record.access.toLowerCase() === "user" ||
              record.access.toLowerCase() === "td") && (
              <Popconfirm
                title={`Ban ${record.username}?`}
                onConfirm={() => handleBan(record.username)}
              >
                <a>
                  <b>Ban</b>
                </a>
              </Popconfirm>
            )}
            {record.access.toLowerCase() === "ban" && (
              <Popconfirm
                title={`Enable ${record.username}?`}
                onConfirm={() => handleEnable(record.username)}
              >
                <a>
                  <b>Enable this user</b>
                </a>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <CenterContainer>
      <div style={{ position: "absolute", top: "61px", left: "5px" }}>
        <BackButton display={false} />
      </div>
      <GridContainer>
        <InnerContainer id="user-window">
          <div style={{ display: "flex", paddingTop: "20px" }}>
            <div className="self-start pt-4 pb-4 pl-8">
              <TitleText medium>User Management</TitleText>
            </div>
          </div>
          <SearchBarContainer>
            <div
              style={{
                display: "inlineFlex",
                height: "32px",
                verticalAlign: "middle",
                lineHeight: "32px",
              }}
            >
              Search
            </div>
            <Input
              id="nameSearch"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              pattern="[A-Za-z0-9]"
              placeholder="Input Username"
            />
            <PrimaryButton onClick={() => handleSearch(nameSearch)}>
              Search
            </PrimaryButton>
            {/* <Switch onCheck={(isCheck) => console.log(isCheck)} /> */}
          </SearchBarContainer>
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
            dataSource={filteredData}
            className="userManage"
            pagination={{
              hideOnSinglePage: true,
              pageSize: 10,
            }}
            // scroll={{ y: "70vh", scrollToFirstRowOnChange: true }}
            // scroll = {{x:"1200px"}}
            locale={{ emptyText: <span> No Data </span> }}
            // bordered
          />
          {/* <Stack></Stack> */}
        </InnerContainer>
        <RightSideBox>
          {/* <OnlineFriends display={false} tourName={''} /> */}
          <Chat display={false} />
        </RightSideBox>
      </GridContainer>
    </CenterContainer>
  );
};

// interface TableItemProps {
//   img: string;
//   username: string;
//   status: string;
//   usertype: string;
// }

// const TableItem = (props: TableItemProps) => {
//   return (
//     <tr>
//       <td></td>
//       <td>{props.username}</td>
//       <td>{props.status}</td>
//       <td>{props.usertype}</td>
//       <td>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <div style={{ marginLeft: "16px", marginRight: "16px" }}>Add TD</div>
//           <div style={{ marginLeft: "16px", marginRight: "16px" }}>Suspend</div>
//           <div style={{ marginLeft: "16px", marginRight: "16px" }}>Ban</div>
//         </div>
//       </td>
//     </tr>
//   );
// };

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  box-sizing: border-box;
  padding-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-content: center;
`;

const CenterContainer = styled.div`
  width: 100vw;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
  min-height: calc(100% - 56px);
  overflow: scroll;
`;

const GridContainer = styled.div`
  display: grid;
  /* position: absolute; */
  /* top: 5px; */
  gap: 10px;
  grid-template-columns: 3fr 1fr;
  height: 840px;
  width: 95%;
  min-height: 80vh;
  min-width: "800px";
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 15px;
  margin: 2.5vh auto;
  background-color: white;
`;

const InnerContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-right: 0.5px solid #e6e6e6;
  padding-right: 1vw;
  /* height: 720px; */
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

const Input = styled.input`
  border-width: 2px;
  border-color: "rgba(243, 244, 246, 1)";
  min-height: 32px;
  border-radius: 16px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(243, 244, 246, 1);
  /* margin-top: 4px; */
  /* margin-bottom: 12px; */
`;

export default UserManagement;
