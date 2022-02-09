import React from 'react'
import styled from 'styled-components'
import {animate, motion} from 'framer-motion'
import Card from './Card'
import { indexOf, remove } from 'lodash'
import Hand, { HandPosition } from './Hand'

const PlayingPage = ()=> {
    const [cards, setCards] = React.useState(['B','C','D','E','F','G','H','I','J','K','L','M','N'])
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

    const dropCard =(animateAnimation: React.Dispatch<React.SetStateAction<boolean>>, dropFunction: React.Dispatch<React.SetStateAction<JSX.Element>>)=> {
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
                    initialCard={cards} 
                    dropRef={topPlayedCardRef} 
                    onDrop={setTopDroppedCard}/>
                <Hand 
                    position={HandPosition.DOWN}
                    initialCard={cards} 
                    dropRef={southPlayedCardRef} 
                    onDrop={setDroppedCard}/>
                <Hand 
                    position={HandPosition.LEFT}
                    initialCard={cards} 
                    dropRef={leftPlayedCardRef} 
                    onDrop={item => dropCard(setLeftPlaceCardAnimate, setLefttDroppedCard)(item)}
                    placeCard={leftPlaceCardAnimate}/>
                <Hand 
                    position={HandPosition.RIHGT}
                    initialCard={cards} 
                    dropRef={rightPlayedCardRef} 
                    onDrop={setRightDroppedCard}/>
                </InnerContainer>
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


export default PlayingPage