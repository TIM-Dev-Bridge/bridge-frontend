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
    cardToFind: number,
    currentSuite?: number|null,
    isTurn: boolean,
    onAnimatinoComplete: ()=> void,
    trump: number | null,
    playerName: string
}

export enum HandPosition {
    TOP,
    RIHGT,
    DOWN,
    LEFT
}


const Hand =(props: HandProps)=> {
    const [cards, setCards] = React.useState<number[]>(props.initialCard)
    const [isTurn, setTurn] = React.useState<boolean>(props.isTurn)

    React.useEffect(()=> {
        setCards(props.initialCard)
    }, [props.initialCard])

    React.useEffect(()=> {
        setTurn(props.isTurn)
    }, [props.isTurn])

    const animateCondition =(val: number, index: number)=> {
        if (val > 0) {
            return props.placeCard && val == props.cardToFind
        }
        return props.placeCard && index == 0
    }

    const isCardAvailable =(currentCard: number)=> {
        if (props.currentSuite === null) {
            return true
        }

        if (props.currentSuite === undefined) {
            return false
        }

        if (props.currentSuite === Math.floor(Number(currentCard / 13))) {
            return true
        }

        if (props.trump === Math.floor(Number(currentCard / 13) )) {
            return true
        }
        return false
    }

    const isAvailable =(suite: number)=> {
        var isExist =  false
        cards.map( card => {
            if (props.currentSuite === Math.floor(Number(Number(card) / 13))) {
                isExist = true
            }
        })
        if (isExist) {
            return isCardAvailable(suite) && props.enabled
        }
        return props.enabled
    }

    const topPosition =()=> {
        if (props.position == HandPosition.TOP) {
            return "-10px"
        }
        if (props.position == HandPosition.LEFT || props.position == HandPosition.RIHGT) {
            return "-50px"
        }
        if (props.position == HandPosition.DOWN) {
            return ""
        }
    }

    const bottomPosition =()=> {
        if (props.position == HandPosition.DOWN) {
            return "-10px"
        }
        else {
            return ""
        }
    }

    return (
        <HandContainer
            isTurn={props.isTurn}
            enabled={props.enabled}
            position={props.position}>
            { cards.map((val, i)=> {
                return (
                    <Card 
                        isTurn={isTurn}
                        text={val}
                        shouldCollapse={3}
                        index={i}
                        placePositionRef={props.dropRef}
                        onDrop={props.onDrop}
                        selfAnimate={animateCondition(val, i)}
                        available={isAvailable(val)}
                        onClick={()=> {setTurn(false)}}
                        onAnimationCompleted={()=>{
                            setCards(cards.filter(e=>cards.indexOf(e) != i))
                            props.onAnimatinoComplete()
                            }}/>)
            })}
            <div style={{
                position: 'absolute', 
                backgroundColor: "white",  
                padding: "10px",
                borderRadius: "8px", 
                top: topPosition() ,
                bottom: bottomPosition(),
                boxShadow: props.isTurn ? "green 0px 0px 10px 0px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" : "",
                }}>{props.playerName}</div>
        </HandContainer>
    )
}

interface HandContainerProps extends HTMLAttributes<HTMLDivElement>{
    position: HandPosition,
    enabled: boolean,
    isTurn: boolean
}

const HandContainer =(props: HandContainerProps)=> {
    switch (props.position) {
        case HandPosition.TOP : return <Top enabled={props.enabled} isTurn={props.isTurn}>{props.children}</Top>
        case HandPosition.DOWN : return <Down enabled={props.enabled} isTurn={props.isTurn}>{props.children}</Down>
        case HandPosition.LEFT : return <Left enabled={props.enabled} isTurn={props.isTurn}>{props.children}</Left>
        case HandPosition.RIHGT : return <Right enabled={props.enabled} isTurn={props.isTurn}>{props.children}</Right>
    }
}

const Right = styled.div<{enabled: boolean, isTurn: boolean}>`
    grid-row: 2;
    grid-column: 3;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

const Left = styled.div<{enabled: boolean, isTurn: boolean}>`
    grid-row: 2;
    grid-column: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`


const Down = styled.div<{enabled: boolean, isTurn: boolean}>`
    grid-row: 3;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-end;   
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

const Top = styled.div<{enabled: boolean, isTurn: boolean}>`
    grid-row: 1;
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: flex-start;   
    position: relative;
    pointer-events: ${props=>props.enabled ? "auto" : "none"} ;
`

export default Hand;