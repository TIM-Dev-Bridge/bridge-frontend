import React from "react"
import { useAuthen } from "../../Authen"
import { PrimaryButton, PrimarySqButton, SecondaryButton } from "../../components/Button/Button"
import { NormalText, TitleText } from "../../components/Text/Text"
import TextFieldNoWarning from "../../components/TextField/TextFieldNoWarning"
import {  socket, useLobby, useRoom } from "../../Service/SocketService"
import CSS from 'csstype';
import { useNavigator } from "../../components/Router/Router"
import styled, { css } from "styled-components"
import { motion } from "framer-motion"
import { useProfile } from "../UserProfile/ProfileContext"
import CreateTourPopup from "../Popup/CreateTourPopup"
import MatchUpView from "./Matchup"
import { TourData } from "../Popup/TourRequest"
import { usePopup } from "../Popup/PopupContext"
import { api } from "../../Service/ApiService"

interface TourRoomProps {
    width?: number
    display?: boolean
    onLeave?: () => void
    tourName: string
}

export const TourRoomPage: React.FunctionComponent<TourRoomProps> = (props: TourRoomProps) => {
    const { tourList, createTour, joinTour, getTourList, connect } = useLobby()
    const authenContext = useAuthen()
    const profile = useProfile()
    const { startTour, waitForStart } = useRoom(props.tourName)
    const [displayPopup, setPopupDisplay] = React.useState(false)
    const { leaveTourRoom, deleteThisTour } = useRoom(props.tourName)
    const [start, setStart] = React.useState(false)
    const popup = usePopup()
    const [creator, setCreator] = React.useState('')
    const [matchup, setMatchup] = React.useState({})

    React.useEffect(() => {
        popup.setTourName(props.tourName)
        api.getTourData(props.tourName)
            .then( response => {
                setCreator(response.data?.createBy)
            })
    }, [props.display])

    React.useEffect(()=> {
        waitForStart((table)=> {
            setMatchup(table['round0'])
            setStart(true)
        })
    }, [socket])

    return (
        <TourRoomContainer
            data-testid="tour-room-container"
            width={props.width ?? 0}
            hide={props.display ?? false}
        >
            <InnerContainer width={props.width ?? 0}>
                <div className="flex justify-between items-center">
                    <div className="self-start pt-4 pb-4  pl-8"><TitleText medium>{props.tourName}</TitleText></div>
                    <div style={{display: "flex", gap: "4px"}}>
                    <ButtonContainer>
                        <PrimarySqButton onClick={() => {
                            leaveTourRoom(authenContext.authen.username)
                            // window.history.back()
                            props.onLeave?.()
                        }}>Leave</PrimarySqButton>
                    </ButtonContainer>
                    {/* <ButtonContainer>
                        <PrimarySqButton onClick={() => {
                            startTour()
                        }}>Start</PrimarySqButton>
                    </ButtonContainer> */}
                    {
                        (profile.profile.access == "td" ) ? 
                        <ButtonContainer>
                            <PrimarySqButton onClick={() => {
                                startTour()
                            }}>Start</PrimarySqButton>
                        </ButtonContainer> :
                        <></>
                    }
                    </div>
                </div>
                {
                    start ? <MatchUpView matchup={matchup}/> : <PlayerList tourName={props.tourName} update={props.display ?? false}/>
                }
                <JoinRoomContainer>
                    <TextFieldNoWarning />
                    <div className="h-8 flex">
                        <SecondaryButton twstyle="h-8" onClick={() => {
                            
                        }}>COPY</SecondaryButton>
                        {
                            (profile.profile.access == "td" && authenContext.authen.username == creator) ? 
                            <>
                            <SecondaryButton twstyle="h-8" 
                                onClick={() => {
                                    // setPopupDisplay(true)
                                    
                                    popup.setDisplay(true)
                                    // console.log(popup)
                                }}>Edit</SecondaryButton>
                                <PrimaryButton 
                                style={{width: "150px"}}
                                onClick={()=> {
                                deleteThisTour(authenContext.authen.username, ()=>{})
                                leaveTourRoom(authenContext.authen.username)
                            }}>Delete Tour</PrimaryButton>
                            </>
                            : 
                            <></>
                        }
                        
                    </div>
                </JoinRoomContainer>
            </InnerContainer>
            {/* <CreateTourPopup 
                isVisible={displayPopup} 
                tourName={props.tourName}
                onDismiss={ ()=> {
                    setPopupDisplay(false)
                }
             } /> */}
        </TourRoomContainer>
    )
}

interface PlayerListProps {
    tourName: string
    update: boolean
}

const PlayerList = (props: PlayerListProps) => {
    const navContext = useNavigator()
    const {getUpdatedPlayerPair, playerPair} = useRoom(props.tourName)
    const playerPairs = playerPair.map( pair => pair)

    React.useEffect(()=> {
        // console.log("get from",props.tourName)
        
        // room.updatePlayerInWaiting()
    },[props.tourName])

    React.useEffect(()=> {
        // if (props.update) {
            getUpdatedPlayerPair()
        // }
    },[socket])

    return (
        <div style={PlayerListCss}>
            <PlayerListScroll>
                {
                    playerPair.map(pair => <PlayerListCell player_name1={pair.name ?? ""} player_name2={pair.name ?? ""} pair_name={''} />)
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
                {/* <TitleText>{props.pair_name.split('_')[1].toUpperCase()}</TitleText> */}
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
        --webkit-transform: translateX(0px);
        opacity: 0.5;
        transition: transform 0.3s, opacity 0.3s ease;
        --webkit-transition: transform 0.3s, opacity 0.3s ease;
    `}
    ${props=> props.hide && css`
        transform: translateX(-${props.width}px);
        --webkit-transform: translateX(-${props.width}px);
        opacity: 1;
        transition: transform 0.3s, opacity 0.3s ease;
        --webkit-transition: transform 0.3s, opacity 0.3s ease;
    `}
    /* z-index: -1; */
`

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
    justify-content: flex-start;
    align-content: flex-start;
    align-items: center ;
    gap: 15px;
    width: 100%;
    padding-right: 15px;
    height: 48px;
    background-color: rgba(255,255,255,0.6);
    backdrop-filter: blur(24px);
    --webkit-backdrop-filter: blur(24px);
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
