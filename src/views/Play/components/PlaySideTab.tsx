import React, { InputHTMLAttributes, MutableRefObject, RefObject } from "react";
import styled from "styled-components";
import { ReactComponent as BoardFormatNS } from "./../../../assets/images/PlaySideTab/BoardFormatN-S.svg";
import { ReactComponent as BoardFormatEW } from "./../../../assets/images/PlaySideTab/BoardFormatE-W.svg";
import chunk from "lodash/chunk";

export interface IPlaySideTabProps {
  round: number;
  permission: "player" | "td" | "spectator";
  boardsPerRound: number;
  boardsPlayed: number;
  totalRounds: number;
  // Vulnerable { 0: notVul, 1: NS, 2: EW, 3: NSEW}
  boardType?: {
    boardNo: number;
    dealer: "N" | "S" | "E" | "W";
    vulnerable: "None" | "N-S" | "E-W" | "All";
  };
  auction?: {
    declarer: "North" | "South" | "East" | "West";
    contract: string;
  };
  tricks?: { nsTricks: number; ewTricks: number };
  setSelectedPopup : Function;
}

const buttonDatas = [
  {
    id: 1,
    src: require("./../../../assets/images/PlaySideTab/ScoreBoard.png").default,
    name: 'ScoreBoard',
  },
  {
    id: 2,
    src: require("./../../../assets/images/PlaySideTab/LeaderBoard.png")
      .default,
    name: 'LeaderBoard',
  },
  // {
  //   id: 3,
  //   src: {
  //     player: require("./../../../assets/images/PlaySideTab/TournamentDirector.png")
  //       .default,
  //     td: require("./../../../assets/images/PlaySideTab/Spectate.png")
  //       .default,
  //     spectator: require("./../../../assets/images/PlaySideTab/Spectate.png")
  //     .default,
  //   },
  //   name: {
  //     player: 'TournamentDirector',
  //     td: 'Spectate',
  //     spectator: 'Spectate',
  //   },
  // },
  // {
  //   id: 4,
  //   src: require("./../../../assets/images/PlaySideTab/Chat.png").default,
  //   name: 'Chat',
  // },
];

const PlaySideTab: React.FC<IPlaySideTabProps> = (props: IPlaySideTabProps) => {
  const DealerPortion = {
    N: "0 0 80% 0",
    E: "0 0 0 80%",
    S: "80% 0 0 0",
    W: "0 80% 0 0",
  };

  const PermissionColor = {
    player: "#cef3f8",
    td: "PeachPuff",
    spectator: "#b0f5ad",
  };

  const CardSuite = {
    S: "Spade",
    H: "Heart",
    D: "Diamond",
    C: "Club",
    NT: "NoThrump",
  };

  return (
    <Container style={{ backgroundColor: PermissionColor[props.permission] }}>
      <div>
        {props.round && (
          <p style={{ fontSize: "2.5vh" }}> Round {props.round} / {props.totalRounds}</p>
        )}
        {props.boardsPlayed && (
          <p style={{ fontSize: "1.5vh"}} >
            {" "}
            Board {props.boardsPlayed} / {props.boardsPerRound}{" "}
          </p>
        )}
      </div>
      <BoardFormat>
        {/* Filled Color Depend on Vulnerable on boardtype : black, red */}
        <BoardFormatN_S
          fill={
            props.boardType
              ? (props.boardType.vulnerable === "N-S" || props.boardType.vulnerable === "All")
                ? "#ED1C24"
                : "black"
              : "grey"
          }
          width="100%"
          height="100%"
        />
        <BoardFormatE_W
          fill={
            props.boardType
              ? (props.boardType.vulnerable === "E-W" || props.boardType.vulnerable === "All")
              ? "#ED1C24"
              : "black"
              : "grey"
          }
          width="100%"
          height="100%"
        />

        {/* Render specific portion of image to present which position is current dealer */}
        <Dealer
          src={
            require("./../../../assets/images/PlaySideTab/Dealer.svg").default
          }
          style={
            props.boardType
              ? { clipPath: `inset(${DealerPortion[props.boardType.dealer]})` }
              : {}
          }
        />

        {/* Number of Board : N/A, 1-16 */}
        <CenteredText
          style={{ position: "absolute", width: "100%", fontSize: "5vmin" }}
        >
          {props.boardType ? props.boardType.boardNo : "N/A"}
        </CenteredText>
      </BoardFormat>

      <Panel style={{ height: "15vh", maxHeight: "150px" }}>
        <PanelTop>
          <CenteredText style={{ position: "relative", fontSize: "2vmin" }}>
            {/* Winner of Bidding : Winner, North, East, West, South */}
            {props.auction ? props.auction.declarer : "Winner"}
          </CenteredText>
        </PanelTop>
        <tbody>
          <CenteredText style={{ position: "relative", fontSize: "5vmin" }}>
            {/* Contract in the round */}
            {props.auction ? props.auction.contract.split("_")[0] : "N/A"}
            {props.auction ? (
              props.auction.contract.split("_")[1] == "NT" ? (
                "NT"
              ) : (
                <img
                  src={
                    require(`./../../../assets/images/CardSuite/${
                      CardSuite[
                        props.auction.contract.split(
                          "_"
                        )[1] as keyof typeof CardSuite
                      ]
                    }.svg`).default
                  }
                  height="auto"
                  width="18%"
                  style={{ display: "inline-block", verticalAlign: "baseline" }}
                />
              )
            ) : (
              ""
            )}
          </CenteredText>
        </tbody>
      </Panel>
      <Panel
        style={{ height: "20vh", maxHeight: "200px", tableLayout: "fixed" }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: PermissionColor[props.permission],
            width: "2px",
            height: "100%",
            left: "50%",
            top: "0",
          }}
        ></div>
        <PanelTop style={{ fontSize: "2vmin" }}>
          <th>N/S</th>
          <th>E/W</th>
        </PanelTop>
        <tbody style={{ fontSize: "5vmin"}}>
          <td>{props.tricks ? props.tricks.nsTricks : "0"}</td>
          <td>{props.tricks ? props.tricks.ewTricks : "0"}</td>
        </tbody>
      </Panel>
      {/* {props.permission == "td" && (
        <BigButton onClick={ () => props.setSelectedPopup('RecapSheet')}>
          <IconButton
            src={
              require("./../../../assets/images/PlaySideTab/RecapSheet.png")
                .default
            }
            height="auto"
            width="35%"
          />
        </BigButton>
      )}
      {chunk(buttonDatas, 2).map((chunkedButton) => {
        return ( */}
          <ButtonGroup>
            {buttonDatas.map((button) => {
              return (
                <FloatingButton onClick={ () =>
                  typeof button.name === "object"
                  ? props.setSelectedPopup(button.name[props.permission])
                  : props.setSelectedPopup(button.name)
                }>
                  <IconButton
                    src={
                      typeof button.src === "object"
                        ? button.src[props.permission]
                        : button.src
                    }
                    height="auto"
                    width="60%"
                  />
                </FloatingButton>
              );
            })}
          </ButtonGroup>
        {/* );
      })} */}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 1vw;
  padding-right: 1vw;
  width: 15%;
  justify-content: space-around;
  align-items: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  text-align: center;
`;

const Dealer = styled.img`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 100%;
  object-fit: contain;
  margin: auto;
`;

const BoardFormat = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
  max-height: 200px;
`;

const Panel = styled.table`
  position: relative;
  display: table;
  align-items: center;
  width: 70%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 4px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  overflow: hidden;
`;

const PanelTop = styled.thead`
  background-color: White;
  height: 33.3333%;
  width: 100%;
`;

const CenteredText = styled.p`
  text-align: center;
  width: 100%;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 7.5vh;
  max-height: 75px;
  width: 80%;
  gap: 10px;
`;

const BoardFormatE_W = styled(BoardFormatEW)`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BoardFormatN_S = styled(BoardFormatNS)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconButton = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.75;
`;

const BigButton = styled.div`
  display: block;
  height: 10vh;
  max-height: 100px;
  width: 70%;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 4px 4px 22px -9px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  &:hover ${IconButton} {
    opacity: 100%;
    transition: all 0.1s;
  }
`;

const FloatingButton = styled.div`
  display: block;
  height: 7.5vmin;
  width: 7.5vmin;
  max-height: 70px;
  max-width: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 4px 4px 22px -9px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  &:hover ${IconButton} {
    opacity: 100%;
    transition: all 0.1s;
  }
`;

export default PlaySideTab;
