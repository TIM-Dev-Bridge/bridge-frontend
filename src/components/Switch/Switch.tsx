import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {ForwardRefComponent, HTMLMotionProps, motion, MotionProps, PanInfo} from 'framer-motion'

interface SwitchProps {
    onCheck: (isCheck: boolean)=>void
}

const Switch =(props: SwitchProps)=> {
    const [isOn, setIsOn] = React.useState(false)
    const constraintRef = React.useRef(null)
    const dragItemRef = React.useRef<HTMLDivElement>(null)
    const mouseDownPosition = React.useRef(0)
    const defaultSwitchPosition = React.useRef(0)
    const currentSwitchPosition = React.useRef(0)


    const variants = {
        on: {left: 98},
        off: {left: 2}
    }

    React.useEffect(()=> {
        props.onCheck(isOn)
    }, [isOn])

    const onMouseMove =(event: MouseEvent)=> {
        let delta = event.clientX - mouseDownPosition.current
        if (delta + defaultSwitchPosition.current >= 2 && delta + defaultSwitchPosition.current <= 25) {
            currentSwitchPosition.current = delta + defaultSwitchPosition.current
        }
        console.log(isOn)
    }

    const onMouseDown =(event: MouseEvent)=> {
        dragItemRef.current!.onmousemove = onMouseMove
        mouseDownPosition.current = event.clientX
        defaultSwitchPosition.current = parseFloat(dragItemRef.current!.style.left)
    }

    const onMouseLeave =()=> {
        dragItemRef.current!.onmousemove = null
    }

    return (
        <SwitchContainer onClick={()=> setIsOn(!isOn)} ref={constraintRef}>
            <Item>Active</Item>
            <Item>Ban</Item>
            <SliderSwitch
                text={isOn ? 'Ban' : 'Active'}
                variants={variants} 
                initial={isOn ? "on" : "off"} 
                animate={isOn ? "on" : "off"} 
                // drag dragConstraints={{left:0, right: 0, top: 0, bottom: 0}} 
                // dragElastic={0.2}
                // onMouseDown={onMouseDown}
                ref={dragItemRef}
                />
        </SwitchContainer>
    )
}


const SwitchContainer = styled(motion.div)`
    display: inline-flex;
    position: relative;
    flex-direction: row;
    gap: 10px;
    padding-left: 10px;
    padding-right: 10px;
    height: 32px;
    min-width: 200px;
    background-color: #f6f6f6;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.25);
`

const Item = styled.div`
    flex: 1;
    min-width: 0;
`

const SliderSwitchContainer = styled(motion.div)`
    position: absolute;
    /* left: 100; */
    /* right: 0; */
    box-shadow: var(--app-shadow);
    width: 50%;
    height: 28px;
    border-radius: 14px;
    background-color: white;
    text-align: center;
    vertical-align: middle;
    padding-top: 2px;
    padding-bottom: 2px;
    cursor: pointer;
    user-select: none;
`

interface SliderSwitchProps extends HTMLAttributes<HTMLDivElement> {
    text?: string
    variants: any
    initial: string
    animate: string
    ref: React.RefObject<HTMLDivElement>
}

const SliderSwitch =(props: SliderSwitchProps)=> {
    return (
        <SliderSwitchContainer
            variants={props.variants}
            initial={props.initial}
            animate={props.animate}
            ref={props.ref}>
            {props.text}
        </SliderSwitchContainer>
    )
}


export default Switch;