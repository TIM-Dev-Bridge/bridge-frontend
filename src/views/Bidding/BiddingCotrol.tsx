import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import BsSuitSpade, { BsSuitClub, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill, BsSuitSpadeFill } from 'react-icons/bs'
import { BiddingRequest, useBidding } from './UseBidding'
import { socket } from '../../Service/SocketService'
import { usePlayState } from '../PlayingContext/PlayingContext'
import { useAuthen } from '../../Authen'

const BiddingControl =()=> {
    const initLevel = [false, false, false, false, false, false, false]
    const initSuite : {[key: string] : boolean} = {
        'S' : false,
        'H' : false,
        'D' : false,
        'C' : false,
        'NT' : false,
    }
    // const [bidableLvl, setLvlToBid] = React.useState(initLevel)
    const [bidableSuite, setSuiteToBid] = React.useState(initSuite)
    const [selectedSuite, setSelectedSuite] = React.useState(initSuite)
    // const [selectedLevel, setSelectedLevel] = React.useState(initLevel)
    const [selectedLevel, setSelectedLevel] = React.useState<number|null>(null)
    // const [currentBid, setCurrentBid] = React.useState(-1)
    // const [bidable, setBidable] = React.useState(false)
    // const [doubleEnable, setDoubleEnable] = React.useState(false)
    // const [isInitial, setInitial] = React.useState(true)
    // const [bidCount, setBidCount] = React.useState(-1)
    // const [isDoubled, setIsDoubled] = React.useState(false)

    const {
        bid,
        updateCard,
        updateCardOpposite,
        subscribePlayingStatus
    } = useBidding()

    const playState = usePlayState()
    const authen = useAuthen()

    interface BiddingState {
        rBidableLvl: boolean[],
        rBidableSuite: boolean[],
        rSelectedSuite: boolean[],
        rSelectedLevel: number | null,
        rCurrentBid: number,
        rBidable: boolean,
        rDoubleEnable: boolean,
        rIsInitial: boolean,
        rBidCount: number,
        rIsDouble: boolean,
      }
    
    const initialBiddingStates = {
        rBidableLvl: initLevel,
        rBidableSuite: initLevel,
        rSelectedSuite: initLevel,
        rSelectedLevel: null,
        rCurrentBid: -1,
        rBidable: false,
        rDoubleEnable: false,
        rIsInitial: true,
        rBidCount: -1,
        rIsDouble: false,
    }

    enum ActionType {
        BIDABLE_UPDATE = 'bidableUpdate',
        DOUBLE_ENABLE_UPDATE = 'doubleEnableUpdate',
        DEFAULT_BIDDING = 'defaultBidding',
        BIDCOUNT_INCREMENT = 'bidcountIncrement',
        FIRST_PLAYED = 'firstPlayed',
        PREV_DOUBLED = 'prevDoubled',
        NO_CONTRACT = 'noContract'
    }

    type Action = |
        {
            type: ActionType.BIDABLE_UPDATE,
            payload: boolean,
        } |
        {
            type: ActionType.DOUBLE_ENABLE_UPDATE,
            payload: boolean,
        } | 
        {
            type: ActionType.DEFAULT_BIDDING,
            payload: {
                currentBid: number,
                lvlToBid: boolean[],
            }
        } |
        {
            type: ActionType.BIDCOUNT_INCREMENT,
        } |
        {
            type: ActionType.FIRST_PLAYED,
        } |
        {
            type: ActionType.PREV_DOUBLED,
        } |
        {
            type: ActionType.NO_CONTRACT,
            payload: {
                lvlToBid: boolean[],
            }
        }

    function biddingReducer(state: BiddingState, action: Action): BiddingState {
        switch (action.type) {
        case ActionType.BIDABLE_UPDATE: {
            return {...state, rBidable: action.payload}
        }
        case ActionType.DOUBLE_ENABLE_UPDATE: {
            return {...state, rDoubleEnable: action.payload}
        }
        case ActionType.DEFAULT_BIDDING: {
            return {...state, rCurrentBid: action.payload.currentBid, rBidableLvl: action.payload.lvlToBid}
        }
        case ActionType.BIDCOUNT_INCREMENT: {
            return {...state, rBidCount: state.rBidCount + 1}
        }
        case ActionType.FIRST_PLAYED: {
            return {...state, rIsInitial: false}
        }
        case ActionType.PREV_DOUBLED: {
            return {...state, rIsDouble: state.rBidCount == 99 ? true : false}
        }
        case ActionType.NO_CONTRACT: {
            return {...state, rBidableLvl: action.payload.lvlToBid}
        }
        default: {
            throw new Error(`Unhandled action type - ${JSON.stringify(action)}`);
        }
        }
    }

    const [biddingStates, biddingDispatch] = React.useReducer(biddingReducer, initialBiddingStates) 

    React.useEffect(()=> {
        console.log("BIDDING PAGE")
        subscribePlayingStatus((status)=> {
            console.log("STATUS AND PAYLOAD", status, status['payload']['nextDirection'] == playState.playState.direction)
            biddingDispatch({
                type: ActionType.BIDABLE_UPDATE,
                payload: status['payload']['nextDirection'] == playState.playState.direction,
            })
            // setBidable(status['payload']['nextDirection'] == playState.playState.direction)
            if (status['payload'].hasOwnProperty('contract')) {
                // console.log(isInitial)
                // if (isInitial) {
                //     setInitial(false)
                // } else {
                    
                // }
                biddingDispatch({
                    type: ActionType.DOUBLE_ENABLE_UPDATE,
                    payload: status['payload']['doubleEnable'],
                })
                // setDoubleEnable(status['payload']['doubleEnable'])
                let currentBid = status['payload']['contract']
                if (currentBid != -1 && currentBid != 99) {
                    console.log("Current Bid", currentBid)
                    biddingDispatch({
                        type: ActionType.DEFAULT_BIDDING,
                        payload: {
                            currentBid: status['payload']['contract'],
                            lvlToBid: lvlToBidFrom(status['payload']['contract']),
                        },
                    })
                    // setCurrentBid(status['payload']['contract'])
                    // setLvlToBid(lvlToBidFrom(status['payload']['contract']))
                } 
                biddingDispatch({type: ActionType.BIDCOUNT_INCREMENT})
                // setBidCount(prev => prev + 1)
                // console.log(bidCount)
                biddingDispatch({type: ActionType.FIRST_PLAYED})
                // if (bidCount >= 0) {
                //     setInitial(false)
                // }

                biddingDispatch({type: ActionType.PREV_DOUBLED})
                // if (currentBid == 99) {
                //     setIsDoubled(true)
                // }
                // else {
                //     setIsDoubled(false)
                // }
            }
            else {
                biddingDispatch({type: ActionType.NO_CONTRACT, payload: {lvlToBid: lvlToBid()}})
                // setLvlToBid(lvlToBid())
            }
        })
    // }, [socket, bidCount, currentBid, isDoubled])
    }, [socket, biddingDispatch])

    React.useEffect(()=> {
        biddingDispatch({type: ActionType.NO_CONTRACT, payload: {lvlToBid: lvlToBid()}})
        // setLvlToBid(lvlToBid())
    }, [])

    const calculateAvailableLevelBidding =(level: number, contract: number)=> {
        if (((level - 1) * 5) + 4 <= contract) {
            return false
        }
        return true
    }

    const calculateAvailableSuiteBidding =(level: number, suite: number, contract: number)=> {
        if (((level - 1) * 5) + suite <= contract) {
            return false
        }
        return true
    }

    const makeBiddingRequest =(level: number|null, suit: string)=> {
        if (level == null) {
            return
        }
        let body: BiddingRequest = {
            player_id: authen.authen.username,
            room: playState.playState.room,
            contract: convertContractToNum(level, suit),
            direction: playState.playState.direction,
            tour_name: playState.playState.tourName,
            round_num: playState.playState.round,
            table_id: playState.playState.table
        }
        bid(body)
        setSelectedLevel(null)
        setSelectedSuite(initSuite)
    }

    const pass =()=> {
        let body: BiddingRequest = {
            player_id: authen.authen.username,
            room: playState.playState.room,
            contract: -1,
            direction: playState.playState.direction,
            tour_name: playState.playState.tourName,
            round_num: playState.playState.round,
            table_id: playState.playState.table
        }
        bid(body)
    }

    const double =()=> {
        let body: BiddingRequest = {
            player_id: authen.authen.username,
            room: playState.playState.room,
            contract: 99,
            direction: playState.playState.direction,
            tour_name: playState.playState.tourName,
            round_num: playState.playState.round,
            table_id: playState.playState.table
        }
        bid(body)
    }

    const convertContractToNum =(level: number, suit: string)=> {
        const dict: {[key:string]: number} = {
            'C': 0,
            'D': 1,
            'H': 2,
            'S': 3,
            'NT': 4
        }
        console.log(((level - 1) * 5) + dict[suit])
        return ((level - 1) * 5) + dict[suit]
    }

    const numToString =(contract: number)=> {
        const dict: {[key:number]: string} = {
            0: 'C',
            1: 'D',
            2: 'H',
            3: 'S',
            4: 'NT'
        }
        const level = ((contract - 1) / 5) + 1
        const suite = contract % 5
        const bidString = level.toString() + "_" + dict[suite]
        return bidString
    }

    const lvlToBid =()=> {
        // const lastBid = "3_D"
        // if (currentBid == 0) {
        if (biddingStates.rCurrentBid == 0) {
            return [true,true,true,true,true,true,true]
        }
        // const lastBid = numToString(currentBid)
        const lastBid = numToString(biddingStates.rCurrentBid)
        const suite = lastBid.split("_")[1]
        const lvl = lastBid.split('_')[0]
    
        var availableLevel = []
        for (var i = 0; i < 8; i++) {
            if (i < parseInt(lvl)) {
                availableLevel.push(false)
            }
            else {
                availableLevel.push(true)
            }
        }
        return availableLevel
    }

    const lvlToBidFrom =(currentBid: number)=> {
        // const lastBid = "3_D"
        if (currentBid == 0) {
            return [true,true,true,true,true,true,true]
        }
        const lastBid = numToString(currentBid)
        const suite = lastBid.split("_")[1]
        const lvl = lastBid.split('_')[0]
    
        var availableLevel = []
        for (var i = 0; i < 8; i++) {
            if (i < parseInt(lvl)) {
                availableLevel.push(false)
            }
            else {
                availableLevel.push(true)
            }
        }
        return availableLevel
    }

    const suiteToBid =(currentBid: number, selectLvl : number)=> {
        // const lastBid = "3_D"
        const lastBid = numToString(currentBid)
        console.log("suite available to bid", currentBid)
        const suite = lastBid.split("_")[1]
        const lvl = lastBid.split('_')[0]
        var availableSuite : {[key: string] : boolean} = {
            'S': cardSuite['S'] >= cardSuite[suite],
            'H': cardSuite['H'] >= cardSuite[suite],
            'D': cardSuite['D'] >= cardSuite[suite],
            'C': cardSuite['C'] >= cardSuite[suite],
            'NT': cardSuite['NT'] >= cardSuite[suite],
        }
    
        if (selectLvl == parseInt(lvl)) {
            availableSuite = {
                'S': cardSuite['S'] >= cardSuite[suite],
                'H': cardSuite['H'] >= cardSuite[suite],
                'D': cardSuite['D'] >= cardSuite[suite],
                'C': cardSuite['C'] >= cardSuite[suite],
                'NT': cardSuite['NT'] >= cardSuite[suite],
            }
            availableSuite[suite] = false
        }
        else {
            availableSuite = {
                'NT' : true,
                'S' : true,
                'H' : true,
                'D' : true,
                'C' : true,
            }
        }
        return availableSuite
    }

    return (
        <Container>
            <RightColumn>
                <Pass 
                    // enabled={bidable && !isInitial}
                    enabled={biddingStates.rBidable && !biddingStates.rIsInitial}
                    onClick={()=> {
                        pass()
                    }}>Pass</Pass>
                {
                    Array.from({length: 7}, (_, i) => i + 1).map(num => 
                        <Item 
                            onClick={()=> {
                                setSelectedSuite(initSuite)
                                setSelectedLevel(num)
                                // setSuiteToBid(suiteToBid(currentBid, num))
                                setSuiteToBid(suiteToBid(biddingStates.rCurrentBid, num))
                            }}
                            style={{border: selectedLevel == num ? "1px solid blue" : ""}} 
                            // enabled={bidableLvl[num - 1] && bidable}>{num}</Item> 
                            // enabled={calculateAvailableLevelBidding(num, currentBid) && bidable}>{num}</Item> 
                            enabled={calculateAvailableLevelBidding(num, biddingStates.rCurrentBid) && biddingStates.rBidable}>{num}</Item> 
                            )
                }
                {/* {!isDoubled ?  */}
                {!biddingStates.rIsDouble ? 
                <Double 
                    // enabled={bidable && currentBid != -1 && doubleEnable && !isInitial}
                    enabled={biddingStates.rBidable && biddingStates.rCurrentBid != -1 && biddingStates.rDoubleEnable && !biddingStates.rIsInitial}
                    onClick={()=> double()}>Double</Double> : 
                <Double 
                    // enabled={bidable && doubleEnable && !isInitial}
                    enabled={biddingStates.rBidable && biddingStates.rDoubleEnable && !biddingStates.rIsInitial}
                    // onClick={()=> double()}>{ isInitial ? "" : "Re-Double"}</Double>}
                    onClick={()=> double()}>{ !biddingStates.rIsInitial ? "" : "Re-Double"}</Double>}
                
                <TrumpContainer>
                    <Item 
                        // enabled={bidableSuite['C'] && bidable} 
                        // enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 0, currentBid) && bidable} 
                        enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 0, biddingStates.rCurrentBid) && biddingStates.rBidable} 
                        onClick={()=> {
                            makeBiddingRequest(selectedLevel, 'C')
                            setSelectedSuite(selectSuite('C'))}} 
                        style={{border: selectedSuite['C'] ? "1px solid blue" : ""}}><BsSuitClubFill /></Item>
                    <Item 
                        // enabled={bidableSuite['D'] && bidable} 
                        // enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 1, currentBid) && bidable} 
                        enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 1, biddingStates.rCurrentBid) && biddingStates.rBidable} 
                        onClick={()=> {
                            makeBiddingRequest(selectedLevel, 'D')
                            setSelectedSuite(selectSuite('D'))}} 
                        style={{border: selectedSuite['D'] ? "1px solid blue" : ""}}><BsSuitDiamondFill style={{color: bidableSuite['D'] ? "red" :  "rgba(255, 0, 0, 0.3)" }}/></Item>
                    <Item 
                        // enabled={bidableSuite['H'] && bidable} 
                        // enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 2, currentBid) && bidable} 
                        enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 2, biddingStates.rCurrentBid) && biddingStates.rBidable} 
                        onClick={()=> {
                            makeBiddingRequest(selectedLevel, 'H')
                            setSelectedSuite(selectSuite('H'))}} 
                        style={{border: selectedSuite['H'] ? "1px solid blue" : ""}}><BsSuitHeartFill style={{color: bidableSuite['H'] ? "red" :  "rgba(255, 0, 0, 0.3)" }}/></Item>
                    <Item 
                        // enabled={bidableSuite['S'] && bidable} 
                        // enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 3, currentBid) && bidable} 
                        enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 3, biddingStates.rCurrentBid) && biddingStates.rBidable} 
                        onClick={()=> {
                            makeBiddingRequest(selectedLevel, 'S')
                            setSelectedSuite(selectSuite('S'))}} 
                        style={{border: selectedSuite['S'] ? "1px solid blue" : ""}}><BsSuitSpadeFill /></Item>
                    <NoTrump 
                        // enabled={bidableSuite['NT'] && bidable} 
                        // enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 4, currentBid) && bidable} 
                        enabled={calculateAvailableSuiteBidding(selectedLevel ?? -99, 4, biddingStates.rCurrentBid) && biddingStates.rBidable} 
                        onClick={()=> {
                            makeBiddingRequest(selectedLevel, 'NT')
                            setSelectedSuite(selectSuite('NT'))}} 
                        style={{border: selectedSuite['NT'] ? "1px solid blue" : ""}}>No-Trump</NoTrump>
                </TrumpContainer>
            </RightColumn>
        </Container>
    )
}



const cardSuite : {[key: string] : number} = {
    'NT' : 4,
    'S' : 3,
    'H' : 2,
    'D' : 1,
    'C' : 0,
}



const selectSuite =(suite: string)=> {
    var selected : {[key: string] : boolean} = {
        'S': 'S' == suite,
        'H': 'H' == suite,
        'D': 'D' == suite,
        'C': 'C' == suite,
        'NT': 'NT' == suite,
    }
    return selected
}

const selectLvl =(lvl: number)=> {
    var level = [false, false, false, false, false, false, false]
    level[lvl] = true
    return level
}

const Container = styled.div`
    border-radius: 16px;
    background-color: white;
    max-width: 550px;
    background-color: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    box-shadow: var(--app-shadow);
    display: flex;
    flex-direction: row;
    padding: 10px;
`

const ActionColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const RightColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(9,1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 10px;
`


const TrumpContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column: 3 / span 7;
`

const Item = styled.div<{enabled: boolean}>`
    width: 3vw;
    min-height: 4vh;
    /* max-width: 50px; */
    max-height: 40px;
    min-width: 30px;
    /* min-height: 20px; */
    /* aspect-ratio: 4 / 5; */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => !props.enabled ? 'gainsboro' : 'white'};
    color : ${props => !props.enabled ? 'darkgray' : 'black'};
    border-radius: 16px;
    box-shadow: var(--app-shadow);
    pointer-events: ${props => !props.enabled ? 'none' : 'auto'};
`

const NoTrump = styled(Item)`
    grid-column: 5 / span 3;
    width: 100%;
    height: 100%;
    font-size: 0.3em;
`

const Pass = styled(Item)`
    grid-column: 1 / span 2;
    width: 100%;
    height: 100%;
`

const Double = styled(Item)`
    grid-row: 2;
    grid-column: 1 / span 2;
    width: 100%;
    height: 100%;
`

export default BiddingControl;