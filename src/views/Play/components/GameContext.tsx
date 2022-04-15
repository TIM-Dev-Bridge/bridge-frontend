import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { ConnectTable } from '../../TourRoom/UseTable';
import PlayPage from '../Play';
import { v4 as uuidv4 } from 'uuid';

interface GameContextType {
    display: boolean
    connectDetail: ConnectTable | null
    setDisplay: (display: boolean) => void
    setConnectDetail: (connectDetail: ConnectTable | null) => void
    reset: ()=>void
}

const GameContext = React.createContext<GameContextType>({
    display: true,
    connectDetail: null,
    setDisplay: (display: boolean) => {},
    setConnectDetail: (connectDetail: ConnectTable | null) => {},
    reset: ()=>{}
})

interface GameContextProps extends HTMLAttributes<HTMLElement> {
    connectDetail?: ConnectTable
}

const GameContainer = styled.div<{display: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    visibility: ${props=>props.display ? "visible" : "hidden"};
`

const initialKey = uuidv4()

export const GameProvider =(props: GameContextProps)=> {
    const [display, setDisplay] = React.useState(false)
    const [connectDetail, setConnectDetail] = React.useState<ConnectTable | null>(null)
    const [componentKey, setComponentKey] = React.useState(initialKey)

    const reset =()=> {
        setComponentKey(uuidv4())
    }

    return (
        <GameContext.Provider value={{display, setDisplay, connectDetail, setConnectDetail, reset}}>
            {props.children}
            {
                display &&
                <GameContainer display={display} key={componentKey}>
                    <PlayPage tableId={""} tableDetail={props.connectDetail ?? undefined} />
                </GameContainer>
            }
                
        </GameContext.Provider>
    )
}

export const useGame =()=> React.useContext(GameContext)