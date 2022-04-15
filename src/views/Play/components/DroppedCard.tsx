import React from 'react'
import styled from 'styled-components'
import { CardImage, CardMapping } from '../../../assets/images/AllCards/cards_mapping'

interface DroppedCardProps {
    text: number
}

const DroppedCard =(props: DroppedCardProps)=> {
    return (
        <CardContainer image={CardImage(props.text)}/>
    )
}

const CardContainer = styled.div<{image: string}>`
    /* width: 5vw;
    max-width: 4em;
    aspect-ratio: 169 / 244;
    border-radius: 3px;
    box-shadow: var(--app-shadow);
    background-color: white;
    background-image: url(${props=>props.image});
    background-size: cover;
    background-repeat: no-repeat;
    border: 4px solid white; */

    width: 5vw;
    max-width: 4em;
    /* height: 50%; */
    padding: 4px;
    background-position: center; 
    border-radius: 3px;
    box-shadow: var(--app-shadow);
    background-color: white;
    aspect-ratio: 169/244;
    background-image: url(${props=>props.image});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: white;
    border: 4px solid transparent;
    box-sizing: border-box;
`

export default DroppedCard;