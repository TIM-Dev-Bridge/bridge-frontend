import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import Card from './Card'
import DroppedCard from './DroppedCard'

interface HandProps {
    initialCard: String[]
    dropRef: React.RefObject<HTMLDivElement>
    onDrop: (item: JSX.Element) => void
    position: HandPosition
}

export enum HandPosition {
    TOP,
    RIHGT,
    DOWN,
    LEFT
}


const Hand =(props: HandProps)=> {
    const [cards, setCards] = React.useState(props.initialCard)
    return (
        <HandContainer
            position={props.position}
            >
            { cards.map((val, i)=> {
                return (
                    <Card 
                        text={val}
                        shouldCollapse={3}
                        index={i}
                        placePositionRef={props.dropRef}
                        onDrop={props.onDrop}
                        onAnimationCompleted={()=>{
                            
                            setCards(cards.filter(e=>cards.indexOf(e) != i))
                            
                            }}/>)
            })}
        </HandContainer>
    )
}

interface HandContainerProps extends HTMLAttributes<HTMLDivElement>{
    position: HandPosition
}

const HandContainer =(props: HandContainerProps)=> {
    switch (props.position) {
        case HandPosition.TOP : return <Top>{props.children}</Top>
        case HandPosition.DOWN : return <Down>{props.children}</Down>
        case HandPosition.LEFT : return <Left>{props.children}</Left>
        case HandPosition.RIHGT : return <Right>{props.children}</Right>
    }
}

const Right = styled.div`
    grid-row: 2;
    grid-column: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
`

const Left = styled.div`
    grid-row: 2;
    grid-column: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
`


const Down = styled.div`
    grid-row: 3;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;   
`

const Top = styled.div`
    grid-row: 1;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-start;   
`

export default Hand;