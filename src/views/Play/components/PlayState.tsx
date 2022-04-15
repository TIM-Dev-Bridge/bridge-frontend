import React from 'react'
import styled from 'styled-components'
import { animate, motion } from 'framer-motion'
import Card from './Card'
import { indexOf, remove } from 'lodash'
import Hand, { HandPosition } from './Hand'
import { ConnectTable, useTable } from '../../TourRoom/UseTable'
import { socket } from '../../../Service/SocketService'
import BiddingPage from '../../Bidding/BiddingPage'
import { usePlayState } from '../../PlayingContext/PlayingContext'
import { AuthenContext, useAuthen } from '../../../Authen'
import { PlayCardRequest, usePlaying } from '../../Bidding/UsePlaying'
import DroppedCard from './DroppedCard'
import { useGame } from './GameContext'

interface PlayingPageProps {
    tableDetail?: ConnectTable
}

interface PlayingDirectionFn {
    direction: HandPosition,
    updateCard: React.Dispatch<React.SetStateAction<number[]>>,
    animate: React.Dispatch<React.SetStateAction<boolean>>,
    dropCard: React.Dispatch<React.SetStateAction<number>>
}

type PlayingDirection = {
    [key : number]: PlayingDirectionFn
}

const PlayingPage = (props: PlayingPageProps) => {
    enum PlayState {
        Bidding,
        Playing
    }

    const { connect, updateCard, updateCardOpposite } = useTable()
    const [cards, setCards] = React.useState<number[]>([])
    const [leftCards, setLeftCards] = React.useState<number[]>([])
    const [rightCards, setRightCards] = React.useState<number[]>([])
    const [topCards, setTopCards] = React.useState<number[]>([])
    const southPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const rightPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const leftPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const topPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const [droppedCard, setDroppedCard] = React.useState(<></>)
    const [rightDroppedCard, setRightDroppedCard] = React.useState(<></>)
    const [leftDroppedCard, setLefttDroppedCard] = React.useState(<></>)
    const [topDroppedCard, setTopDroppedCard] = React.useState(<></>)

    const [leftPlaceCardAnimate, setLeftPlaceCardAnimate] = React.useState(false)
    const [rightPlaceCardAnimate, setRightPlaceCardAnimate] = React.useState(false)
    const [topPlaceCardAnimate, setTopPlaceCardAnimate] = React.useState(false)
    // const [leftPlaceCardAnimate, setLeftPlaceCardAnimate] = React.useState(true)


    const playContext = usePlayState()
    const authen = useAuthen()
    const {playCard, onInitialTurn, onDefaultTurn, onInitialPlaying, onFinishRound, onEnding, leave} = usePlaying()
    const [playDirection, setPlayDirection] = React.useState(-1)
    const [turn, setTurn] = React.useState(-1)
    const turnRef = React.useRef(turn)
    const [declarer, setDeclarer] = React.useState(0)

    const [dropCardBottom, setDropCardBottom] = React.useState(0)
    const [dropCardLeft, setDropCardLeft] = React.useState(0)
    const [dropCardRight, setDropCardRight] = React.useState(0)
    const [dropCardTop, setDropCardTop] = React.useState(0)
    
    const [playingDirection, setPlayingDirection] = React.useState<PlayingDirection>()
    const playingDirectionRef = React.useRef(playingDirection)
    const [shouldWaiting, setShouldWaiting] = React.useState(false)

    const [currentSuite, setCurrentSuite] = React.useState<number|null>(null)

    const [shouldAnimateCollapse, setShouldAnimateCollapse] = React.useState(false)

    const game = useGame()

    // React.useEffect(() => {
    //     if (props.tableDetail != null || props.tableDetail != undefined) {
    //         connect(props.tableDetail.table_id, props.tableDetail)
    //     }
    // }, [props.tableDetail])
    

    React.useEffect(() => {
        if (playContext.playState.table != null && playContext.playState.table != undefined && playContext.playState.table != "") {
            const detail: ConnectTable = {
                player_id: authen.authen.username,
                player_name: authen.authen.username,
                tour_name: playContext.playState.tourName,
                direction: playContext.playState.direction,
                room: playContext.playState.room,
                round_num: playContext.playState.round,
                table_id: playContext.playState.table
            }
            const newState: PlayingDirection = {
                [playContext.playState.direction] : {
                    direction: HandPosition.DOWN,
                    updateCard: ()=>{},
                    animate: ()=>{},
                    dropCard: ()=>{}
                },
                [(playContext.playState.direction + 1) % 4] : {
                    direction: HandPosition.LEFT,
                    updateCard: setLeftCards,
                    animate: setLeftPlaceCardAnimate,
                    dropCard: setDropCardLeft
                },
                [(playContext.playState.direction + 3) % 4] : {
                    direction: HandPosition.RIHGT,
                    updateCard: setRightCards,
                    animate: setRightPlaceCardAnimate,
                    dropCard: setDropCardRight
                },
                [(playContext.playState.direction + 2) % 4] : {
                    direction: HandPosition.TOP,
                    updateCard: setTopCards,
                    animate: setTopPlaceCardAnimate,
                    dropCard: setDropCardTop
                }
            }
            setPlayingDirection(newState)
            
            
            connect(playContext.playState.table, detail)
            
        }
    }, [playContext.playState.table])

    React.useEffect(() => {
        updateCard((cards) => {
            let cardString = cards.map(num => num.toString())
            console.log("cards update", cards, cardString)
            setCards(cards)
        })
    }, [socket])

    React.useEffect(() => {
        updateCardOpposite((newcards, direction) => {
            let cardString = cards.map(num => num.toString())
            console.log("cards update", cards, cardString)
{/*             directionsRef.current[direction](newcards) */}
            playingDirectionRef.current?.[direction].updateCard(newcards)
            let cardEmpty = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13]
            playingDirectionRef.current?.[(direction + 1) % 4].updateCard(cardEmpty)
            playingDirectionRef.current?.[(direction + 2) % 4].updateCard(cardEmpty)
            playingDirectionRef.current?.[(direction + 3) % 4].updateCard(cardEmpty)
            setDeclarer(direction)
            playContext.updatePlayState({
                tourName: playContext.playState.tourName,
                room: playContext.playState.room,
                round: playContext.playState.round,
                table: playContext.playState.table,
                direction: playContext.playState.direction,
                status: 'initial_playing',
                pairId: playContext.playState.pairId,
                currentRound: playContext.playState.currentRound,
                tableCount: playContext.playState.tableCount,
                data: playContext.playState.data
            })
        })
    }, [socket, declarer])

    React.useEffect(()=> {
        onInitialTurn( data => {
            console.log("DATA : ", data)
            let direction = data.payload.leader
            setPlayDirection(direction)
            setTurn(data.payload.turn)
            setCurrentSuite(null)
            // animateDirectionRef.current[direction](true)
            // animateDirection[direction](true)
        })
    }, [socket, playDirection, currentSuite])

    React.useEffect(()=> {
        onDefaultTurn( data => {
            console.log("DATA : ", data)
            let direction = data.payload.nextDirection
            let prev = data.payload.prevDirection
            setPlayDirection(direction)
            // setTurn(turn => turn += 1)
            if (prev != playContext.playState.direction) {
                playingDirection?.[prev].dropCard(data.payload.card)
                playingDirection?.[prev].animate(true)
                setCurrentSuite(data.payload['initSuite'])
                if (declarer == data.payload.nextDirection) {

                }
            }

            if (data.payload.isFourthPlay) {
                console.log("ANIMATE COLLAPSE PLEASE")
                setShouldAnimateCollapse(true)
            }
        })
    }, [socket, playDirection, currentSuite, shouldAnimateCollapse])

    React.useEffect(()=> {
        onInitialPlaying( data => {
            console.log("DATA : ", data)
            let direction = data.payload.leader
            setPlayDirection(direction)
            setTurn(data.payload.turn)
        })
    }, [socket, playDirection])

    React.useEffect(()=> {
        onFinishRound( data => {
            if (data.length == playContext.playState.tableCount) {
                console.log("FINISH", data)
                const newRound = playContext.playState.currentRound + 1
                const tableOfNewRound = playContext.playState.data[newRound - 1].tables
                const table = tableOfNewRound.find( table => table.versus.includes(playContext.playState.pairId.toString()))
                const tableId = table?.table_id
                const detail: ConnectTable = {
                    player_id: authen.authen.username,
                    player_name: authen.authen.username,
                    tour_name: playContext.playState.tourName,
                    direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
                    room: table?.table_id ?? "",
                    round_num: newRound.toString(),
                    table_id: table?.table_id ?? ""
                }
                leave(playContext.playState.table)

                playContext.updatePlayState({
                    ...playContext.playState,
                    room: tableId ?? "",
                    round: newRound.toString(),
                    table: tableId ?? "",
                    direction: table?.directions.find(player => player.id == authen.authen.username)?.direction,
                    status: "",
                    currentRound: newRound
                })

                
                connect(tableId ?? "", detail)
                game.reset()
                setShouldWaiting(false)
                
            }
        })
    }, [socket])

    React.useEffect(()=> {
        onEnding( ()=> {
            console.log("WAITING PLEASE")
            setShouldWaiting(true)
        })
    }, [socket])


    React.useEffect(()=> {
        turnRef.current = turn
    }, [turn])
    
    React.useEffect(()=> {
        playingDirectionRef.current = playingDirection
    }, [playingDirection])

    

    const makePlayCardRequest =(card: number, turn: number)=> {
        let request : PlayCardRequest = {
            player_id: authen.authen.username,
            room: playContext.playState.room,
            card: card,
            direction: playContext.playState.direction,
            turn: turn,
            tour_name: playContext.playState.tourName,
            round_num: playContext.playState.round,
            table_id: playContext.playState.table
        }

        playCard(request)
    }

    const dropCard = (animateAnimation: React.Dispatch<React.SetStateAction<boolean>>, dropFunction: React.Dispatch<React.SetStateAction<JSX.Element>>) => {
        animateAnimation(false)
        
        return dropFunction
    }

    const variants = {
        collapse: {
            scale: 0.8,
            opacity: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        },
        normal: {
            scale: 1,
            opacity: 1
        }
    }

    return (
        <PlayingPageContainer>
            <InnerContainer isYourTurn={playDirection == playContext.playState.direction}>
                
                <Center
                    variants={variants}
                    initial="normal"
                    animate={shouldAnimateCollapse ? "collapse" : "normal"}
                    onAnimationComplete={()=> {
                        setTopDroppedCard(<></>)
                        setLefttDroppedCard(<></>)
                        setRightDroppedCard(<></>)
                        setDroppedCard(<></>)
                        setShouldAnimateCollapse(false)
                    }}
                >
                    <CenterTop>
                        <PlayedCard ref={topPlayedCardRef}>
                            {topDroppedCard}
                        </PlayedCard>
                    </CenterTop>
                    <CenterSouth>
                        <PlayedCard ref={southPlayedCardRef}>
                            {droppedCard}
                        </PlayedCard>
                    </CenterSouth>
                    <CenterLeft>
                        <PlayedCard ref={leftPlayedCardRef}>
                            {leftDroppedCard}
                        </PlayedCard>
                    </CenterLeft>
                    <CenterRight>
                        <PlayedCard ref={rightPlayedCardRef}>
                            {rightDroppedCard}
                        </PlayedCard>
                    </CenterRight>
                </Center>
                <Hand
                    enabled={false}
                    position={HandPosition.TOP}
                    initialCard={topCards}
                    dropRef={topPlayedCardRef}
                    placeCard={topPlaceCardAnimate}
                    cardToFind={dropCardTop}
                    onDrop={() => {
                        dropCard(setTopPlaceCardAnimate, setTopDroppedCard)(<DroppedCard text={dropCardTop} />)
                        }} />
                <Hand
                    enabled={playDirection == playContext.playState.direction}
                    position={HandPosition.DOWN}
                    initialCard={cards}
                    dropRef={southPlayedCardRef}
                    cardToFind={dropCardBottom}
                    currentSuite={currentSuite}
                    onDrop={(item)=> {
                        setDroppedCard(<DroppedCard text={item} />)
                        makePlayCardRequest(item, turnRef.current)}} />
                <Hand
                    enabled={false}
                    position={HandPosition.LEFT}
                    initialCard={leftCards}
                    dropRef={leftPlayedCardRef}
                    cardToFind={dropCardLeft}
                    onDrop={() => {
                        dropCard(setLeftPlaceCardAnimate, setLefttDroppedCard)(<DroppedCard text={dropCardLeft} />)
                        }}
                    placeCard={leftPlaceCardAnimate} />
                <Hand
                    enabled={false}
                    position={HandPosition.RIHGT}
                    initialCard={rightCards}
                    dropRef={rightPlayedCardRef}
                    placeCard={rightPlaceCardAnimate}
                    cardToFind={dropCardRight}
                    onDrop={() => {
                        dropCard(setRightPlaceCardAnimate, setRightDroppedCard)(<DroppedCard text={dropCardRight} />)
                        }} />
            </InnerContainer>

            <PopupArea visible={playContext.playState.status == 'waiting_for_bid'}>
                <BiddingPage />
            </PopupArea>
            <WaitingPage visible={shouldWaiting}>
                <>Wait for other table to complete</>
            </WaitingPage>
        </PlayingPageContainer>
    )
}


const PlayingPageContainer = styled.div`
    /* width: 70vw; */
    width: 100%;
    /* height: 0; */
    zoom: 1;
    /* padding-bottom: 75%; */
    width: 100%;
    position: relative;
`

const RatioContainer = styled.div`
    background-color: green;
    width: 100%;
    height: 100vh;
    position: relative;
`

const InnerContainer = styled.div<{isYourTurn: boolean}>`
    background-color: white;
    display: grid;
    /* position: absolute; 
    top: 0;
    left: 0; */
    /* margin: 0 auto; */
    width: 100%;
    height: 100%;
    border: ${props=>props.isYourTurn ? "5px solid green" : "5px solid white"};
    /* aspect-ratio: 16 / 10; */
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
`

const Center = styled(motion.div)`
    grid-row: 2;
    grid-column: 2;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
    /* box-shadow: var(--app-shadow); */
    border-radius: 16px;
`

const CenterTop = styled.div`
    grid-row: 1;
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: green; */
    width: 10vw;
    max-width: 10em;
    aspect-ratio: 1 / 1;
`

const CenterSouth = styled.div`
    grid-row: 3;
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: green; */
    width: 10vw;
    max-width: 10em;
    aspect-ratio: 1 / 1;
`

const CenterRight = styled.div`
    grid-row: 2;
    grid-column: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: green; */
    width: 10vw;
    max-width: 10em;
    aspect-ratio: 1 / 1;
`

const CenterLeft = styled.div`
    grid-row: 2;
    grid-column: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: green; */
    width: 10vw;
    max-width: 10em;
    aspect-ratio: 1 / 1;
`

const PlayedCard = styled.div`
    width: 5vw;
    max-width: 4em;
    aspect-ratio: 169 / 244;
    /* background-color: red; */
    /* box-shadow: var(--app-shadow); */
`

const Iframe = styled.iframe`
    display: block; 
    border: 0px;
    margin: 0px auto;
    padding:0px;
`

const PopupArea = styled.div<{visible: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: ${props=>props.visible ? "visible" : "hidden"};
`

const WaitingPage = styled.div<{visible: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    visibility: ${props=>props.visible ? "visible" : "hidden"};
`


export default PlayingPage