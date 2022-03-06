import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import Card from './Card'
import DroppedCard from './DroppedCard'

interface HandProps {
    initialCard: number[]
    dropRef: React.RefObject<HTMLDivElement>
    onDrop: (item: number) => void
    position: HandPosition,
    placeCard?: boolean,
    enabled: boolean,
    cardToFind: number
}

export enum HandPosition {
    TOP,
    RIHGT,
    DOWN,
    LEFT
}


const Hand =(props: HandProps)=> {
    const [cards, setCards] = React.useState(props.initialCard)

    React.useEffect(()=> {
        setCards(props.initialCard)
    }, [props.initialCard])

    const animateCondition =(val: number, index: number)=> {
        if (val > 0) {
            return props.placeCard && val == props.cardToFind
        }
        return props.placeCard && index == 0
    }

    return (
        <HandContainer
            enabled={props.enabled}
            position={props.position}>
            { cards.map((val, i)=> {
                return (
                    <Card 
                        text={val}
                        shouldCollapse={3}
                        index={i}
                        placePositionRef={props.dropRef}
                        onDrop={props.onDrop}
                        selfAnimate={animateCondition(val, i)}
                        onAnimationCompleted={()=>{
                            
                            setCards(cards.filter(e=>cards.indexOf(e) != i))
                            
                            }}/>)
            })}
        </HandContainer>
    )
}

interface HandContainerProps extends HTMLAttributes<HTMLDivElement>{
    position: HandPosition,
    enabled: boolean
}

const HandContainer =(props: HandContainerProps)=> {
    switch (props.position) {
        case HandPosition.TOP : return <Top enabled={props.enabled}>{props.children}</Top>
        case HandPosition.DOWN : return <Down enabled={props.enabled}>{props.children}</Down>
        case HandPosition.LEFT : return <Left enabled={props.enabled}>{props.children}</Left>
        case HandPosition.RIHGT : return <Right enabled={props.enabled}>{props.children}</Right>
    }
}

const Right = styled.div<{enabled: boolean}>`
    grid-row: 2;
    grid-column: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

const Left = styled.div<{enabled: boolean}>`
    grid-row: 2;
    grid-column: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`


const Down = styled.div<{enabled: boolean}>`
    grid-row: 3;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;   
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

const Top = styled.div<{enabled: boolean}>`
    grid-row: 1;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-start;   
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

export default Hand;