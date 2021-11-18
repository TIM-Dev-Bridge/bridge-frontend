import React from 'react'
import { NormalText, TitleText } from '../../../components/Text/Text'
import { useLobby, useSocial } from '../../../Service/SocketService'
import CSS from 'csstype'

interface OnlineFriendsProps {

}

const OnlineFriends =(props: OnlineFriendsProps)=> {
    const friendsList : FriendProps[] = []
    const { updateFriends } = useSocial()
    const friends : {[key: string] : FriendProps} = {}

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

    const updateCurrentFriend =()=> {
        updateFriends((friend: FriendResponse)=> {
            const updatedFriend = {
                id: friend.id,
                img: "",
                name: friend.name,
                status: friend.status
            }
            friends[friend.id] = updatedFriend
        })
    }

    React.useEffect(()=> {
        updateCurrentFriend()
    },[])

    return (
        <div style={ContainerCss}>
            <div className="flex">
                <div className="self-start pt-4 pb-4"><TitleText medium>Online Friends</TitleText></div>
            </div>
            {
                Object.keys(friends).map((friend)=> <FriendBlock {...friends[friend]}/>)
            }
        </div>
    )
}

interface FriendProps {
    id: string
    img?: string,
    name: string,
    status?: string,
}

const FriendBlock =(props: FriendProps)=> {
    return (
        <div className="flex">
            <img src={props.img} alt={props.name} />
            <NormalText>{props.name}</NormalText>
        </div>
    )
}

const ContainerCss: CSS.Properties = {
    // gridColumn: "2",
    height: "100%"
}

export default OnlineFriends;