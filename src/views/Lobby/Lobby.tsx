import React, { HTMLAttributes } from 'react'
import { useAuthen } from '../../Authen'
import { PrimaryButton, SecondaryButton } from '../../components/Button/Button'
import { TitleText } from '../../components/Text/Text'
import TextFieldNoWarning from '../../components/TextField/TextFieldNoWarning'
import { useLobby } from '../../Service/SocketService'
import Chat from '../../components/Chatbox/ChatBox'
import OnlineFriends from '../../components/OnlineFriends/OnlineFriends'
import { useNavigator } from '../../components/Router/Router'
import styled, { css } from 'styled-components'
import { TourRoomPage } from '../TourRoom/TourRoom'
import { motion } from 'framer-motion'
import TourChat from '../TourRoom/TourChat'
import BackButton from './components/BackButton'
import { useProfile } from '../UserProfile/ProfileContext'
import { usePopup } from '../Popup/PopupContext'
import { ChatChanelType, ChatUseCase } from '../../Chat/ChatUseCases'

export const LobbyPage: React.FunctionComponent = () => {
    const { socket, tourList, createTour, joinTour, getTourList, connect, updateChat, sendMessageToLobbyChat, getUpdatedTourList } = useLobby()
    const authenContext = useAuthen()
    const [windowSize, setWindowSize] = React.useState(500)
    const [displayTourRoom, setDisplayTourRoom] = React.useState(false)
    const sizeRef = React.useRef(windowSize)
    const [tourName, setTourName] = React.useState('');
    const profile = useProfile()
    const popup = usePopup()
    const sendMessageUseCase = new ChatUseCase(ChatChanelType.tour).getSendMessageUseCase(authenContext.authen.username,tourName)
    var resizeTimer: NodeJS.Timeout;

    React.useEffect(() => {
        setWindowSize((document.querySelector(`div[id='lobby-window'`) as HTMLElement).clientWidth ?? 0)
        connect(authenContext.authen.token, authenContext.authen.username)
        // console.log("connect to socket")

        getUpdatedTourList()
    }, [socket])

    React.useEffect(() => {
        getTourList()
        // let tourName = window.history.state.
        console.log("QUERY", window.location.search)
        connect(authenContext.authen.token, authenContext.authen.username)
        if (window.location.search.includes('?')) {
            let tourName = window.location.search.replace("?","")
            console.log("TOURNAME", tourName)
            joinTour(authenContext.authen.username, tourName, (success) => {
                setTourName(tourName)
                setDisplayTourRoom(true)
            })
            
        }
    }, [])

    // React.useEffect(() => {
    //     updateChat((message) => {
    //         console.log(message)
    //     })
    // }, [])

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

    // React.useEffect(()=> {
    //     socket.on('invite-by', (player_name: string)=> {
    //         console.log("got invite by", player_name)
    //         // onInvited(player_name)
    //         // updateInvitation([...invitation, player_name])
    //     })
    // })

    return (
        <CenterContainer>
            <BackButton display={displayTourRoom} />
            <GridContainer>
                <InnerContainer id="lobby-window">
                    <Stack>
                        <LobbyContainer
                            hide={!displayTourRoom}
                        >
                            <div className="flex">
                                <div className="self-start pt-4 pb-4 pl-8"><TitleText medium>Available Match</TitleText></div>
                            </div>
                            <Lobby tours={tourList} onJoinTourRoom={(tourName, success) => {
                                if (success) {
                                    console.log("TOURNAME", tourName)
                                    setTourName(tourName)
                                    setDisplayTourRoom(true)
                                }
                            }} />
                        </LobbyContainer>
                        <TourRoomPage tourName={tourName} width={windowSize} display={displayTourRoom} onLeave={() => setDisplayTourRoom(false)} />
                    </Stack>
                    <JoinRoomContainer
                        display={displayTourRoom}
                    >
                        <div className="h-8 flex" style={{width:"100%", paddingRight:"50%"}}>
                            <TextFieldNoWarning placeholder='Tournament-ID'/>
                            <SecondaryButton twstyle="h-8" onClick={() => {
                                // createTour("testtest", (success, reason) => {
                                //     console.log(success, reason)
                                //     if (success) {
                                //         console.log(success, reason)
                                //     }
                                // })
                            }}>Join</SecondaryButton>
                        </div>
                        <div className="h-8 flex">

                            {
                                profile.profile.access == "td" ?
                                    <>
                                        <SecondaryButton twstyle="h-8"
                                            onClick={() => {
                                                // setPopupDisplay(true)

                                                popup.setDisplay(true)

                                            }}>Create</SecondaryButton>
                                    </>
                                    :
                                    <></>
                            }
                        </div>
                    </JoinRoomContainer>
                </InnerContainer>
                <RightSideBox>
                    <OnlineFriends display={displayTourRoom} tourName={tourName} />
                    <Chat display={displayTourRoom} 
                        sendMessageUseCase={new ChatUseCase(ChatChanelType.lobby).getSendMessageToLobbyUseCase(authenContext.authen.username)}
                        updateChatUseCase={new ChatUseCase(ChatChanelType.lobby).getUpdateMessageUseCase()}/>
                    <TourChat 
                        display={!displayTourRoom} 
                        tourName={tourName} 
                        sendMessageUseCase={sendMessageUseCase}
                        updateChatUseCase={new ChatUseCase(ChatChanelType.tour).getUpdateMessageUseCase()}/>
                </RightSideBox>
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

    React.useEffect(()=> {
        console.log("FIRST ", props.tours[0])
    }, [])

    // const mockTours: LobbyListProps[] = [
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     },
    //     {
    //         host: "string",
    //         title: "string",
    //         type: "string",
    //         players: "string",
    //     }
    // ]

    return (
        <LobbyList>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Host</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Players</th>
                        <th>status</th>
                    </tr>
                </thead>
                {
                    props.tours.filter(tour=>tour.mode == 'online').map((tour, i) => <LobbyListTr key={i} {...tour} onClick={() => {
                        if (tour.status == "Pending") {
                            console.log("JOIN", tour.title)
                            props.onJoinTourRoom(tour.title, true)
                            joinTour(authContext.authen.username, tour.title, (success) => {
    
                            })
                            return
                        }

                        if (tour.status == "Playing") {

                            return
                        }

                        if (tour.status == "Ending") {

                            return
                        }
                        
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
    mode: string,
    status: string
}

const LobbyListTr = (props: LobbyListProps) => {
    return (
        <tbody data-testid="tbody-list" onClick={props.onClick} style={{ borderBottom: "0.1px solid #e6e6e6", height: "50px", cursor: "pointer" }} >
            <tr >
                <td>{props.host}</td>
                <td>{props.title}</td>
                <td>{props.type}</td>
                <td>{props.players}</td>
                <td>{props.status}</td>
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
    position: absolute;
    top: 5px;
    gap: 10px;
    grid-template-columns: 2fr 1fr;
    height: 95%;
    width: 95%;
    min-height: 720px;
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
    width: 100%;
    overflow: hidden;
    border-right: 0.5px solid #e6e6e6;
`
const LobbyContainer = styled.div<{ hide: boolean }>`
    height: 100%;
    width: 100%;
    ${props => props.hide && css`
        transform: translateX(0px);
        --webkit-transform: translateX(0px);
        opacity: 1;
        transition: transform 0.3s, opacity 0.1s;
        --webkit-transition: transform 0.3s, opacity 0.1s;
    `}
    ${props => !props.hide && css`
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
    overflow: auto;
    padding-bottom: 30px;
`


const JoinRoomContainer = styled(motion.div) <{ display: boolean }>`
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
    transform: translateY(${props => props.display ? "50px" : "0px"});
    --webkit-transform: translateY(${props => props.display ? "50px" : "0px"});
    transition: transform 0.2s;
    --webkit-transition: transform 0.2s;
`

const JoinRoomContainerVariants = {
    show: { y: 0 },
    hide: { y: 48 }
}

const RightSideBox = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
`

const Stack = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
`

const LobbyVariants = {
    hide: { x: -50, opacity: 0 },
    show: { x: 0, opacity: 1 }
}