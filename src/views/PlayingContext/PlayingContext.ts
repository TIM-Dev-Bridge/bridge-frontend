import React from 'react'
import { RoundData } from '../../Service/SocketService'

export interface PlayState {
    tourName: string,
    room: string,
    round: string,
    table: string,
    direction: number,
    status: string,
    pairId: number,
    currentRound: number,
    tableCount: number,
    data: RoundData[]
}

// player_id: "",
//     player_name: authenContext.authen.username,
//     tour_name: tourNameRef.current,
//     direction: table?.directions[0].direction,
//     room: table?.table_id ?? "",
//     round_num: "1",
//     table_id: table?.table_id ?? ""
// }

export interface PlayStateContext {
    playState: PlayState
    updatePlayState: (playState: PlayState)=> void
}

export const PlayingContext = React.createContext<PlayStateContext>({
    playState: {
        tourName: "",
        room: "",
        round: "",
        table: "",
        direction: 0,
        status: '',
        pairId: 0,
        currentRound: 0,
        tableCount: 0,
        data: []
    },
    updatePlayState: (playState: PlayState) => {}
})

export const usePlayState =()=> React.useContext(PlayingContext)