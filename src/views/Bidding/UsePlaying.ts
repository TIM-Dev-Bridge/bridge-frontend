import { callbackify } from "util"
import { socket } from "../../Service/SocketService"

export interface PlayCardRequest {
    player_id: string, 
    room: string, 
    card: any, 
    direction: number, 
    turn: any, 
    tour_name: string, 
    round_num: string, 
    table_id: string
}


export const usePlaying =()=> {
    const playCard =(body: PlayCardRequest)=> {
        socket.emit("play_card", body)
    }
    //   {
    //     player_id,
    //     room = "room_1",
    //     card,
    //     direction,
    //     turn,
    //     tour_name,
    //     round_num,
    //     table_id,
    //   }

    interface DefaultTurn {
        status: string,
        payload: {
            card: number,
            nextDirection: number,
            prevDirection: number,
            initSuite: number,
            isFourthPlay: boolean
        }
    }

    const onDefaultTurn =(callback: (data: DefaultTurn)=>void)=> {
        socket.on('playing', (data)=> {
            if (data['status'] == 'default') {
                callback(data)
            }
        })
    }

    interface InitialTurn {
        status: string,
        payload: {
            leader: number,
            turn: number
        }
    }

    const onInitialTurn =(callback: (data: InitialTurn)=>void) => {
        socket.on('playing', (data: InitialTurn) => {
            if (data['status'] == 'initial_turn') {
                callback(data)
            }
        })
    }

    interface InitialPlaying {
        status: string,
        payload: {
            leader: number,
            board: number,
            bidSuite: number,
            turn: number
        }
    }

    const onInitialPlaying =(callback: (data: InitialPlaying)=>void) => {
        socket.on('playing', (data) => {
            if (data['status'] == 'initial_playing') {
                callback(data)
            }
        })
    }

    interface Finish {

    }

    const onFinishRound =(callback: (data: any)=>void) => {
        socket.on('finish-all-table', (data) => {
            callback(data)
        })
    }

    const onEnding =(callback: ()=>void)=> {
        socket.on('playing', (data)=> {
            if (data['status'] == 'ending') {
                callback()
            }
        })
    }

    const leave =(tableId: String) => {
        socket.emit('leave-table', tableId)
    }

    return {
        playCard,
        onInitialTurn,
        onInitialPlaying,
        onDefaultTurn,
        onFinishRound,
        onEnding,
        leave
    }
}