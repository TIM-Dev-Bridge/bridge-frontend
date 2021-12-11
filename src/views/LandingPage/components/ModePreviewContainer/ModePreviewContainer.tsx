import React from 'react'
import styled from 'styled-components'
import PlaceholderImg from '../../../../assets/images/placeholder.png'
import { NavigationLink } from '../../../../components/Router/NavigationLink'
import TextField from '../../../../components/TextField/TextField'
import TextFieldNoWarning from '../../../../components/TextField/TextFieldNoWarning'

interface ModePreviewContainerProps {
    img?: string
    title?: string
    description?: string
    buttonTitle?: string
    onClick?: ()=>void
    to?: string
    state: {}
}

export const ModePreviewContainer: React.FC<ModePreviewContainerProps> =(props: ModePreviewContainerProps)=> {
    return (
        <Container>
            
            <div className="overflow-hidden h-full">
                <img src={PlaceholderImg} className="object-contain"/>
            </div>
            <div className="relative px-10 py-4 h-full">
                <div className="p-4 overflow-hidden">
                    <h2 className="font-extrabold text-lg">{props.title}</h2>
                    <p className="font-light text-sm">{props.description ? props.description : `Play with other skilled players without any cost learning new techniques and more!` }</p>
                </div>
                <BottomContainer>
                    {
                        props.to ? 
                        <NavigationLink path={props.to ?? undefined} state={props.state} > 
                            <PrimaryButton onClick={props.onClick}>
                                {props.buttonTitle == undefined ? "Play" : props.buttonTitle}
                            </PrimaryButton>
                        </NavigationLink> :
                        <PrimaryButton onClick={props.onClick}>
                            {props.buttonTitle == undefined ? "Play" : props.buttonTitle}
                        </PrimaryButton>
                    }
                    
                </BottomContainer>
            </div>
            
        </Container>
    )
}

export const LocalModePreviewContainer: React.FC<ModePreviewContainerProps> =(props: ModePreviewContainerProps)=> {
    return (
        <Container>
            <div className="overflow-hidden h-full">
                <img src={PlaceholderImg} className="object-cover"/>
            </div>
            <div className="relative px-10 py-4 h-full">
                <div className="p-4 overflow-hidden">
                    <h2 className="font-extrabold text-lg">{props.title}</h2>
                    <p className="font-light text-sm">Join an offline tournament to prove your skills. play face to face on real location for real experience </p>
                </div>
                <BottomContainer>
                    <TextFieldNoWarning placeholder="Room ID"/>
                    <div className="w-4"></div>
                    <SecondaryButton
                        onClick={props.onClick}
                    >
                    {props.buttonTitle == undefined ? "Play" : props.buttonTitle}
                    </SecondaryButton>
                </BottomContainer>
            </div>
            
        </Container>
    )
}

const Container = styled.div`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-height: 400px;
    align-self: center;
    background-color: white;
    border-radius: 16px;
    display: flex;
    /* height: 60vh; */
    /* min-width: 300px; */
    /* width: 400px; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    /* aspect-ratio:  3 / 4; */
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
const PrimaryButton = styled.div`
    background-color: white;
    background-color: var(--main-color-blue);
    color: white;
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid var(--main-color-blue);
    transition: background-color 0.1s;
    &:hover {
        background-color: white;
        transition: background-color 0.1s;
        color: var(--main-color-blue);
    }
`

const SecondaryButton = styled.div`
    background-color: white;
    color: var(--main-color-blue);
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 5px;
    border: 1px solid var(--main-color-blue);
    transition: background-color 0.1s;
    &:hover {
        background-color: var(--main-color-blue);
        transition: background-color 0.1s;
        color: white
    }
`

const BottomContainer = styled.div`
    position: absolute;
    bottom: 15px;
    width: calc(100% - 80px);
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
`
