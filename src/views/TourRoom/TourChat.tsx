import React from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { useAuthen } from '../../Authen'
import { PrimaryButton } from '../../components/Button/Button'
import { TitleText, NormalText } from '../../components/Text/Text'
import TextFieldNoWarning from '../../components/TextField/TextFieldNoWarning'
import { useLobby, useRoom } from '../../Service/SocketService'

interface ChatProps {
    display: boolean
    tourName: string
}

const TourChat =(props: ChatProps)=> {
    const [messages, updatemessage] = React.useState<{sender: string, message: string}[]>([])
    const {socket } = useLobby()
    const { updateTourChat, sendMessageToTourChat } = useRoom(props.tourName)
    const messageRef = React.useRef<{sender: string, message: string}[]>([])
    const [minimize, setSize] = React.useState(false)

    const updateSessionChat = React.useCallback(()=> {
        console.log("udpate callback")
        
        updateTourChat((message)=> {
            const newMessage = [...messageRef.current, message]
            updatemessage(newMessage)
        })
    },[messages])

    React.useEffect(()=> {
        messageRef.current = messages
    },[messages])

    React.useEffect(()=> {
        if (!props.display) {
            updatemessage([])
        }
    }, [props.display])

    const authContext = useAuthen()

    const sendMessage =()=> {
        
        const message = (document.querySelector(`input[name='tour-chat-input'`)as HTMLInputElement).value
        if (message == undefined) { return }
        const messageToSend = {
            sender: authContext.authen.username,
            message: message
        }
        console.log("SEND MESSAGE TO : ", messageToSend)
        if (message.length > 0) {
            (document.querySelector(`input[name='tour-chat-input'`)as HTMLInputElement).value = ""
            console.log(":=> send message to lobby >>>", message)
            sendMessageToTourChat(messageToSend.sender, props.tourName, messageToSend.message)
        }
    }

    React.useEffect(()=> {
        updateSessionChat()
    }, [socket])

    return (
        <ChatContainer hide={props.display}>
            <TitleAndChatContainer>
                <TitleContainer onClick={()=> {setSize(!minimize)}}>
                    <div className="flex">
                        <div className="self-start pt-4 pb-4"><TitleText medium>Tournament Chat</TitleText></div>
                    </div>
                </TitleContainer>
                <ChatListOutContainer 
                    hide={minimize}
                    >
                    <ChatListInContainer>
                        {
                            messages.map((message: MessageLineProps, i)=> <MessageLine {...message} key={i}/>)
                        }
                        <div className="h-12"></div>
                    </ChatListInContainer>
                </ChatListOutContainer>
            </TitleAndChatContainer>
            <SendTextContainer onClick={()=>setSize(false)}> 
                <TextFieldNoWarning  name="tour-chat-input" />
                <PrimaryButton twstyle="h-8" onClick={()=> {
                    console.log('send message')
                    sendMessage()
                    console.log(messages)
                }}>Send</PrimaryButton>
            </SendTextContainer>
        </ChatContainer>
    )
}

interface MessageLineProps {
    sender: string
    message: string
}

const MessageLine =(props: MessageLineProps)=> {
    const authContext = useAuthen()

    return (
        <div style={{display: "flex", justifyContent: props.sender == authContext.authen.username ? "end" : "start"}}>
            {
                props.sender == authContext.authen.username ? <></> : <NormalText>{props.sender}</NormalText>
            }
            <div className={`${props.sender == authContext.authen.username ? "bg-green-300" : "bg-blue-300"} rounded-xl pl-4 pr-4 text-left pt-2 pb-2`}>
                <NormalText bold textColor="text-white">{props.message}</NormalText>
            </div>
        </div>
    )
}

const ChatContainer = styled.div<{hide: boolean}>`
    width: 100%;
    position: absolute;
    bottom: 0;
    padding-top: 20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    ${props=> props.hide && css`
        transform: translateY(50vh);
        transition: transform 0.3s;
    `}
    ${props=> !props.hide && css`
        transform: translateY(0px);
        transition: transform 0.3s;
    `}
`

const TitleAndChatContainer = styled.div`
    padding-left: 15px;
    padding-right: 15px;
`

const TitleContainer = styled.div`
    align-self: flex-start;
`

const ChatListOutContainer = styled(motion.div)<{hide: boolean}>`
    overflow: scroll;
    ${props=> props.hide && css`
        height: 48px;
        transition: height 0.3s;
    `}
    ${props=> !props.hide && css`
        height: 25vh;
        transition: height 0.3s;
    `}
`

const ChatListInContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const SendTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 4px;
    background-color: rgba(255,255,255,0.6);
    backdrop-filter: blur(24px);
    position: absolute;
    bottom: 0;
    height: 3rem;
    box-sizing: border-box;
    width: calc(100%);
    padding-left: 15px;
    padding-right: 15px;
`
const variants = {
    minimize: { height: "48px"},
    maximize: {height: "30vh"}
}

export default TourChat;
