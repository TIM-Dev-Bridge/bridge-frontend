import React from 'react'
import styled from 'styled-components'
import { socket } from '../../Service/SocketService'
import { usePlayState } from '../PlayingContext/PlayingContext'
import BiddingControl from './BiddingCotrol'
import { useBidding } from './UseBidding'
import BsSuitSpade, { BsSuitClub, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill, BsSuitSpadeFill } from 'react-icons/bs'

const BiddingPage =()=> {
    return (
        <BidContainer>
            <BiddingTable />
            <BiddingControl />
        </BidContainer>
    )
}

const BiddingTable =()=> {
    const {subscribePlayingStatus} = useBidding()
    const [bidItems, setBidItems] = React.useState<JSX.Element[]>([])
    const bidItemsRef = React.useRef(bidItems)
    const playState = usePlayState()

    React.useEffect(()=> {
        bidItemsRef.current = bidItems
    }, [bidItems])

    React.useEffect(()=> {
        subscribePlayingStatus((status)=> {
            handleBidding(status)
            handlePlaying(status)
        })
    }, [socket])

    const handleBidding =(status: {[key: string]: any})=> {
        if (status['status'] == 'waiting_for_bid') {
            if (playState.playState.status != 'waiting_for_bid') {
                playState.updatePlayState({
                    ...playState.playState, status: 'waiting_for_bid'
                })
            }

            if (status['payload'].hasOwnProperty('contract')) {
                // setCurrentBid(status['payload']['contract'])
                if ((status['payload']['contract'] == -1 || status['payload']['contract'] == 0) && bidItemsRef.current.length == 0) { return }
                const newItems = bidItemsRef.current.map(item => item)
                const component = stringToComponent(numToString(status['payload']['contract']))
                const element = <>{component[0]}{component[1]}</>
                newItems.push(<BidItem>{element}</BidItem>)
                setBidItems(newItems)
                console.log("Set current Bid")
            }
            else {
                // setLvlToBid(lvlToBid())
            }
        }
    }

    const handlePlaying =(status: {[key: string]: any})=> {
        if (status['status'] == 'initial_playing') {
            if (status['payload'].hasOwnProperty('contract')) {
                // setCurrentBid(status['payload']['contract'])
                if ((status['payload']['contract'] == -1 || status['payload']['contract'] == 0) && bidItemsRef.current.length == 0) { return }
                const newItems = [...bidItemsRef.current]
                newItems.push(<BidItem>{status['payload']['contract']}</BidItem>)
                setBidItems(newItems)
                console.log("Set current Bid")
            }
            else {
                // setLvlToBid(lvlToBid())
            }
        }
    }

    const numToString =(contract: number)=> {
        const dict: {[key:number]: string} = {
            1: 'C',
            2: 'D',
            3: 'H',
            4: 'S',
            0: 'NT'
        }
        const level: Number = Math.floor(((contract - 1) / 5) + 1)
        const suite = contract % 5
        var bidString = level.toString() + "_" + dict[suite]
        if (contract == -1) {
            return "PASS"
        }
        if (contract == 99) {
            return "DOUBLE"
        }
        return bidString
    }

    const stringToComponent =(str: string)=> {
        const level = str.split("_")[0]
        const suit = str.split("_")[1]
        const img: {[key:string]: JSX.Element} = {
            "C": <BsSuitClub/>,
            "S": <BsSuitSpadeFill />,
            "D": <BsSuitDiamondFill />,
            "H": <BsSuitHeartFill />
        }
        var element = img[suit]
        if (suit == "PASS" || suit == "NT" || suit == "DOUBLE") {
            return [level, suit]
        }
        return [level, element]
    }
    
    return (
        <Container>
            <HeaderItem>North</HeaderItem>
            <HeaderItem>East</HeaderItem>
            <HeaderItem>West</HeaderItem>
            <HeaderItem>South</HeaderItem>
            {
                bidItems
            }
            {/* <BidItem>1</BidItem>
            <BidItem>2</BidItem>
            <BidItem>3</BidItem>
            <BidItem>4</BidItem>
            <BidItem>5</BidItem>
            <BidItem>6</BidItem> */}
        </Container>
    )
}

const BidContainer = styled.div`
    /* min-height: calc(100vh - 56px); */
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: rgba(200, 200, 200, 0.4);
    /* backdrop-filter: blur(24px); */
    gap: 10px;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: 60px;
    box-shadow: var(--app-shadow);
    gap: 1px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    overflow: hidden;
    min-width: 800px;
    min-height: 400px;
`

const HeaderItem = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
`

const BidItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-color: white;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: var(--app-shadow);
    margin-bottom: 10px;
    height: 50px;
`

export default BiddingPage;