import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import Switch from "../../components/Switch/Switch";
import { motion } from "framer-motion";
import BackButton from "../../components/Button/BackButton";
import { TitleText } from "../../components/Text/Text";
import { Table, Tag, Space, Popconfirm } from "antd";
import { useAuthen } from "../../Authen";
import { useHistory, useManage } from "../../Service/SocketService";
import { PrimaryButton } from "../../components/Button/Button";
import { useProfile } from "../UserProfile/ProfileContext";
import ViewPastMatch from "./ViewPastMatch";
import ViewRanking from "./ViewRanking";
// import "./adminTable.css";
// import 'antd/dist/antd.css';

const MatchHistoryPage: React.FC = () => {
  interface Tour {
    host: string;
    title: string;
    type: string;
    players: string;
    mode: string;
    status: string;
  }

  const profile = useProfile();
  const authen = useAuthen();
  const { getFinishedTourList } = useHistory();

  const [data, setData] = React.useState<Tour[]>([]);
  const [filteredData, setFilteredData] = React.useState<Tour[]>(data);
  const [searchMode, setSearchMode] = React.useState<string>("Host");
  const [nameSearch, setNameSearch] = React.useState<string>("");
  const [viewingTour, setViewingTour] = React.useState("");
  const [viewingState, setViewingState] = React.useState("");

  React.useEffect(() => {
    getFinishedTourList((tourList) => {
      setData(tourList);
      setFilteredData(tourList);
    });
  }, []);

  const tagColor: Record<string, string> = {
    pairs: "#5283ec",
    team: "#eea538",
    // admin: "#54c450",
    // ban: "#ff3b3b",
    // suspend: "#ff7b00",
  };

  const handleSearch = (nameSearch: string) => {
    setFilteredData(
      data.filter((tour) =>
        searchMode === "Host"
          ? tour.host.includes(nameSearch)
          : tour.title.includes(nameSearch)
      )
    );
  };

  const handleKeyPress = (e: any) => {
    if (e.key == "Enter") {
      handleSearch(e.target.value);
    }
  };

  const handleChange = (e: any) => {
    setNameSearch(e.target.value);
  };

  const handleSwitch = (isCheck: boolean) => {
    setNameSearch("");
    setFilteredData(data);
    isCheck ? setSearchMode("Tourname") : setSearchMode("Host");
  };

  const handleViewScore = (tourId: string) => {
    setViewingTour(tourId);
    setViewingState("Score");
  };

  const handleViewRanking = (tourId: string) => {
    setViewingTour(tourId);
    setViewingState("Ranking");
  };

  //   const updateRole = (username:string, role:string) => {
  //     const index = data.findIndex((e) => e.username === username)
  //     data[index].access = role
  //     setFilteredData([...data].filter((user) => user.username.includes(nameSearch)))
  //   }

  //   const handlePromote = (username: string) => {
  //     promoteToTD(username);
  //     updateRole(username,'td')
  //   };

  //   const handleDemote = (username: string) => {
  //     demoteFromTD(username);
  //     updateRole(username,'user')
  //   };

  //   const handleBan = (username: string) => {
  //     banUser(username);
  //     updateRole(username,'ban')
  //   };

  //   const handleEnable = (username: string) => {
  //     enableUser(username);
  //     updateRole(username,'user')
  //   };

  // const getColumnSearchProps = (dataIndex: keyof User) =>({
  //   onFilter: (value:string, record:User) =>
  //     record[dataIndex]
  //       .toString()
  //       .toLowerCase()
  //       .includes(value.toLowerCase()),
  // })

  const columns = [
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
      width: "10%",
      render: (host: string) =>
        searchMode === "Host" ? <b>{host}</b> : <p>{host}</p>,
      // ...getColumnSearchProps("username"),
      // onFilter: (value: string | number | boolean, record: User) =>
      //   record["username"]
      //     .toString()
      //     .toLowerCase()
      //     .includes(value.toString().toLowerCase()),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (title: string) =>
        searchMode === "Tourname" ? <b>{title}</b> : <p>{title}</p>,
    },
    // {
    //   title: "Display Name",
    //   dataIndex: "display_name",
    //   key: "display_name",
    //   width: "15%",
    // },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "10%",
      render: (type: string) => {
        return (
          <Tag color={tagColor[type.toLowerCase()]} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Players",
      dataIndex: "players",
      key: "players",
      width: "10%",
    },
    {
      title: "Scoring mode",
      dataIndex: "mode",
      key: "mode",
      width: "10%",
    },
    {
      title: "Action",
      key: "action",
      width: "30%",
      render: (_: any, record: Tour) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                handleViewScore(record.title);
              }}
            >
              View Score
            </a>
            <a
              onClick={() => {
                handleViewRanking(record.title);
              }}
            >
              View Ranking
            </a>
          </Space>
          //   <Space size="middle">
          //     {record.access.toLowerCase() === "user" && (
          //       <Popconfirm
          //         title={`Promote ${record.username} to TD?`}
          //         onConfirm={() => handlePromote(record.username)}
          //       >
          //         <a>Promote to TD</a>
          //       </Popconfirm>
          //     )}
          //     {record.access.toLowerCase() === "td" && (
          //       <Popconfirm
          //         title={`Demote ${record.username} from TD?`}
          //         onConfirm={() => handleDemote(record.username)}
          //       >
          //         <a>Demote from TD</a>
          //       </Popconfirm>
          //     )}
          //     {/* {<a>Suspend</a>} */}
          //     {(record.access.toLowerCase() === "user" ||
          //       record.access.toLowerCase() === "td") && (
          //       <Popconfirm
          //         title={`Ban ${record.username}?`}
          //         onConfirm={() => handleBan(record.username)}
          //       >
          //         <a>
          //           <b>Ban</b>
          //         </a>
          //       </Popconfirm>
          //     )}
          //     {record.access.toLowerCase() === "ban" && (
          //       <Popconfirm
          //         title={`Enable ${record.username}?`}
          //         onConfirm={() => handleEnable(record.username)}
          //       >
          //         <a>
          //           <b>Enable this user</b>
          //         </a>
          //       </Popconfirm>
          //     )}
          //   </Space>
        );
      },
    },
  ];

  return (
    <>
      <PopupContainer>
        {viewingState == "Score" ? (
          <ViewPastMatch
            tourId={viewingTour}
            setViewingTour={setViewingTour}
            viewingState={viewingState}
            setViewingState = {setViewingState}
          />
        ) : (
          <></>
        )}
        {viewingState == "Ranking" ? (
          <ViewRanking
            tourId={viewingTour}
            setViewingTour={setViewingTour}
            viewingState={viewingState}
            setViewingState = {setViewingState}
          />
        ) : (
          <></>
        )}
      </PopupContainer>
      <CenterContainer className="admintable" id="admintable">
        <div style={{ position: "absolute", top: "61px", left: "5px" }}>
          <BackButton display={false} />
        </div>
        <GridContainer>
          <InnerContainer id="user-window">
            <div style={{ display: "flex", paddingTop: "20px" }}>
              <div className="self-start pt-4 pb-2 pl-8">
                <TitleText medium>Finished Tournaments</TitleText>
              </div>
            </div>
            <SelectorContainer>
              <p style={{ lineHeight: "32px" }}>Select search mode</p>
              <Switch
                primary="Host"
                secondary="Tourname"
                onCheck={(isCheck) => {
                  handleSwitch(isCheck);
                }}
              />
            </SelectorContainer>
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
                value={nameSearch}
                //   pattern="[A-Za-z0-9]"
                placeholder={`Input ${searchMode}`}
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
                pageSize: 8,
                showSizeChanger: false,
              }}
              // scroll={{ y: "70vh", scrollToFirstRowOnChange: true }}
              // scroll = {{x:"1200px"}}
              locale={{ emptyText: <span> No Data </span> }}
              // bordered
            />
            {/* <Stack></Stack> */}
          </InnerContainer>
          {/* <RightSideBox> */}
          {/* <OnlineFriends display={false} tourName={''} /> */}
          {/* <Chat display={false} /> */}
          {/* </RightSideBox> */}
        </GridContainer>
      </CenterContainer>
    </>
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
  margin-bottom: 20px;
  justify-content: center;
  align-content: center;
  max-width: 750px;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: start;
  align-content: left;
  max-width: 750px;
`;

const CenterContainer = styled.div`
  width: 100vw;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
  min-height: calc(100 - 56px);
  overflow: scroll;
`;

const GridContainer = styled.div`
  display: grid;
  /* position: absolute; */
  /* top: 5px; */
  gap: 10px;
  /* grid-template-columns: 3fr 1fr; */
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
  /* border-right: 0.5px solid #e6e6e6; */
  /* padding-right: 1vw; */
  /* height: 720px; */
`;
// const LobbyContainer = styled.div<{ hide: boolean }>`
//   height: 100%;
//   width: 100%;
//   ${(props) =>
//     props.hide &&
//     css`
//       transform: translateX(0px);
//       --webkit-transform: translateX(0px);
//       opacity: 1;
//       transition: transform 0.3s, opacity 0.1s;
//       --webkit-transition: transform 0.3s, opacity 0.1s;
//     `}
//   ${(props) =>
//     !props.hide &&
//     css`
//       transform: translateX(-50px);
//       --webkit-transform: translateX(-50px);
//       opacity: 0;
//       transition: transform 0.3s, opacity 0.1s;
//       --webkit-transition: transform 0.3s, opacity 0.1s;
//     `}
// `;

// const LobbyList = styled.div`
//   /* grid-column: 1; */
//   height: 100%;
//   width: 100%;
// `;

// const JoinRoomContainer = styled(motion.div)<{ display: boolean }>`
//   position: absolute;
//   bottom: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-content: center;
//   align-items: center;
//   gap: 15px;
//   width: 100%;
//   padding-right: 15px;
//   height: 48px;
//   background-color: rgba(255, 255, 255, 0.6);
//   backdrop-filter: blur(24px);
//   --webkit-backdrop-filter: blur(24px);
//   transform: translateY(${(props) => (props.display ? "50px" : "0px")});
//   --webkit-transform: translateY(
//     ${(props) => (props.display ? "50px" : "0px")}
//   );
//   transition: transform 0.2s;
//   --webkit-transition: transform 0.2s;
// `;

// const JoinRoomContainerVariants = {
//   show: { y: 0 },
//   hide: { y: 48 },
// };

// const RightSideBox = styled.div`
//   position: relative;
//   height: 100%;
//   overflow: hidden;
// `;

// const Stack = styled.div`
//   position: relative;
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   display: flex;
// `;

// const LobbyVariants = {
//   hide: { x: -50, opacity: 0 },
//   show: { x: 0, opacity: 1 },
// };

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

const PopupContainer = styled.div`
  width: 100vw;
  height: calc(100%-56px);
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 100;
`;

export default MatchHistoryPage;
