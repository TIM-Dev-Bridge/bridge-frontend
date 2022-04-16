import React from 'react'
import { NormalText, TitleText } from '../../components/Text/Text'
import { socket, useLobby, useRoom, useSocial } from '../../Service/SocketService'
import CSS from 'csstype'
import { useAuthen } from '../../Authen'
import styled from 'styled-components'

interface OnlineFriendsProps {
    tourName: string,
    display: boolean,
}

const OnlineFriends =(props: OnlineFriendsProps)=> {
    const friendsList : FriendProps[] = []
    const { updateFriends } = useSocial()
    // const friends : {[key: string] : FriendProps} = {}
    const [displayMode, updateDisplayMode] = React.useState("invite");
    const inviteRef = React.useRef<string[]>([])

    const {
        getPlayerInRoom ,
        watingPlayers, 
        updatePlayerInWaiting, 
        invitePlayer, 
        acceptInvite, 
        waitForInvitation,
        invitation,
        updateInvitation
    } = useRoom(props.tourName)
    const authContext = useAuthen()

    interface FriendObj {
        id: string
        img?: string,
        name: string,
        status?: string,
    }

    interface FriendResponse {
        id: string,
        name: string,
        status: string
    }

    React.useEffect(()=> {
        waitForInvitation((invitePlayer)=> {
            // console.log("invite by ", invitePlayer)
        })
    },[socket])

    React.useEffect(()=> {
        updatePlayerInWaiting()
        
    },[socket])

    return (
        <div style={ContainerCss} key="online-friends">
            <div className="flex">
                <div className="self-start pt-4 pb-4"><TitleText medium>Player in Waiting</TitleText></div>
            </div>
            {
                watingPlayers.includes(authContext.authen.username) ? <FriendBlock name={authContext.authen.username} displayMode="none" isWaiting={watingPlayers.includes(authContext.authen.username)}/> : <></>
            }
            {
                watingPlayers.filter(player=>player!=authContext.authen.username).map((player) => {
                    const displayMode = invitation.includes(player) ? "accept-invite" : "invite"
                    const isWaiting = watingPlayers.includes(authContext.authen.username)
                    return (
                        <FriendBlock 
                            name={player} 
                            onInvite={()=> {
                                // console.log(authContext.authen.username,"invite", player)
                                invitePlayer(authContext.authen.username, player)
                            }}
                            onAccept={()=> {
                                acceptInvite(player, authContext.authen.username)
                                updateInvitation([])
                            }}
                            displayMode={displayMode}
                            isWaiting={isWaiting}
                            />)
                })
            }
        </div>
    )
}

interface FriendProps {
    name: string,
    onInvite?: ()=>void
    onAccept?: ()=>void
    displayMode: string
    isWaiting: boolean
}

const FriendBlock =(props: FriendProps)=> {
    const authContext = useAuthen()

    const displayMode =(mode: string)=> {
        switch (mode) {
            case "invite":
                return <InviteButton onClick={props.onInvite}>Invite</InviteButton>
            case "accept-invite":
                return <AcceptButton onClick={props.onAccept}>Accept</AcceptButton>
        }
    }
    
    const displayButton =()=> {
        if (props.name == authContext.authen.username || !(props.isWaiting)) {
            return <></>
        } 
        return displayMode(props.displayMode)  
    }

    return (
        <div className="flex justify-between" data-testid="friends">
            {/* <img src={props.img} alt={props.name} /> */}
            <NormalText>{props.name}</NormalText>
            {
                props.name == authContext.authen.username ? <></> : displayButton()
            }
            
        </div>
    )
}

const ContainerCss: CSS.Properties = {
    // gridColumn: "2",
    height: "100%",
    display: "flex",
    flexDirection: "column"
}

const InviteButton = styled.button`
    color: var(--main-color-blue);
    font-size: medium;
    font-weight: 700;
`

const AcceptButton = styled.button`
    color: white;
    font-size: medium;
    font-weight: 700;
    background-color: var(--main-color-blue);
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 4px;
`


export default OnlineFriends;