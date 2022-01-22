import React from 'react'
import styled from 'styled-components'

const Winner =()=> {
    return (
        <WinnerContainer>
            <TeamIcon>A</TeamIcon>
            <ScoreDetail />
        </WinnerContainer>
    )
}

const WinnerContainer = styled.div`
    position: relative;
    width: 220px;
    height: 260px;
    background-color: white;
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
    position: absolute;
    border-radius: 16px;
    flex-direction: column;
    background-color: white;
    left: 20px;
    top: 20px;
    box-shadow: var(--app-shadow);
    padding: 16px;
`

const ScoreDetail =()=> {
    return (
        <ScoreContainer>
            <div>Winner</div>
            <Percent>78.88%</Percent>
            <Point>6.8 MPs</Point>
            <Player />
        </ScoreContainer>
    )
}

const Percent = styled.text`
    font-size: 48px;
`

const Point = styled.div`
    font-size: 24px;
`

const PlayerText = styled.div`
    font-size: 24px;
    font-weight: bold;
`

const PlayerContainer = styled.div`
    display: flex;
    flex-direction: column;
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

export default Winner;