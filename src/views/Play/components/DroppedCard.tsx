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
    width: 5vw;
    max-width: 4em;
    aspect-ratio: 169 / 244;
    border-radius: 3px;
    box-shadow: var(--app-shadow);
    background-color: white;
    background: url(${props=>props.image});
    background-size: contain ;
`

export default DroppedCard;