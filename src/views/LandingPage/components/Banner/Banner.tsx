import React from 'react'
import styled from 'styled-components'
import PlaceholderImg from '../../../../assets/images/placeholder.png'
import onlineplaybg from '../../../../assets/GIF/onlineplaybg.gif'
import { motion } from 'framer-motion'

interface BannerProps {
    modes?: string[]
    titleToDisplay?: number | null
}

const Banner =(props: BannerProps)=> {
    const [blurPx, setBlurPx] = React.useState(4)

    React.useEffect(()=> {
        document.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const handleScroll =(event: Event)=> {
        setBlurPx(((1/6)* window.scrollY) + 1)
    }

    const displayVariants = {
        initial:{x: 40, opacity: 0, transition: {duration: 0.2}},
        display:{x: 0, opacity: 1}
    }

    const shouldAnimate =(title: string)=> {
        if (props.titleToDisplay == undefined) {
            return "initial"
        }
        if (props.titleToDisplay == null ) {
            return "initial"
        }
        if (props.modes?.[props.titleToDisplay] != title) {
            return "initial"
        }

        return "display"
    }

    const shouldDisplay =()=> {
        if (props.titleToDisplay == undefined) {
            return 0
        }
        if (props.titleToDisplay == null ) {
            return 0
        }

        return 24
    }

    return (
        <BannderContainer>
            <BlurFilter blurPx={blurPx}/>
            <ModeTitle blurPx={shouldDisplay()}>
                {props.modes?.map( 
                    (val, index)=><TitleText
                            key={index}
                            variants={displayVariants}
                            animate={shouldAnimate(val)}>{val}</TitleText>)}
                {/* <TitleText>Online Plays</TitleText> */}
            </ModeTitle>
            <img src={onlineplaybg} alt="banner" className="w-full object-cover m-auto"/>
            
        </BannderContainer>
    )
}

const BannderContainer = styled.div`
    width: 100%;
    overflow: hidden;
    height: 50vh;
    top: 0;
    position: absolute;
    z-index: -1;
    position: relative;
`

const ModeTitle = styled(motion.div)<{blurPx: number}>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(${props=>props.blurPx}px);
    transition: all 0.3s;
    /* display: flex;
    justify-content: center;
    align-items: center;
    align-content: center; */
`

const BlurFilter = styled(motion.div)<{blurPx: number}>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(${props=>props.blurPx}px);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`

const TitleText = styled(motion.div)`
    text-align: center;
    font-size: 4em;
    font-weight: 1000;
    position: absolute;
    width: 100%;
`

export default Banner