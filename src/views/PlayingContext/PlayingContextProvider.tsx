import React, { HTMLAttributes } from 'react'
import { PlayingContext, PlayState } from './PlayingContext'

const initialPlayState: PlayState = {
    round: "",
    table: "",
    direction: 0,
    tourName: '',
    room: '',
    status: '',
    pairId: 0,
}

export const PlayingProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [playState, updatePlayState] = React.useState<PlayState>(initialPlayState)

    return (
        <PlayingContext.Provider value={{playState, updatePlayState}}>
            {props.children}
        </PlayingContext.Provider>
    )
}

