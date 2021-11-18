import React from "react"
import { useAuthen } from "../../Authen"
import { PrimarySqButton, SecondaryButton } from "../../components/Button/Button"
import { NormalText, TitleText } from "../../components/Text/Text"
import TextFieldNoWarning from "../../components/TextField/TextFieldNoWarning"
import { PlayerPair, useLobby, useRoom } from "../../Service/SocketService"
import CSS from 'csstype';
import { useNavigator } from "../../components/Router/Router"
import styled, { css } from "styled-components"
import { motion } from "framer-motion"

interface TourRoomProps {
    width?: number
    display?: boolean
    onLeave?: () => void
    tourName: string
}

export const TourRoomPage: React.FunctionComponent<TourRoomProps> = (props: TourRoomProps) => {
    const { tourList, createTour, joinTour, getTourList, connect } = useLobby()
    const authenContext = useAuthen()
    const { leaveTourRoom } = useRoom(props.tourName)
    React.useEffect(() => {
        
    }, [])

    return (
        <TourRoomContainer
            width={props.width ?? 0}
            hide={props.display ?? false}
            // variants={vartians(props.width ?? 0)}
            // animate={props.display ? "show" : "hide"}
            // transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
        >
            <InnerContainer width={props.width ?? 0}>
                <div className="flex justify-between items-center">
                    <div className="self-start pt-4 pb-4"><TitleText medium>{props.tourName}</TitleText></div>
                    <ButtonContainer>
                        <PrimarySqButton onClick={() => {
                            leaveTourRoom(authenContext.authen.username)
                            // window.history.back()
                            props.onLeave?.()
                        }}>Leave</PrimarySqButton>
                    </ButtonContainer>
                </div>
                <PlayerList tourName={props.tourName}/>
                <JoinRoomContainer>
                    <TextFieldNoWarning />
                    <div className="h-8">
                        <SecondaryButton twstyle="h-8" onClick={() => {
                            createTour("testtest", (success, reason) => {
                                if (success) {
                                    console.log(success, reason)
                                }
                            })
                        }}>COPY</SecondaryButton>
                    </div>
                </JoinRoomContainer>
            </InnerContainer>
        </TourRoomContainer>
    )
}

interface PlayerListProps {
    tourName: string
}

const PlayerList = (props: PlayerListProps) => {
    const navContext = useNavigator()
    const { socket, players , getPlayerInRoom} = useRoom(props.tourName)

    React.useEffect(()=> {
        console.log("get from",props.tourName)
        getPlayerInRoom()
    },[props.tourName])

    return (
        <div style={PlayerListCss}>
            <PlayerListScroll>
                {
                    Object.keys(players).map((key) => {
                        const pair = players[key as keyof PlayerPair]
                        return <PlayerListCell player_name1={pair[0] ?? ""} player_name2={pair[1] ?? ""} pair_name={key} />
                    })
                }
            </PlayerListScroll>
        </div>
    )
}

interface PlayerListCellProps {
    pair_name: string
    player_name1: string
    player_name2: string
}

const PlayerListCell = (props: PlayerListCellProps) => {
    return (
        <PlayerListCellContainer>
            <div style={{ width: "45%" }}>
                <NormalText big>{props.player_name1}</NormalText>
            </div>
            <div style={{ width: "10%" }}>
                <TitleText>{props.pair_name.split('_')[1].toUpperCase()}</TitleText>
            </div>
            <div style={{ width: "45%" }}>
                <NormalText>{props.player_name2}</NormalText>
            </div>
        </PlayerListCellContainer>
    )
}


const TourRoomContainer = styled(motion.div) <{width: number, hide: boolean}>`
    position: absolute;
    right: -${props => props.width}px;
    width: ${props => props.width}px;
    background-color: white;
    height: 100%;

    ${props=> !props.hide && css`
        transform: translateX(0px);
        opacity: 0.5;
        transition: transform 0.2s, opacity 0.2s;
    `}
    ${props=> props.hide && css`
        transform: translateX(-${props.width}px);
        opacity: 1;
        transition: transform 0.2s, opacity 0.2s;
    `}
    /* z-index: -1; */
`

function vartians(width: number) {
    return {
        show: { x: `-${width}px` },
        hide: { x: 0 }
    }
}


const InnerContainer = styled.div<{width: number}>`
    position: relative;
    width: ${props => props.width};
    border-right: 0.5px solid #e6e6e6;
    height: 100%;
    padding-right: 15px;
`

const PlayerListCss: CSS.Properties = {
    // gridColumn: "1",
    // gridRow: "2",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "100%",
    // maxHeight: "75vh",
    overflow: "scroll"
}

const PlayerListScroll = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
`



const JoinRoomContainer = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center ;
    gap: 15px;
    width: 100%;
    padding-right: 15px;
    height: 48px;
    background-color: rgba(255,255,255,0.6);
    backdrop-filter: blur(24px);
`

const ButtonContainer = styled.div`
    height: 48px;
`

const PlayerListCellContainer = styled.div`
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 15px;
    height: 48px;
    justify-content: center;
    align-items: center;
    align-content: center;
`
