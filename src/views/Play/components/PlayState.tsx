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

interface PlayingPageProps {
    tableDetail?: ConnectTable
}

const PlayingPage = (props: PlayingPageProps) => {
    enum PlayState {
        Bidding,
        Playing
    }

    const { connect, updateCard } = useTable()
    const [cards, setCards] = React.useState<string[]>([])
    const [eastCards, setEastCards] = React.useState([])
    const [westCards, setWestCards] = React.useState([])
    const [northCards, setNorthCards] = React.useState([])
    const southPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const rightPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const leftPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const topPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const [shouldMoveToFinished, setShouldMoveToFinished] = React.useState(false)
    const [droppedCard, setDroppedCard] = React.useState(<></>)
    const [rightDroppedCard, setRightDroppedCard] = React.useState(<></>)
    const [leftDroppedCard, setLefttDroppedCard] = React.useState(<></>)
    const [topDroppedCard, setTopDroppedCard] = React.useState(<></>)
    const [leftPlaceCardAnimate, setLeftPlaceCardAnimate] = React.useState(true)
    const [playState, setPlayState] = React.useState(PlayState.Bidding)

    const playContext = usePlayState()
    const authen = useAuthen()

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
            connect(playContext.playState.table, detail)
        }
    }, [playContext.playState.table])

    React.useEffect(() => {
        updateCard((cards) => {
            let cardString = cards.map(num => num.toString())
            console.log("cards update", cards, cardString)
            setCards(cardString)
        })
    }, [socket])

    const dropCard = (animateAnimation: React.Dispatch<React.SetStateAction<boolean>>, dropFunction: React.Dispatch<React.SetStateAction<JSX.Element>>) => {
        animateAnimation(false)
        return dropFunction
    }

    return (
        // <RatioContainer>
        <PlayingPageContainer>
            <InnerContainer>
                <Center>
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
                    position={HandPosition.TOP}
                    initialCard={northCards}
                    dropRef={topPlayedCardRef}
                    onDrop={setTopDroppedCard} />
                <Hand
                    position={HandPosition.DOWN}
                    initialCard={cards}
                    dropRef={southPlayedCardRef}
                    onDrop={setDroppedCard} />
                <Hand
                    position={HandPosition.LEFT}
                    initialCard={westCards}
                    dropRef={leftPlayedCardRef}
                    onDrop={item => dropCard(setLeftPlaceCardAnimate, setLefttDroppedCard)(item)}
                    placeCard={leftPlaceCardAnimate} />
                <Hand
                    position={HandPosition.RIHGT}
                    initialCard={eastCards}
                    dropRef={rightPlayedCardRef}
                    onDrop={setRightDroppedCard} />
            </InnerContainer>

            <PopupArea>
                <BiddingPage />
            </PopupArea>
        </PlayingPageContainer>
        // </RatioContainer>
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

const InnerContainer = styled.div`
    background-color: white;
    display: grid;
    /* position: absolute; 
    top: 0;
    left: 0; */
    /* margin: 0 auto; */
    width: 100%;
    height: 100%;
    /* aspect-ratio: 16 / 10; */
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
`

const Center = styled.div`
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
    background-color: green;
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
    background-color: green;
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
    background-color: green;
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
    background-color: green;
    width: 10vw;
    max-width: 10em;
    aspect-ratio: 1 / 1;
`

const PlayedCard = styled.div`
    width: 5vw;
    max-width: 4em;
    aspect-ratio: 9 / 16;
    /* background-color: red; */
    /* box-shadow: var(--app-shadow); */
`


const Iframe = styled.iframe`
    display: block; 
    border: 0px;
    margin: 0px auto;
    padding:0px;
`

const PopupArea = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`


export default PlayingPage