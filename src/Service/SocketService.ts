import React from 'react'
import { io } from 'socket.io-client'
import { TourData } from '../views/Popup/TourRequest'
// import { endpoint } from './ServiceConfig';
const endpoint = "ws://localhost:4000"

// const endpoint = "wss://bridge-api-tim.herokuapp.com/"
export var socket = io(endpoint,{transports:['websocket']})
//useLobby

interface TourItem {
    host: string,
    title: string,
    type: string,
    players: string,
}

export const useLobby =()=> {
    //console.log("End point ",endpoint)
    const [tourList, updateTourList] = React.useState<TourItem[]>(new Array<TourItem>());
    React.useEffect(()=> {
        socket.on('connected', (text: string)=> {
            //console.log("CONNECTED", text)
        })
    },[])

    const createTour =(username: string, data: any, callback: (success: boolean, reason: string)=>void)=> {
        var userName = "td1"
        var tourdata = {
            tour_name: "tour-fa;sdkfjas;dlfkja;s",
            max_player: 20,
            type: "Pairs",
            password: "123",
            player_name: [],
            time_start: "11/12/2021, 11:18:00 PM",
            status: "Pending",
            board_to_play: 2,
            minute_board: 2,
            board_round: 1,
            movement: "Clocked",
            scoring: "MP",
            barometer: true,
            createBy: userName,
        }

        const formatDate = data.date.split('-')[1] + '/' + data.date.split('-')[2] + '/' + data.date.split('-')[0]
        const dayNight = Number(data.time.split(':')[0]) > 12 ? "PM" : "AM"
        const updateValue = Number(data.time.split(':')[0]) > 12 ? String(Number(data.time.split(':')[0]) - 12) : data.time.split(':')[0]
        
        const formatTime = ' ' + updateValue + ':' + data.time.split(':')[1] + ':' + (data.time.split(':')[2] == undefined ? '00' :  data.time.split(':')[2]) + ' ' + dayNight
        // console.log("date time", formatDate + ',' + formatTime)
        const formatDateTime = formatDate + ',' + formatTime

        // const newData: TourData = {
        //     tour_name: data.title,
        //     max_player: 20,
        //     type: data.type,
        //     password: "",
        //     player_name: [],
        //     time_start: formatDateTime,
        //     status: "Pending",
        //     board_to_play: Number(data.boardToPlay),
        //     minute_board: Number(data.minuteBoard),
        //     board_round: Number(data.boardRound),
        //     movement: data.movement,
        //     scoring: data.scoring,
        //     barometer: true,
        //     createBy: username
        // }
        // console.log(newData)
        socket.emit("create-tour", tourdata, (isValid: boolean, reason: string)=> {
            if (isValid) {
                getTourList()
            }
            callback(isValid, reason)
        })
    }
    
    const getTourList =()=> {
        socket.emit('getTourList',((roomList: any)=> {
            updateTourList(roomList)
            // console.log("update tour list => ", roomList)
        }))
    }
    
    const joinTour =(playername:string, roomID: string,callback: (success: boolean)=>void)=> {
        socket.emit('join-tour', playername, roomID , (success: boolean)=> {
            callback(success)
        })
    }

    const connect =(token: string, username: string)=> {
        //console.log("connecting to websocket")
        socket = io(endpoint,{transports:['websocket'], query: {token, username}})
        //console.log(socket.connected)
    }

    interface ChatObj {
        sender: string,
        message: string
    }

    const updateChat =(callback: (message: ChatObj)=>void)=> {
        //console.log('update chat from server')
        socket.on('update-lobby-chat', (message: ChatObj)=> {
            callback(message)
        })
    }

    const sendMessageToLobbyChat =(sender: string, message: string)=> {
        socket.emit('send-lobby-chat', sender, message, ()=> {

        })
    }

    const getUpdatedTourList =()=> {
        socket.on('update-tour-list', (roomList)=> {
            updateTourList(roomList)
        })
    }

    return {
        socket , 
        tourList, 
        createTour, 
        joinTour, 
        getTourList, 
        connect, 
        updateChat, 
        sendMessageToLobbyChat, 
        getUpdatedTourList
    }
}

export const useSocial =()=> {
    interface FriendObj {
        id: string,
        name: string,
        status: string,
    }

    const updateFriends =(callback: (friends: FriendObj)=>void)=> {
        socket.on('update-friend', (friends: FriendObj)=> {
            callback(friends)
        })
    }
    return { updateFriends }
}

interface Player {
    socket_id: string,
    username: string,
    tour: string,
    session: string,
}

interface Pair {
    user_a: string,
    user_b: string
}


//useRoom

export const useRoom =(roomID: string)=> {
    const [players, updatePlayers] = React.useState<string[]>([]);
    const [playerPair, updatePlayerPair] = React.useState<Pair[]>([]);
    const [invitation, updateInvitation] = React.useState<string[]>([]);
    const [watingPlayers, udpateWaitingPlayers] = React.useState<string[]>([]);

    React.useEffect(()=> {
        getPlayerInRoom()
        getPlayerPair()
    },[])

    React.useEffect(()=> {
        socket.on('update-player', (playersList: any)=> {
            updatePlayers(playersList)
        })
    },[updatePlayers])


    const getPlayerInRoom =()=> {
        if (roomID == undefined) { return }
        if (roomID == "") { return }
        //console.log("get player in :=> ", roomID)
        socket.emit('getPlayerInTourRoom', roomID,(players: string[])=> {
            //console.log('we got :-> ', players)
            udpateWaitingPlayers(players)
        })
    }

    const getPlayerPair =()=> {
        socket.emit('get-player-pair', roomID, (playerPair: Pair[])=> {
            updatePlayerPair(playerPair)
        })
    }

    const invitePlayer =(invite_player_name: string, player_name: string)=> {
        socket.emit('invite-player', roomID,invite_player_name, player_name, ()=> {})
    }

    const waitForInvitation =(onInvited: (playerName: string)=>void)=> {
        //console.log("wating for invitation ...")
        socket.on('invite-by', (player_name: string)=> {
            //console.log("got invite by", player_name)
            onInvited(player_name)
            updateInvitation([...invitation, player_name])
        })
    }

    const updatePlayerInWaiting =()=> {
        socket.on('update-player-waiting', (waitingPlayers: string[])=> {
            console.log("Player in waiting : ", waitingPlayers)
            udpateWaitingPlayers(waitingPlayers)
        })
    }

    const acceptInvite =(invite_player_name: string, player_name: string)=> {
        socket.emit('accept-invite', roomID, invite_player_name, player_name, ()=>{})
    }

    const declineInvite =(invite_player: string)=> {
        const newInviteList = [...invitation].filter((value)=> value != invite_player)
        updateInvitation(newInviteList)
    }

    const leaveTourRoom =(playerName: string)=> {
        //console.log("player ", playerName, " leave")
        socket.emit('leave-tour-room', playerName, ()=> {

        })
    }

    interface ChatObj {
        sender: string,
        message: string
    }

    const updateTourChat =(callback: (message: ChatObj)=>void)=> {
        socket.on('update-tour-chat', (message: ChatObj)=> {
            //console.log("Get message from ", message)
            callback(message)
        })
    }

    const sendMessageToTourChat =(sender: string, tour_name: string, message: string)=> {
        socket.emit('send-tour-chat', sender, tour_name, message, ()=> {
            
        })
    }

    const getUpdatedPlayerPair =()=> {
        socket.on('update-player-pair', pairs => {
            updatePlayerPair(pairs)
        })
    }
    
    const deleteThisTour =(td: string, callback: ()=>void)=> {
        socket.emit('delete-tour', roomID, td)
    }

    const startTour =()=> {
        socket.emit('start', roomID)
    }

    const waitForStart =(callback: (table: {[key: string]:string})=>void)=> {
        socket.on('start-tour', (table)=> {
            callback(table)
        })
    }

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
        declineInvite ,
        updatePlayerInWaiting,
        watingPlayers,
        playerPair,
        invitation,
        updateInvitation,
        getUpdatedPlayerPair,
        deleteThisTour,
        startTour,
        waitForStart
    }
}