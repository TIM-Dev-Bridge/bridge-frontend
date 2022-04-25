import { StringIterator } from "lodash"
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

export interface SummaryRank {
    pair_id: number, 
    name1: string, 
    name2: string, 
    totalMP: number, 
    rankPercent: number
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
            isFourthPlay: boolean,
            bidSuite: number
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
            tricks: number[],
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
            turn: number,
            maxContract: number,
        }
    }

    const onInitialPlaying =(callback: (data: InitialPlaying)=>void) => {
        socket.on('playing', (data) => {
            if (data['status'] == 'initial_playing') {
                callback(data)
            }
        })
    }

    interface InitialBidding {
        status : string,
        payload: {
            board_type: {
                board_number: number,
                dealer: "N" | "S" | "E" | "W",
                vulnerable: "None" | "N-S" | "E-W" | "All",
            },
            cur_board: number,
            board_per_round: number,
            cur_round: number,
            total_round: number,
        },
    }

    const onInitialBidding =(callback: (data: InitialBidding)=>void) => {
        socket.on('playing', (data) => {
            if (data['status'] == 'initial_bidding') {
                callback(data)
            }
        })
    }


    interface Ending {
        status: string,
        payload: {
            tricks: number[]
        }
    }

    const onFinishRound =(callback: (data: any)=>void) => {
        socket.on('finish-all-table', (data) => {
            console.log("FINISH ALL TABLE", data)
            callback(data)
        })
    }

    const onEnding =(callback: (data: Ending)=>void)=> {
        socket.on('playing', (data)=> {
            if (data['status'] == 'ending') {
                callback(data)
            }
        })
    }

    const leave =(tableId: String) => {
        socket.emit('leave-table', tableId)
    }

    const onSummaryRank =(callback: (data: SummaryRank[])=>void)=> {
        socket.on('rank-with-name', (data) => {
            callback(data)
        })
    }

    interface FinishTable {
        tricks: number[],
        scores: number[],
    }

    const onFinishTable = (callback: (data: FinishTable)=>void) =>{
        socket.on('board-summary', (tricks, scores) => {
            console.log('BOARD SUMMARY',tricks,scores)
            callback({tricks: tricks, scores:scores,})
        })
    }

    return {
        playCard,
        onInitialTurn,
        onInitialPlaying,
        onInitialBidding,
        onDefaultTurn,
        onFinishRound,
        onEnding,
        leave,
        onSummaryRank,
        onFinishTable
    }
}