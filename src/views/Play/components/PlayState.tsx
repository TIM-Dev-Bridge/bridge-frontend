import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import Card from './Card'
import { indexOf, remove } from 'lodash'
import Hand from './Hand'

const PlayingPage = ()=> {
    const [cards, setCards] = React.useState(['B','C','D','E','F','G','H','I','J','K','L','M','N'])
    const southPlayedCardRef = React.useRef<HTMLDivElement>(null)
    const [shouldMoveToFinished, setShouldMoveToFinished] = React.useState(false)
    const [droppedCard, setDroppedCard] = React.useState(<></>)


    return (
        <RatioContainer>
        <PlayingPageContainer>
            <InnerContainer>
            <Center>
                <CenterSouth>
                    <SouthPlayedCard ref={southPlayedCardRef}>
                        {droppedCard}
                    </SouthPlayedCard>
                </CenterSouth>
            </Center>
            <Hand 
                initialCard={cards} 
                dropRef={southPlayedCardRef} 
                onDrop={setDroppedCard}/>
            <Right>
            </Right>
            
            </InnerContainer>
        </PlayingPageContainer>
        </RatioContainer>
    )
}


const PlayingPageContainer = styled.div`
    /* width: 70vw; */
    width: 100%;
    height: 0;
    zoom: 1;
    padding-bottom: 75%;
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
    position: absolute; 
    top: 0;
    left: 0;
    /* margin: 0 auto; */
    width: 100%;
    height: 70%;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
`

const South = styled.div`
    grid-row: 3;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    
`

const Right = styled.div`
    grid-row: 2;
    grid-column: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
`

const Center = styled.div`
    grid-row: 2;
    grid-column: 2;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33% 33% 33%;
`

const CenterSouth = styled.div`
    grid-row: 3;
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const SouthPlayedCard = styled.div`
    width: 100%;
    height: 100%;
    grid-row: 3;
    grid-column: 2;
    /* box-shadow: var(--app-shadow); */
`


const Iframe = styled.iframe`
    display: block; 
    border: 0px;
    margin: 0px auto;
    padding:0px;
`


export default PlayingPage