import React from 'react'
import styled, { css } from 'styled-components'
import { FaHome } from "react-icons/fa";
import { TitleText } from '../../../components/Text/Text';

interface BackButtonProps {
    display: boolean
}

const BackButton =(props: BackButtonProps)=> {
    return (
        <BackButtonContainer display={props.display} onClick={()=> {
            window.history.back()
        }}>
            <TextContainer ><h1 color="text-white">Back To Main Menu</h1></TextContainer>
            <FaHome style={{color: "white"}} />
        </BackButtonContainer>
    )
}


const TextContainer = styled.div`
    /* visibility: hidden; */
    color: white;
    opacity: 0;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.4s;
    --wekit-transition: opacity 0.4s;
`

const BackButtonContainer = styled.div<{display: boolean}>`
    position: absolute;
    width: 70px;
    height: 70px;
    top: 5px;
    left: 5px;
    background-color: #19A1FB;
    display: flex;
    justify-content: center;
    align-content: center;
    gap: 0px;
    align-items: center;
    border-radius: 50%;
    z-index: 1;
    transition:  transform 0.4s, width 0.2s;
    --webkit-transition:  transform 0.4s, width 0.2s;
    border-radius: 35px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    &:hover {
        width: 300px;
        transition: width 0.3s;
        border-radius: 35px;
        gap: 20px;
    }

    &:hover ${TextContainer} {
        opacity: 1;
        width: 200px;
        transition: opacity 0.4s;
    }
    ${props=> props.display && css`
        transform: translateX(-90px);
        --webkit-transform: translateX(-90px);
        /* transition: transform 0.3s; */
    `}
    ${props=> !props.display && css`
        transform: translateX(0px);
        --webkit-transform: translateX(0px);
        /* transition: transform 0.3s; */
    `}
`


export default BackButton;