import React from 'react'
import styled, { css }  from 'styled-components'
import BackButton from '../Lobby/components/BackButton'
import { motion } from 'framer-motion'
import { profile } from 'console'
import { SecondaryButton } from '../../components/Button/Button'
import { TitleText } from '../../components/Text/Text'
import TextFieldNoWarning from '../../components/TextField/TextFieldNoWarning'
import Chat from '../Lobby/components/ChatBox'
import OnlineFriends from '../Lobby/components/OnlineFriends'
import TourChat from '../TourRoom/TourChat'
import { TourRoomPage } from '../TourRoom/TourRoom'
import { useProfile } from '../UserProfile/ProfileContext'
import { usePopup } from '../Popup/PopupContext'
import { ChatChanelType, ChatUseCase } from '../../Chat/ChatUseCases'
import { useAuthen } from '../../Authen'

interface DefaultPageProps {
    title: string
    leftSideContainer: JSX.Element
    displayTourRoom: boolean
    hiddenContainer?: JSX.Element
    rightSideContainer?: JSX.Element
    bottomContainer?: JSX.Element
}

const DefaultPage =(props: DefaultPageProps)=> {
    const profile = useProfile()
    const popup = usePopup()
    const authen = useAuthen()
    return (
        <CenterContainer>
            <BackButton display={false} />
            <GridContainer>
                <InnerContainer id="lobby-window">
                    <Stack>
                        <LobbyContainer
                            hide={!props.displayTourRoom}
                        >
                            <div className="flex">
                                <div className="self-start pt-4 pb-4 pl-8"><TitleText medium>{props.title}</TitleText></div>
                            </div>
                            {props.leftSideContainer}
                        </LobbyContainer>
                        {props.hiddenContainer}
                    </Stack>
                    <JoinRoomContainer
                        display={props.displayTourRoom}
                    >
                        {/* <TextFieldNoWarning />
                        <div className="h-8 flex">
                            <SecondaryButton twstyle="h-8" onClick={() => {
                            }}>Join</SecondaryButton>

                            {
                                profile.profile.access == "user" ?
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
                        </div> */}
                        {props.bottomContainer}
                    </JoinRoomContainer>
                </InnerContainer>
                <RightSideBox>
                    {/* <OnlineFriends display={props.displayTourRoom} tourName={tourName} /> */}
                    {/* <Chat display={props.displayTourRoom} /> */}
                    {/* <TourChat display={!props.displayTourRoom} 
                        sendMessageUseCase={new ChatUseCase(ChatChanelType.lobby).getSendMessageToLobbyUseCase(authen.authen.username)}
                        updateChatUseCase={new ChatUseCase(ChatChanelType.lobby).getUpdateMessageUseCase()}/> */}
                    {props.rightSideContainer}
                </RightSideBox>
            </GridContainer>
        </CenterContainer>
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


const LogContainer = styled.div`
    display: flex;
    flex-direction: column;
    
`

export default DefaultPage;