import React, { HTMLAttributes } from 'react'
import { useAuthen } from '../../Authen'
import { SecondaryButton } from '../../components/Button/Button'
import { TitleText } from '../../components/Text/Text'
import TextFieldNoWarning from '../../components/TextField/TextFieldNoWarning'
import { useLobby } from '../../Service/SocketService'
import Chat from './components/ChatBox'
import OnlineFriends from './components/OnlineFriends'
import CSS from 'csstype';
import { useNavigator } from '../../components/Router/Router'
import styled, { css } from 'styled-components'
import { TourRoomPage } from '../TourRoom/TourRoom'
import { motion } from 'framer-motion'
import TourChat from '../TourRoom/TourChat'
import BackButton from './components/BackButton'

export const LobbyPage: React.FunctionComponent = () => {
    const { socket, tourList, createTour, joinTour, getTourList, connect, updateChat, sendMessageToLobbyChat } = useLobby()
    const authenContext = useAuthen()
    const [windowSize, setWindowSize] = React.useState(500)
    const [displayTourRoom, setDisplayTourRoom] = React.useState(false)
    const sizeRef = React.useRef(windowSize)
    const [tourName, setTourName] = React.useState('');

    var resizeTimer: NodeJS.Timeout;

    React.useEffect(() => {
        setWindowSize((document.querySelector(`div[id='lobby-window'`) as HTMLElement).clientWidth ?? 0)
        connect(authenContext.authen.token, authenContext.authen.username)
        console.log("connect to socket")
    }, [socket])

    React.useEffect(() => {
        getTourList()
    }, [])

    React.useEffect(() => {
        updateChat((message) => {
            console.log(message)
        })
    }, [])

    React.useEffect(() => {
        sizeRef.current = windowSize
    }, [windowSize])

    React.useEffect(() => {
        window.addEventListener('resize', (event) => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                let element = (document.querySelector(`div[id='lobby-window'`) as HTMLElement)
                if (element === null || element === undefined) { return }
                setWindowSize((document.querySelector(`div[id='lobby-window'`) as HTMLElement).clientWidth ?? 0)
            }, 100)
        })
    }, [])

    return (
        <CenterContainer>
            <BackButton display={displayTourRoom}/>
        <GridContainer>
            <InnerContainer id="lobby-window">
                <Stack>
                    <LobbyContainer
                    hide={!displayTourRoom}
                        // variants={LobbyVariants}
                        // animate={displayTourRoom? "hide" : "show"}
                        >
                        <div className="flex">
                            <div className="self-start pt-4 pb-4 pl-8"><TitleText medium>Available Match</TitleText></div>
                        </div>
                        <Lobby tours={tourList} onJoinTourRoom={(tourName, success) => {
                            if (success) {
                                setTourName(tourName)
                                setDisplayTourRoom(true)
                            }
                        }} />
                    </LobbyContainer>
                    <TourRoomPage tourName={tourName} width={windowSize} display={displayTourRoom} onLeave={() => setDisplayTourRoom(false)} />
                </Stack>
                <JoinRoomContainer 
                    // variants={JoinRoomContainerVariants}
                    // animate={displayTourRoom ? "hide" : "show"}
                    display={displayTourRoom}
                    >
                    <TextFieldNoWarning />
                    <div className="h-8">
                        <SecondaryButton twstyle="h-8" onClick={() => {
                            createTour("testtest", (success, reason) => {
                                if (success) {
                                    console.log(success, reason)
                                }
                            })
                        }}>Join</SecondaryButton>
                    </div>
                </JoinRoomContainer>
            </InnerContainer>
            <div style={LeftSideBox}>
                <OnlineFriends />
                <Chat display={displayTourRoom}/>
                <TourChat display={!displayTourRoom} tourName={tourName}/>
            </div>
        </GridContainer>
        </CenterContainer>
    )
}

interface LobbyProps extends HTMLAttributes<HTMLElement> {
    tours: LobbyListProps[]
    onJoinTourRoom: (tourName: string, success: boolean) => void
}

const Lobby: React.FunctionComponent<LobbyProps> = (props: LobbyProps) => {
    const { tourList, createTour, joinTour, getTourList, connect } = useLobby()
    const authContext = useAuthen()
    const navContext = useNavigator()
    return (
        <LobbyList>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Host</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Players</th>
                        <th>Host</th>
                    </tr>
                </thead>
                {
                    props.tours.map((tour) => <LobbyListTr {...tour} onClick={() => {
                        console.log("JOIN", tour.title)
                        props.onJoinTourRoom(tour.title,true)
                        joinTour(authContext.authen.username, tour.title, (success) => {
                            console.log(success)
                            if (success) {
                                // navigate(navContext, '/tour-room', {roomID: tour.title})
                            }
                        })
                    }} />)
                }
            </table>
        </LobbyList>
    )
}

interface LobbyListProps extends HTMLAttributes<HTMLTableSectionElement> {
    host: string,
    title: string,
    type: string,
    players: string,
}

const LobbyListTr = (props: LobbyListProps) => {
    return (
        <tbody onClick={props.onClick} style={{ borderBottom: "0.1px solid #e6e6e6", height: "50px", cursor: "pointer" }} >
            <tr >
                <td>{props.host}</td>
                <td>{props.title}</td>
                <td>{props.type}</td>
                <td>{props.players}</td>
                <td>{props.host}</td>
            </tr>
        </tbody>
    )
}

const CenterContainer = styled.div`
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;
`


const GridContainer = styled.div`
    display:grid;
    gap: 10px;
    grid-template-columns: 2fr 1fr;
    height: 95%;
    width: 95%;
    min-width: "800px";
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 15px;
    margin: 0 auto;
    background-color: white;
`

const InnerContainer = styled(motion.div)`
    position: relative;
    width: "100%";
    overflow: hidden;
    border-right: 0.5px solid #e6e6e6;
`
const LobbyContainer = styled.div<{hide: boolean}>`
    height: 100%;
    width: 100%;
    ${props=> props.hide && css`
        transform: translateX(0px);
        --webkit-transform: translateX(0px);
        opacity: 1;
        transition: transform 0.3s, opacity 0.1s;
        --webkit-transition: transform 0.3s, opacity 0.1s;
    `}
    ${props=> !props.hide && css`
        transform: translateX(-50px);
        --webkit-transform: translateX(-50px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.1s;
        --webkit-transition: transform 0.3s, opacity 0.1s;
    `}
`

const LobbyList = styled.div`
    /* grid-column: 1; */
    height: 100%;
    width: 100%;
`


const JoinRoomContainer = styled(motion.div)<{display: boolean}>`
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
    --webkit-backdrop-filter: blur(24px);
    transform: translateY(${props=>props.display ? "50px" : "0px"});
    --webkit-transform: translateY(${props=>props.display ? "50px" : "0px"});
    transition: transform 0.2s;
    --webkit-transition: transform 0.2s;
`

const JoinRoomContainerVariants = {
    show: {y: 0},
    hide: {y: 48}
}

const LeftSideBox: CSS.Properties = {
    position: "relative",
    height: "100%"
}

const Stack = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
`

const LobbyVariants = {
    hide: {x: -50, opacity: 0},
    show: {x: 0, opacity: 1}
}