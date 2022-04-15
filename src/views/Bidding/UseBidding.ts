import { socket } from "../../Service/SocketService"

export interface BiddingRequest {
    player_id: string,
    room: string,
    contract: number,
    direction: number,
    tour_name: string,
    round_num: string,
    table_id: string
}

export const useBidding =()=> {

    const updateCardOpposite =()=> {
        socket.on("opposite", (cards)=> {

        })
    }

    const updateCard =(callback: (cards: number[])=>void)=> {
        socket.on("card", cards => {
            callback(cards)
        })
    }

    const subscribePlayingStatus =(onReceive: (status: {[key:string]: any})=>void)=> {
        socket.on("playing", (status)=> {
            onReceive(status)
        })
    }

    // const playCard =(playerId: string, room: string, card: any, direction: Direction, turn: any, tourName: string, roundNum: number, tableId: string)=> {
    //     socket.emit("play_card", playerId, room, card, direction, turn, tourName, roundNum, tableId)
    // }

    // {
    //     player_id,
    //     room = "room_1",
    //     contract = CONTRACT.PASS,
    //     direction = DIRECTION.N,
    //     //Chage
    //     tour_name = "Mark1",
    //     round_num = "1",
    //     table_id = "r1b1",
    //   }

    const bid =(body: BiddingRequest)=> {
        socket.emit('bid', body)
    }


    return {
        bid,
        updateCard,
        updateCardOpposite,
        subscribePlayingStatus
    }
}