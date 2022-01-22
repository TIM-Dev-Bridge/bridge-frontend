import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'
import BsSuitSpade, { BsSuitClub, BsSuitClubFill, BsSuitDiamondFill, BsSuitHeartFill, BsSuitSpadeFill } from 'react-icons/bs'

const BiddingControl =()=> {
    const initLevel = [false, false, false, false, false, false, false]
    const initSuite : {[key: string] : boolean} = {
        'S' : false,
        'H' : false,
        'D' : false,
        'C' : false,
        'NT' : false,
    }
    const [bidableLvl, setLvlToBid] = React.useState(initLevel)
    const [bidableSuite, setSuiteToBid] = React.useState(initSuite)
    const [selectedSuite, setSelectedSuite] = React.useState(initSuite)
    const [selectedLevel, setSelectedLevel] = React.useState(initLevel)
    React.useEffect(()=> {
        setLvlToBid(lvlToBid())
    }, [])
    return (
        <Container>
            <RightColumn>
                <Pass enabled={true}>Pass</Pass>
                {
                    Array.from({length: 7}, (_, i) => i + 1).map(num => 
                        <Item 
                            onClick={()=> {
                                setSelectedSuite(initSuite)
                                setSelectedLevel(selectLvl(num))
                                setSuiteToBid(suiteToBid(num))
                            }}
                            style={{border: selectedLevel[num] ? "1px solid blue" : ""}} 
                            enabled={bidableLvl[num]}>{num}</Item> )
                }
                <Double enabled={true}>Double</Double>
                <TrumpContainer>
                    <Item enabled={bidableSuite['C']} onClick={()=> setSelectedSuite(selectSuite('C'))} style={{border: selectedSuite['C'] ? "1px solid blue" : ""}}><BsSuitClubFill /></Item>
                    <Item enabled={bidableSuite['D']} onClick={()=> setSelectedSuite(selectSuite('D'))} style={{border: selectedSuite['D'] ? "1px solid blue" : ""}}><BsSuitDiamondFill style={{color: bidableSuite['D'] ? "red" :  "rgba(255, 0, 0, 0.3)" }}/></Item>
                    <Item enabled={bidableSuite['H']} onClick={()=> setSelectedSuite(selectSuite('H'))} style={{border: selectedSuite['H'] ? "1px solid blue" : ""}}><BsSuitHeartFill style={{color: bidableSuite['H'] ? "red" :  "rgba(255, 0, 0, 0.3)" }}/></Item>
                    <Item enabled={bidableSuite['S']} onClick={()=> setSelectedSuite(selectSuite('S'))} style={{border: selectedSuite['S'] ? "1px solid blue" : ""}}><BsSuitSpadeFill /></Item>
                    <NoTrump enabled={bidableSuite['NT']} onClick={()=> setSelectedSuite(selectSuite('NT'))} style={{border: selectedSuite['NT'] ? "1px solid blue" : ""}}>No-Trump</NoTrump>
                </TrumpContainer>
            </RightColumn>
        </Container>
    )
}

const lvlToBid =()=> {
    const lastBid = "3_D"
    const suite = lastBid.split("_")[1]
    const lvl = lastBid.split('_')[0]

    var availableLevel = []
    for (var i = 0; i < 8; i++) {
        if (i < parseInt(lvl)) {
            availableLevel.push(false)
        }
        else {
            availableLevel.push(true)
        }
    }
    return availableLevel
}

const cardSuite : {[key: string] : number} = {
    'NT' : 4,
    'S' : 3,
    'H' : 2,
    'D' : 1,
    'C' : 0,
}

const suiteToBid =(selectLvl : number)=> {
    const lastBid = "3_D"
    const suite = lastBid.split("_")[1]
    const lvl = lastBid.split('_')[0]
    var availableSuite : {[key: string] : boolean} = {
        'S': cardSuite['S'] >= cardSuite[suite],
        'H': cardSuite['H'] >= cardSuite[suite],
        'D': cardSuite['D'] >= cardSuite[suite],
        'C': cardSuite['C'] >= cardSuite[suite],
        'NT': cardSuite['NT'] >= cardSuite[suite],
    }

    if (selectLvl == parseInt(lvl)) {
        availableSuite = {
            'S': cardSuite['S'] >= cardSuite[suite],
            'H': cardSuite['H'] >= cardSuite[suite],
            'D': cardSuite['D'] >= cardSuite[suite],
            'C': cardSuite['C'] >= cardSuite[suite],
            'NT': cardSuite['NT'] >= cardSuite[suite],
        }
        availableSuite[suite] = false
    }
    else {
        availableSuite = {
            'NT' : true,
            'S' : true,
            'H' : true,
            'D' : true,
            'C' : true,
        }
    }
    return availableSuite
}

const selectSuite =(suite: string)=> {
    var selected : {[key: string] : boolean} = {
        'S': 'S' == suite,
        'H': 'H' == suite,
        'D': 'D' == suite,
        'C': 'C' == suite,
        'NT': 'NT' == suite,
    }
    return selected
}

const selectLvl =(lvl: number)=> {
    var level = [false, false, false, false, false, false, false]
    level[lvl] = true
    return level
}

const Container = styled.div`
    border-radius: 16px;
    background-color: white;
    max-width: 550px;
    background-color: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    box-shadow: var(--app-shadow);
    display: flex;
    flex-direction: row;
    padding: 10px;
`

const ActionColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const RightColumn = styled.div`
    display: grid;
    grid-template-columns: repeat(9,1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 10px;
`


const TrumpContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column: 3 / span 7;
`

const Item = styled.div<{enabled: boolean}>`
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => !props.enabled ? 'gainsboro' : 'white'};
    color : ${props => !props.enabled ? 'darkgray' : 'black'};
    border-radius: 16px;
    box-shadow: var(--app-shadow);
    pointer-events: ${props => !props.enabled ? 'none' : 'auto'};
`

const NoTrump = styled(Item)`
    grid-column: 5 / span 3;
    width: 100%;
    height: 100%;
`

const Pass = styled(Item)`
    grid-column: 1 / span 2;
    width: 100%;
    height: 100%;
`

const Double = styled(Item)`
    grid-row: 2;
    grid-column: 1 / span 2;
    width: 100%;
    height: 100%;
`

export default BiddingControl;