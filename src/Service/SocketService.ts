import React from 'react'
import { io } from 'socket.io-client'
import { callbackify } from 'util'
import LeaderBoard from '../views/Play/components/LeaderBoard'
import { TourData } from '../views/Popup/TourRequest'
// import { endpoint } from './ServiceConfig';
const endpoint = "http://localhost:4000";

// const endpoint = "wss://bridge-api-tim.herokuapp.com/"
export var socket = io(endpoint, { transports: ["websocket"] });
//useLobby




interface Direction {
    id: any,
    direction: any
}

interface Table {
    table_id: string,
    versus: string,
    boards: number[],
    currentBoard: number,
    directions: Direction[]
}

export interface RoundData {
    roundNum: string,
    tables: [Table]
}

interface TourItem {
  host: string;
  title: string;
  type: string;
  players: string;
}

export const useLobby = () => {
  //console.log("End point ",endpoint)
  const [tourList, updateTourList] = React.useState<TourItem[]>(
    new Array<TourItem>()
  );
  React.useEffect(() => {
    socket.on("connected", (text: string) => {
      //console.log("CONNECTED", text)
    });
  }, []);

  const createTour = (
    username: string,
    data: any,
    callback: (success: boolean, reason: string) => void
  ) => {
    // var userName = "td1"
    // var tourdata = {
    //     tour_name: "tour-fa;sdkfjas;dlfkja;s",
    //     max_player: 20,
    //     type: "Pairs",
    //     password: "123",
    //     player_name: [],
    //     time_start: "11/12/2021, 11:18:00 PM",
    //     status: "Pending",
    //     board_to_play: 2,
    //     minute_board: 2,
    //     board_round: 1,
    //     movement: "Clocked",
    //     scoring: "MP",
    //     barometer: true,
    //     createBy: userName,
    // }

    const formatDate =
      data.date.split("-")[1] +
      "/" +
      data.date.split("-")[2] +
      "/" +
      data.date.split("-")[0];
    const dayNight = Number(data.time.split(":")[0]) > 12 ? "PM" : "AM";
    const updateValue =
      Number(data.time.split(":")[0]) > 12
        ? String(Number(data.time.split(":")[0]) - 12)
        : data.time.split(":")[0];

    const formatTime =
      " " +
      updateValue +
      ":" +
      data.time.split(":")[1] +
      ":" +
      (data.time.split(":")[2] == undefined ? "00" : data.time.split(":")[2]) +
      " " +
      dayNight;
    // console.log("date time", formatDate + ',' + formatTime)
    const formatDateTime = formatDate + "," + formatTime;

    const tourdata: TourData = {
      tour_name: data.title,
      max_player: 20,
      type: data.movement,
      password: "",
      players: [],
      time_start: formatDateTime,
      status: "Pending",
      board_to_play: Number(data.boardToPlay),
      minute_board: Number(data.minuteBoard),
      board_per_round: Number(data.boardRound),
      movement: data.movement,
      scoring: data.scoring,
      barometer: true,
      createBy: username,
    };
    console.log(tourdata);
    socket.emit("create-tour", tourdata, (isValid: boolean, reason: string) => {
      if (isValid) {
        getTourList();
      }
      callback(isValid, reason);
    });
  };

  const getTourList = () => {
    socket.emit("getTourList", (roomList: any) => {
      updateTourList(roomList);
      // console.log("update tour list => ", roomList)
    });
  };

  const joinTour = (
    playername: string,
    roomID: string,
    callback: (success: boolean) => void
  ) => {
    socket.emit("join-tour", playername, roomID, (success: boolean) => {
      callback(success);
    });
  };

  const connect = (token: string, username: string) => {
    //console.log("connecting to websocket")
    socket = io(endpoint, {
      transports: ["websocket"],
      query: { token, username },
    });
    //console.log(socket.connected)
  };

  interface ChatObj {
    sender: string;
    message: string;
  }

  const updateChat = (callback: (message: ChatObj) => void) => {
    //console.log('update chat from server')
    socket.on("update-lobby-chat", (message: ChatObj) => {
      callback(message);
    });
  };

  const sendMessageToLobbyChat = (sender: string, message: string) => {
    socket.emit("send-lobby-chat", sender, message, () => {});
  };

  const getUpdatedTourList = () => {
    socket.on("update-tour-list", (roomList) => {
      updateTourList(roomList);
    });
  };

  return {
    socket,
    tourList,
    createTour,
    joinTour,
    getTourList,
    connect,
    updateChat,
    sendMessageToLobbyChat,
    getUpdatedTourList,
  };
};

export const useSocial = () => {
  interface FriendObj {
    id: string;
    name: string;
    status: string;
  }

  const updateFriends = (callback: (friends: FriendObj) => void) => {
    socket.on("update-friend", (friends: FriendObj) => {
      callback(friends);
    });
  };
  return { updateFriends };
};

interface Player {
  socket_id: string;
  username: string;
  tour: string;
  session: string;
}

interface Pair {}

//useRoom

export const useRoom = (roomID: string) => {
  const [players, updatePlayers] = React.useState<string[]>([]);
  const [playerPair, updatePlayerPair] = React.useState<
    { id: string; name: string; status: string; pair_id: number }[][]
  >([]);
  const [invitation, updateInvitation] = React.useState<string[]>([]);
  const [watingPlayers, udpateWaitingPlayers] = React.useState<string[]>([]);

  React.useEffect(() => {
    getPlayerInRoom();
    getPlayerPair();
  }, []);

  React.useEffect(() => {
    socket.on("update-player", (playersList: any) => {
      updatePlayers(playersList);
    });
  }, [updatePlayers]);

  const getPlayerInRoom = () => {
    if (roomID == undefined) {
      return;
    }
    if (roomID == "") {
      return;
    }
    //console.log("get player in :=> ", roomID)
    socket.emit("getPlayerInTourRoom", roomID, (players: string[]) => {
      //console.log('we got :-> ', players)
      udpateWaitingPlayers(players);
    });
  };

  const getPlayerPair = () => {
    socket.emit(
      "get-player-pair",
      roomID,
      (
        player: { id: string; name: string; status: string; pair_id: number }[]
      ) => {
        const pair = mapPlayerPair(player);
        updatePlayerPair(pair);
      }
    );
  };

  const mapPlayerPair = (
    pairFromServer: {
      id: string;
      name: string;
      status: string;
      pair_id: number;
    }[]
  ) => {
    var pair: {
      id: string;
      name: string;
      status: string;
      pair_id: number;
    }[][] = [];
    var numberOfPair = 0;
    var temp = pairFromServer ?? playerPair;
    if (temp.length > 0) {
      pair.push([temp[0]]);
    }
    temp.splice(0, 1);

    while (temp.length != 0) {
      var found = false;
      var currentPlayerToPair = pair[numberOfPair][0];
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].pair_id == currentPlayerToPair.pair_id) {
          pair[numberOfPair].push(temp[i]);
          numberOfPair += 1;
          temp.splice(i, 1);
          if (temp[0] != undefined || temp[0] != null) {
            pair.push([temp[0]]);
            temp.splice(0, 1);
          }
          found = true;
          break;
        }
        if (i == temp.length - 1) {
          if (!found) {
            numberOfPair += 1;
            if (temp[0] != undefined || temp[0] != null) {
              pair.push([temp[0]]);
              temp.splice(0, 1);
            }
          }
        }
      }
    }
    // let indexToFilter = 0
    // for (var i = 0; i < pair.length; i++) {
    //     if (pair[i][0] == undefined) {
    //         indexToFilter = i
    //     }
    // }
    // pair.splice(indexToFilter, 1)
    return pair;
  };

    const waitForInvitation =(onInvited: (playerName: string)=>void)=> {
        //console.log("wating for invitation ...")
        socket.on('invite-by', (player_name: string)=> {
            console.log("got invite by", player_name, invitation)

            updateInvitation( prevState => [...prevState, player_name])
            onInvited(player_name)
        })
    }
    
  const invitePlayer = (invite_player_name: string, player_name: string) => {
    socket.emit(
      "invite-player",
      roomID,
      invite_player_name,
      player_name,
      () => {}
    );
  };

  const updatePlayerInWaiting = () => {
    socket.on("update-player-waiting", (waitingPlayers: string[]) => {
      console.log("Player in waiting : ", waitingPlayers);
      udpateWaitingPlayers(waitingPlayers);
    });
  };

  const acceptInvite = (invite_player_name: string, player_name: string) => {
    socket.emit(
      "accept-invite",
      roomID,
      invite_player_name,
      player_name,
      () => {}
    );
  };

  const declineInvite = (invite_player: string) => {
    const newInviteList = [...invitation].filter(
      (value) => value != invite_player
    );
    updateInvitation(newInviteList);
  };

  const leaveTourRoom = (playerName: string) => {
    //console.log("player ", playerName, " leave")
    socket.emit("leave-tour-room", playerName, () => {});
  };

  interface ChatObj {
    sender: string;
    message: string;
  }

  const updateTourChat = (callback: (message: ChatObj) => void) => {
    socket.on("update-tour-chat", (message: ChatObj) => {
      //console.log("Get message from ", message)
      callback(message);
    });
  };

  interface TourData {
    roundNum: string;
    tables: [Table];
  }

  interface Table {
    table_id: string;
    versus: string;
    boards: number[];
    currentBoard: number;
    directions: Direction[];
  }

  interface Direction {
    id: any;
    direction: any;
  }

  const sendMessageToTourChat = (
    sender: string,
    tour_name: string,
    message: string
  ) => {
    socket.emit("send-tour-chat", sender, tour_name, message, () => {});
  };

  const getUpdatedPlayerPair = (
    username: string,
    callback: (pair_id: number) => void
  ) => {
    socket.on(
      "update-player-pair",
      (
        pairs: { id: string; name: string; status: string; pair_id: number }[]
      ) => {
        const sortedPair = pairs.sort((a, b) => a.pair_id - b.pair_id);
        const pair = mapPlayerPair(sortedPair);
        var pairId = 0;
        for (var i = 0; i < pair.length; i++) {
          for (var player = 0; player < pair[i].length; player++) {
            if (pair[i][player].name == username) {
              pairId = pair[i][player].pair_id;
            }
          }
        }
        console.log("PAIR ID", pairs);
        callback(pairId);
        updatePlayerPair(pair);
      }
    );
  };

  const deleteThisTour = (td: string, callback: () => void) => {
    socket.emit("delete-tour", roomID, td);
  };

  const startTour = () => {
    socket.emit("start", roomID);
  };

  const waitForStart = (callback: (table: TourData[]) => void) => {
    socket.on("start-tour", (table) => {
      callback(table);
    });
  };

  return {
    socket,
    players,
    getPlayerInRoom,
    leaveTourRoom,
    updateTourChat,
    sendMessageToTourChat,
    invitePlayer,
    waitForInvitation,
    acceptInvite,
    declineInvite,
    updatePlayerInWaiting,
    watingPlayers,
    playerPair,
    invitation,
    updateInvitation,
    getUpdatedPlayerPair,
    deleteThisTour,
    startTour,
    waitForStart,
  };
};

export const useScore = (tourId: string) => {
  interface RoundScore {
    score: number[];
  }

  interface RecapScoreOBJ {
    round_num: string;
    tables: RoundScore[];
  }
  // const [allScore, updateAllScore] = React.useState<RecapScore[]>([])

  const getAllScore = (callback: (recapScore: RecapScoreOBJ[]) => void) => {
    socket.emit("get-all-score", tourId);
    socket.on("score", (recapScore: RecapScoreOBJ[]) => {
      // updateAllScore(recapScore)
      callback(recapScore);
    });
  };
  // const updateTourChat =(callback: (message: ChatObj)=>void)=> {
  //     socket.on('update-tour-chat', (message: ChatObj)=> {
  //         //console.log("Get message from ", message)
  //         callback(message)
  //     })
  // }

  return {
    getAllScore,
  };
};

export const useManage = (admin: string) => {
  interface User {
    key: string;
    access: string;
    display_name: string;
    username: string;
    email: string;
  }

  const getUserList = (callback: (userList: User[]) => void) => {
    socket.emit("getAllUserList");
    socket.on("getAllUserList", (userList) => {
      const users = userList.map((user: any) => {
        return {
          key: user._id,
          access: user.access,
          display_name: user.display_name,
          username: user.username,
          email: user.email,
        };
      });
      callback(users);
    });
  };

  const promoteToTD = (username: string) => {
    socket.emit("grant_user_to_td", admin, username);
  };

  const demoteFromTD = (username: string) => {
    socket.emit("refuse_user_to_td", admin, username);
  };

  const banUser = (username: string) => {
    socket.emit("ban_user", admin, username);
  };

  const enableUser = (username: string) => {
    socket.emit("refuse_ban_user", admin, username);
  };

  return { getUserList, promoteToTD, demoteFromTD, banUser, enableUser };
};
