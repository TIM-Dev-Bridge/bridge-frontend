import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { TitleText } from '../../components/Text/Text'
import { PlayingTable } from '../../Service/SocketService'

interface MatchUpProps {
    tables: PlayingTable[]
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
                // Object.keys(props.matchup).map((key)=> {
                //     const table = props.matchup[key]
                //     return (
                //         <MatchUpTwoTeam table={table}/>
                //     )
                // })
                props.tables.map ( (table) => {
                    return <MatchUpTwoTeam table={table}/>
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

const MatchUpTwoTeam: FunctionComponent<{table: PlayingTable}> =({table})=> {
    // const teamA = table.split(',')[0]
    // const teamB = table.split(',')[1]
    return (
        <MatchUPContainer>
            <TeamNS direction={table.directions} />
            <CircleContainer>
                VS
            </CircleContainer>
            <TeamEW direction={table.directions} />
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

interface TeamNSProps {
    direction: {id: string, direction: number}[]
}

const TeamNS =(props: TeamNSProps)=> {
    return (
        <TeamNSContainer>
            <div>
                <TitleText>{props.direction.find( item => item.direction == 0)?.id ?? "" }</TitleText>
            </div>
            <div>
                <TitleText>{props.direction.find( item => item.direction == 2)?.id ?? ""}</TitleText>
            </div>
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

interface TeamEWProps {
    direction: {id: string, direction: number}[]
}

const TeamEW =(props: TeamEWProps)=> {
    return (
        <TeamEWContainer>
            <div>
                <TitleText>{props.direction.find( item => item.direction == 1)?.id ?? ""}</TitleText>
            </div>
            <div>
                <TitleText>{props.direction.find( item => item.direction == 3)?.id ?? ""}</TitleText>
            </div>
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