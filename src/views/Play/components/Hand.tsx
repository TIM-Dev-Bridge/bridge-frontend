import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import DroppedCard from './DroppedCard'

interface HandProps {
    initialCard: String[]
    dropRef: React.RefObject<HTMLDivElement>
    onDrop: (item: JSX.Element) => void
}

const Hand =(props: HandProps)=> {
    const [cards, setCards] = React.useState(props.initialCard)

    return (
        <HandContainer>
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


const HandContainer = styled.div`
    grid-row: 3;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    
`

export default Hand;