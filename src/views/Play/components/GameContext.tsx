import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { ConnectTable } from '../../TourRoom/UseTable';
import PlayPage from '../Play';

interface GameContextType {
    display: boolean
    connectDetail: ConnectTable | null
    setDisplay: (display: boolean) => void
    setConnectDetail: (connectDetail: ConnectTable | null) => void
}

const GameContext = React.createContext<GameContextType>({
    display: true,
    connectDetail: null,
    setDisplay: (display: boolean) => {},
    setConnectDetail: (connectDetail: ConnectTable | null) => {},
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

export const GameProvider =(props: GameContextProps)=> {
    const [display, setDisplay] = React.useState(false)
    const [connectDetail, setConnectDetail] = React.useState<ConnectTable | null>(null)
    return (
        <GameContext.Provider value={{display, setDisplay, connectDetail, setConnectDetail}}>
            {props.children}
            {
                display &&
                <GameContainer display={display}>
                    <PlayPage tableId={""} tableDetail={props.connectDetail ?? undefined} />
                </GameContainer>
            }
                
        </GameContext.Provider>
    )
}

export const useGame =()=> React.useContext(GameContext)