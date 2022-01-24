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
    width: 40%;
    /* max-width: 4em; */
    height: 100%;
    border-radius: 6px;
    box-shadow: var(--app-shadow);
    background-color: white;
`

export default DroppedCard;