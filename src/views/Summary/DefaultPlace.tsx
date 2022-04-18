import React from 'react'
import styled from 'styled-components'

interface DefaultPlaceProps {
    place: number
    placeText: string
    detail: ScoreDetailProps
}

interface ScoreDetailProps {
    percent: string
    point: string
}

const DefaultPlace =(props: DefaultPlaceProps)=> {
    return (
        <WinnerContainer>
            <TeamIcon>A</TeamIcon>
            <RightContainer>
                <ScoreDetail />
                <PlaceText>4th place</PlaceText>
            </RightContainer>
        </WinnerContainer>
    )
}

const WinnerContainer = styled.div`
    display: flex;
    width: 200px;
    height: 200px;
    flex-direction: row;
    position: relative;
    background-color: white;
    justify-content: center;
    align-items: center;
    align-content: center;
`

const TeamIcon = styled.div`
    padding: 10px;
    height: 40px;
    width: 40px;
    position: absolute;
    border-radius: 10px;
    background-color: white;
    box-shadow: var(--app-shadow);
    z-index: 111;
    left: 0;
    top: 0;
`

const ScoreContainer = styled.div`
    display: flex;
    border-radius: 16px;
    flex-direction: row;
    background-color: white;
    box-shadow: var(--app-shadow);
    padding: 16px;
    gap: 20px;
`

const RightContainer = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    left: 20px;
    top: 20px;
    gap: 10px;
`

const ScoreDetail =()=> {
    return (
        <ScoreContainer>
            <div style={{display:"flex", flexDirection: "column"}}>
            <Percent>78.88%</Percent>
            <Point>6.8 MPs</Point>
            </div>
            <Player />
        </ScoreContainer>
    )
}

const Percent = styled.text`
    font-size: 24px;
`

const Point = styled.div`
    font-size: 20px;
`

const PlayerText = styled.div`
    font-size: 14px;
    font-weight: bold;
`

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const PlaceText = styled.div`
    font-size: 20px;
    font-weight: bold;
`

const Player =()=> {
    return (
        <PlayerContainer>
            <PlayerText>John</PlayerText>
            <div>&</div>
            <PlayerText>SAM</PlayerText>
        </PlayerContainer>
    )
}

export default DefaultPlace;