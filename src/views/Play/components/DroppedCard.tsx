import React from 'react'
import styled from 'styled-components'

interface DroppedCardProps {
    text: String
}

const DroppedCard =(props: DroppedCardProps)=> {
    return (
        <CardContainer>
            {props.text}
        </CardContainer>
    )
}

const CardContainer = styled.div`
    width: 5vw;
    max-width: 4em;
    aspect-ratio: 9 / 16;
    border-radius: 6px;
    box-shadow: var(--app-shadow);
    background-color: white;
`

export default DroppedCard;