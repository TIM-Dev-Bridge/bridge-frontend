import React from 'react'

export interface PlayState {
    tourName: string,
    room: string,
    round: string,
    table: string,
    direction: number,
    status: string,
    pairId: number,
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
        pairId: 0
    },
    updatePlayState: (playState: PlayState) => {}
})

export const usePlayState =()=> React.useContext(PlayingContext)