import React from 'react'
import styled from 'styled-components'

interface DefaultPlaceProps {
    pair_id: number,
    name1: string,
    name2: string,
    place: number
    placeText: string
    percent: string
    point: string
}

interface ScoreDetailProps {
    percent: string
    point: string
}

const DefaultPlace =(props: DefaultPlaceProps)=> {
    const placeToText =()=> {
        if (props.place % 10 == 1 && props.place != 11) {
            return props.place + "st"
        }

        if (props.place % 10 == 2  && props.place != 12) {
            return props.place + "nd"
        }

        if (props.place % 10 == 3  && props.place != 13) {
            return props.place + "rd"
        }

        return props.place + "th"
    }

    return (
        <WinnerContainer place={props.place}>
            <TeamIcon>{'TEAM : ' + props.pair_id}</TeamIcon>
            <RightContainer>
                <PlaceText>{placeToText() + " place"}</PlaceText>
                <ScoreDetail 
                    percent={props.percent + "%"} 
                    point={props.point + " MPs"}
                    playerA={props.name1}
                    playerB={props.name2}/>
            </RightContainer>
        </WinnerContainer>
    )
}

const gridTemplate =(place: number, rowPerColumn: number)=> {
    if (place == 1) {
        return {
            col_start: 1,
            col_end: 2,
            row_start: 1,
            row_end: 1
        }
    }

    return {
        col_start: Math.floor(place / (rowPerColumn + 1)) + 1,
        col_end: Math.floor(place / (rowPerColumn + 1)) + 1,
        row_start: place % rowPerColumn,
        row_end: place % rowPerColumn
    }
}

const WinnerContainer = styled.div<{place: number}>`
    display: flex;
    width: 80%;
    /* grid-column-start: ${props=>gridTemplate(props.place, 4).col_start};
    grid-column-end: ${props=>gridTemplate(props.place, 4).col_end};
    grid-row-start: ${props=>gridTemplate(props.place, 4).row_start};
    grid-row-end: ${props=>gridTemplate(props.place, 4).row_end}; */
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
    min-width: 40px;
    position: absolute;
    border-radius: 10px;
    background-color: white;
    box-shadow: var(--app-shadow);
    z-index: 111;
    left: 0;
    top: 10px;
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
    width: 100%;
    left: 20px;
    top: 20px;
    gap: 10px;
`

interface ScoreDetailProps {
    playerA: string
    playerB: string
    percent: string
    point: string
}

const ScoreDetail =(props: ScoreDetailProps)=> {
    return (
        <ScoreContainer>
            <div style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Percent>{props.percent}</Percent>
            <div style={{width: "1px", height: "80%", backgroundColor: "#eeeeee", marginRight: "30px"}}/>
            <Point>{props.point}</Point>
            <div style={{width: "1px", height: "80%", backgroundColor: "#eeeeee", marginRight: "30px"}}/>
            </div>
            <Player playerA={props.playerA} playerB={props.playerB}/>
        </ScoreContainer>
    )
}

const Percent = styled.text`
    font-size: 24px;
    margin-right: 30px;
`

const Point = styled.div`
    font-size: 20px;
    margin-right: 30px;
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
    margin-left: 100px;
`

interface SummaryPlayerProps {
    playerA: string
    playerB: string
}

const Player =(props: SummaryPlayerProps)=> {
    return (
        <PlayerContainer>
            <PlayerText>{props.playerA}</PlayerText>
            <PlayerText>{props.playerB}</PlayerText>
        </PlayerContainer>
    )
}

export default DefaultPlace;