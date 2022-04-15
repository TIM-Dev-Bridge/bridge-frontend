import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { TitleText } from '../../components/Text/Text'

interface MatchUpProps {
    matchup: {[key: string]:string}
}

const MatchUpView =(props: MatchUpProps)=> {
    // const matchup: {[key: string]:string} = { 
    //     table0: 'Team0,Team3',
    //     table1: 'Team1,Team4',
    //     table2: 'Team2,Team5'
    // }
    

    return (
        <Container id="Match-up-view">
            <TitleText big>Round 1</TitleText>
            {
                Object.keys(props.matchup).map((key)=> {
                    const table = props.matchup[key]
                    return (
                        <MatchUpTwoTeam table={table}/>
                    )
                })
            }
        </Container>
    )
}

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
`

const MatchUpTwoTeam: FunctionComponent<{table: string}> =({table})=> {
    const teamA = table.split(',')[0]
    const teamB = table.split(',')[1]
    return (
        <MatchUPContainer>
            <TeamNS team_a={teamA} />
            <CircleContainer>
                VS
            </CircleContainer>
            <TeamEW team_b={teamB} />
        </MatchUPContainer>
    )
}

const MatchUPContainer = styled.div`
    display: flex;
    height: 80px;
    width: 70%;
    gap: 10px;
    align-self: center;
    justify-content: space-between;
    margin-left: 5px;
`

const TeamNS: FunctionComponent<{team_a:string}> =({team_a})=> {
    return (
        <TeamNSContainer>
            <div>
                <TitleText>{team_a}</TitleText>
            </div>
            {/* <div>
                <TitleText>{team_b}</TitleText>
            </div> */}
        </TeamNSContainer>
    )
}

const TeamNSContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    box-shadow: var(--app-shadow);
    width: 50%;
    justify-content: center;
    background-color: #0AC3EE;
`

const TeamEW :FunctionComponent<{team_b:string}> =({team_b})=> {
    return (
        <TeamEWContainer>
            <div>
                <TitleText>{team_b}</TitleText>
            </div>
            {/* <div>
                <TitleText>{user_b}</TitleText>
            </div> */}
        </TeamEWContainer>
    )
}

const TeamEWContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: var(--app-shadow);
    width: 50%;
    justify-content: center;
    background-color: #E555A0;
`

const CircleContainer = styled.div`
    height: 80px;
    width: 80px;
    border-radius: 40px;
    display: flex;
    position: absolute;
    left: calc(50% - 45px);
    box-shadow: var(--app-shadow);
    background-color: white;
    justify-content: center;
    text-align: center;
    align-items: center;
`

export default MatchUpView;