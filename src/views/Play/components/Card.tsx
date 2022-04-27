import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { AnimationDefinition } from 'framer-motion/types/render/utils/animation'
import DroppedCard from './DroppedCard'
import { CardImage, CardMapping } from '../../../assets/images/AllCards/cards_mapping'

interface CardProps {
    text: number,
    placePositionRef: React.RefObject<HTMLElement>,
    onAnimationCompleted: ()=>void,
    onDrop: (item: number)=>void,
    index: number
    shouldCollapse: number,
    selfAnimate?: boolean,
    available: boolean,
    isTurn: boolean
    onClick: ()=>void
}

type Position = {x: number, y: number}

const Card =(props: CardProps)=> {
    enum State {
        MOVE_TO_POSITION,
        MOVE_BACK,
        DRAG,
        IDLE,
        DROPPING,
        DROPPED,
        BEFORE_COLLAPSE,
        COLLAPSE,
        UPDATE_STACK,
    }
    const cardRef = React.useRef<HTMLDivElement>(null)
    const [animation, setAnimation] = React.useState<Position>()
    const [visible, setVisibility] = React.useState(true)
    const [movingState, setMovingState] = React.useState<State>(State.IDLE)
    let previousState = State.IDLE
    let tempAnimation = {}
    const defaultPosition = React.useRef<Position>()

    React.useEffect(()=> {
        console.log("AVAILABLE", props.available)
        cardRef.current!.onmouseup = onMouseUp
        defaultPosition.current = {x: cardRef.current!.getBoundingClientRect().x, y: cardRef.current!.getBoundingClientRect().y}
    }, [])

    React.useEffect(()=> {
        if (props.selfAnimate != null) {
            if (props.selfAnimate) {
                placeAnimatation()
            }
        }
    }, [props.selfAnimate])

    const onDragDetect =(event: MouseEvent)=> {
        setMovingState(State.DRAG)
    }
    
    const onMouseDown =(ev: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        const x = Math.abs((ev.target as HTMLDivElement).getBoundingClientRect().x)
        const y = Math.abs((ev.target as HTMLDivElement).getBoundingClientRect().y)
        
        setAnimation(getAnimationDiv(x,y))
    }

    const onMouseUp =(ev: MouseEvent)=> {        
        const x = Math.abs((ev.target as HTMLDivElement).getBoundingClientRect().x)
        const y = Math.abs((ev.target as HTMLDivElement).getBoundingClientRect().y)
        // if (shouldDropOnPlayedPosition(x,y)) {
        //     setMovingState(State.MOVE_TO_POSITION)
        //     previousState = State.MOVE_TO_POSITION
        // }
        // else {
        //     setMovingState(State.MOVE_BACK)
        //     previousState =  State.MOVE_BACK
        // }
        setMovingState(State.MOVE_TO_POSITION)
    }

    const shouldDropOnPlayedPosition =(elementX: number, elementY: number)=> {
        if (props.placePositionRef.current!.getBoundingClientRect().y - elementY < -30) { return false }
        if (props.placePositionRef.current!.getBoundingClientRect().x - elementX > 40) { return false }

        return true
    }

    // const getAnimationDiv =(elementX: number, elementY: number): {x: number, y: number, scale: number} => {
    //     const x = props.placePositionRef.current!.getBoundingClientRect().x - elementX
    //     const y = props.placePositionRef.current!.getBoundingClientRect().y - elementY 
    //     return {
    //         x: x,
    //         y: y,
    //         scale: 0.5
    //     }
    // }

    const getAnimationDiv =(elementX: number, elementY: number): Position => {
        const x = props.placePositionRef.current!.getBoundingClientRect().x - elementX
        const y = props.placePositionRef.current!.getBoundingClientRect().y - elementY 
        return {
            x: x,
            y: y,
        }
    }

    const makeAnimation =(state: State)=> {
        // console.log(State[state])
        if (state == State.MOVE_TO_POSITION) {
            return animation;
        }
        if (state == State.MOVE_BACK) {
            return {x: 0, y: 0}
        }
        if (state == State.DROPPING) {
            return {width: 50, height: 50}
        }
        if (state == State.DROPPED) {
            return {x: 0, y: 0, opacity: 0};
        }
        if (state == State.BEFORE_COLLAPSE) {
            return {y: 0,opacity: 0}
        }
        if (state == State.COLLAPSE) {
            tempAnimation = {y: 0, opacity: 0, width: 0}
            return {y: 0, opacity: 0, width: 0}
        }
        if (state == State.UPDATE_STACK) {
            return {}
        }
        return {}
    }

    const shouldHaveAnimationDuration =(state: State)=> {
        const shouldAnimate = [State.MOVE_BACK, State.MOVE_TO_POSITION, State.COLLAPSE, State.DROPPING]
        if (shouldAnimate.includes(state)) { return 0.3 }
        return 0
    }

    const onAnimationComplete =(definition: AnimationDefinition)=> {
        console.log("DEF",definition.valueOf().hasOwnProperty('width'), definition, definition.valueOf())
        if (movingState == State.MOVE_TO_POSITION) {
            // setMovingState(State.DROPPING)
            setMovingState(State.DROPPED)
            props.onDrop(props.text)
        }

        if (movingState == State.DROPPING) {
            setMovingState(State.DROPPED)
            props.onDrop(props.text)
        }

        if (movingState == State.DROPPED) {
            setMovingState(State.BEFORE_COLLAPSE)
        }
        
        if (movingState == State.BEFORE_COLLAPSE) {
            setMovingState(State.COLLAPSE)
        }

        if (movingState == State.COLLAPSE) {
            
            setMovingState(State.UPDATE_STACK)
        }

        if (movingState == State.UPDATE_STACK) {
            props.onAnimationCompleted()
            setMovingState(State.IDLE)
        }
    }

    const placeAnimatation =()=> {
        const x = Math.abs((cardRef.current as HTMLDivElement).getBoundingClientRect().x)
        const y = Math.abs((cardRef.current as HTMLDivElement).getBoundingClientRect().y)
        
        setAnimation(getAnimationDiv(x,y))
        setMovingState(State.MOVE_TO_POSITION)
    }

    return (
        <CardContainer
            isTurn={props.isTurn}
            background={CardImage(props.text)}
            highlight={props.available}
            visible={visible}
            drag 
            animate={makeAnimation(movingState)}
            transition={{duration: shouldHaveAnimationDuration(movingState)}}
            onMouseDown={onMouseDown}
            onClick={props.onClick}
            onDrag={e => onDragDetect(e as MouseEvent)}
            onAnimationComplete={onAnimationComplete}
            ref={cardRef}>
                {/* {props.text} */}
        </CardContainer>
    )
}

const CardContainer = styled(motion.div)<{visible: boolean, background: string, highlight: boolean, isTurn: boolean}>`
    width: 5vw;
    max-width: 4em;
    /* height: 50%; */
    /* overflow: visible; */
    border-radius: 3px;
    background-position: center; 
    background-color: white;
    aspect-ratio: 169/244;
    background-image: url(${props=>props.background});
    background-size: cover;
    background-repeat: no-repeat;
    border: ${props=>props.highlight ? "4px solid green" : "4px solid transparent"};
    pointer-events: ${props=>props.highlight && props.isTurn ? "auto" : "none"} ;
    box-shadow: var(--app-shadow);
    /* box-shadow: ${props=>props.isTurn ? "green 0px 0px 100px -10px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" : "var(--app-shadow)"}; */
    transition: box-shadow 0.3s;
`

export default Card;