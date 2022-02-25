import { socket } from "../../Service/SocketService"

interface TourData {
    roundNum: string,
    tables: [Table]
}

interface Table {
    tableId: string,
    versus: any,
    boards: number[],
    currentBoard: number,
    direction: Direction
}

interface Direction {
    id: any,
    direction: any
}

export interface ConnectTable {
    player_id: string
    player_name: string
    tour_name: string
    direction: number
    room: string
    round_num: string
    table_id: string
}

export const useTable =()=> {
    const connect =(tableId: string, tableDetail: ConnectTable)=> {
        socket.emit('join', tableDetail)
    }

    const updateCardOpposite =()=> {
        socket.on("opposite", (cards)=> {

        })
    }

    const updateCard =(callback: (cards: number[])=>void)=> {
        socket.on("card", cards => {
            callback(cards)
        })
    }

    const subscribePlayingStatus =(onReceive: (status: string, payload: any)=>void)=> {
        socket.on("playing", (status, payload: string)=> {
            onReceive(status, payload)
        })
    }

    const playCard =(playerId: string, room: string, card: any, direction: Direction, turn: any, tourName: string, roundNum: number, tableId: string)=> {
        socket.emit("play_card", playerId, room, card, direction, turn, tourName, roundNum, tableId)
    }


    const onTourStart =(callback: (data: TourData)=>void)=> {
        socket.on('start-tour', (data: TourData)=> {
            callback(data)
        })
    }

    return {
        connect,
        updateCard,
        updateCardOpposite,
        subscribePlayingStatus,
        playCard,
        onTourStart
    }
}