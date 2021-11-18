import React from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { useAuthen } from '../../Authen'
import { PrimaryButton } from '../../components/Button/Button'
import { TitleText, NormalText } from '../../components/Text/Text'
import TextFieldNoWarning from '../../components/TextField/TextFieldNoWarning'
import { useLobby, useRoom } from '../../Service/SocketService'
import { IoMdSend } from 'react-icons/io'

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
    const [sendable, setSendable] = React.useState(false)

    const handleKeyDown = (event: { key: string }) => {
        if (event.key === 'Enter') {
            console.log("SUBMIT CAHT")
            sendMessage()
            setSendable(false)
        }
    }

    const handleOnChange =(event: React.FormEvent<HTMLInputElement>)=> {
        if (event.currentTarget.value.length > 0) {
            setSendable(true)
            return
        }
        setSendable(false)
    }

    const updateSessionChat = React.useCallback(()=> {
        console.log("udpate callback")
        
        updateTourChat((message)=> {
            const newMessage = [...messageRef.current, message]
            updatemessage(newMessage)
            var objDiv = document.getElementById(`tour-chat-bottom`)!;
            objDiv.scrollIntoView({ behavior: 'smooth', block: 'end'})
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
                        <div id="tour-chat-bottom" className="h-12"></div>
                    </ChatListInContainer>
                </ChatListOutContainer>
            </TitleAndChatContainer>
            <SendTextContainer onClick={()=>setSize(false)}> 
            <TextFieldNoWarning autoComplete="off" onChange={handleOnChange} name="tour-chat-input" onKeyUp={handleKeyDown}/>
                
                <SendButton 
                    sendable={sendable}
                    onClick={()=> {
                    console.log('send message')
                    sendMessage()
                    console.log(messages)
                }}>
                    <SendIcon />
                </SendButton>
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
        transform: translateY(55vh);
        --webkit-transform: translateY(55vh);
        transition: transform 0.3s;
        --webkit-transition: transform 0.3s;
        z-index: -1;
    `}
    ${props=> !props.hide && css`
        transform: translateY(0px);
        --webkit-transform: translateY(0px);
        transition: transform 0.3s;
        --webkit-transition: transform 0.3s;
        z-index: 1;
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
        --webkit-transition: height 0.3s;
    `}
    ${props=> !props.hide && css`
        height: 40vh;
        transition: height 0.3s;
        --webkit-transition: height 0.3s;
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
    --webkit-backdrop-filter: blur(24px);
    position: absolute;
    bottom: 0;
    height: 3rem;
    box-sizing: border-box;
    width: calc(100%);
    padding-left: 15px;
    padding-right: 15px;
`

const SendIcon = styled(IoMdSend)`
    color: white;
    opacity: 0;
    transition: width 1s;
    --webkit-transition: width 1s;
`

const SendButton = styled.button<{sendable: boolean}>`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 0px;
    height: 0px;
    transition: width 0.3s ease, height 0.3s ease;
    --webkit-transition: width 0.15s ease, height 0.3s ease;
    background-color: rgba(59, 130, 246, 1);
    border-radius: 16px;
    ${props=>props.sendable && css`
        width: 60px;
        height: 32px;
        --webkit-transition: width 0.3s ease, height 0.3s ease;
        transition: width 0.3s ease, height 0.3s ease;
        ${SendIcon} {
            opacity: 1;
            transition: width 1s;
            --webkit-transition: width 1s;
        }
    `}
`

export default TourChat;
