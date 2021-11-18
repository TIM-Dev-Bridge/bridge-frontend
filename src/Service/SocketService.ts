import React from 'react'
import { io } from 'socket.io-client'
// const endpoint = "wss://bridge-api-tim.herokuapp.com/"
const endpoint = "localhost:4000/"
export var socket = io(endpoint,{transports:['websocket']})

interface TourItem {
    host: string,
    title: string,
    type: string,
    players: string,
}

export const useLobby =()=> {
    const [tourList, updateTourList] = React.useState<TourItem[]>(new Array<TourItem>());
    React.useEffect(()=> {
        socket.on('connected', (text: string)=> {
            console.log("CONNECTED", text)
        })
    },[])

    const createTour =(username: string, callback: (success: boolean, reason: string)=>void)=> {
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
            console.log("update tour list => ", roomList)
        }))
    }
    
    const joinTour =(playername:string, roomID: string,callback: (success: boolean)=>void)=> {
        socket.emit('join-tour', "testtest", "tour-fa;sdkfjas;dlfkja;s" , (success: boolean)=> {
            callback(success)
        })
    }

    const connect =(token: string, username: string)=> {
        console.log("connecting to websocket")
        socket = io(endpoint,{transports:['websocket'], query: {token, username}})
        console.log(socket.connected)
    }

    interface ChatObj {
        sender: string,
        message: string
    }

    const updateChat =(callback: (message: ChatObj)=>void)=> {
        console.log('update chat from server')
        socket.on('update-lobby-chat', (message: ChatObj)=> {
            callback(message)
        })
    }

    const sendMessageToLobbyChat =(sender: string, message: string)=> {
        socket.emit('send-lobby-chat', sender, message, ()=> {

        })
    }

    return {socket , tourList, createTour, joinTour, getTourList, connect, updateChat, sendMessageToLobbyChat}
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

export interface PlayerPair {
    pair_a: string[],
    pair_b: string[]
    pair_c: string[]
    pair_d: string[]
    pair_e: string[]
    pair_f: string[]
    pair_g: string[]
    pair_h: string[]
    pair_i: string[]
    pair_j: string[]
}

export const useRoom =(roomID: string)=> {
    const initValue : PlayerPair = {
        pair_a: [],
        pair_b: [],
        pair_c: [],
        pair_d: [],
        pair_e: [],
        pair_f: [],
        pair_g: [],
        pair_h: [],
        pair_i: [],
        pair_j: []
    }
    
    const [players, updatePlayers] = React.useState<PlayerPair>(initValue);

    React.useEffect(()=> {
        getPlayerInRoom()
    },[])

    React.useEffect(()=> {
        socket.on('update-player', (playersList: any)=> {
            updatePlayers(playersList)
        })
    },[updatePlayers])


    const getPlayerInRoom =()=> {
        if (roomID == undefined) { return }
        if (roomID == "") { return }
        socket.emit('getPlayerInTourRoom', roomID,(players: PlayerPair)=> {
            updatePlayers(players)
        })
    }

    const leaveTourRoom =(playerName: string)=> {
        socket.emit('leave-tour-room', playerName, ()=> {

        })
    }

    interface ChatObj {
        sender: string,
        message: string
    }

    const updateTourChat =(callback: (message: ChatObj)=>void)=> {
        socket.on('update-tour-chat', (message: ChatObj)=> {
            callback(message)
        })
    }

    const sendMessageToTourChat =(sender: string, tour_name: string, message: string)=> {
        socket.emit('send-tour-chat', sender, tour_name, message, ()=> {

        })
    }
    

    return { socket,  players, getPlayerInRoom, leaveTourRoom, updateTourChat, sendMessageToTourChat }
}