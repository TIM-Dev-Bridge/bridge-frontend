import React from 'react'
import styled from 'styled-components'
import BiddingControl from './BiddingCotrol'

const BiddingPage =()=> {
    return (
        <BidContainer>
            <BiddingTable />
            <BiddingControl />
        </BidContainer>
    )
}

const BiddingTable =()=> {
    return (
        <Container>
            <HeaderItem>North</HeaderItem>
            <HeaderItem>East</HeaderItem>
            <HeaderItem>West</HeaderItem>
            <HeaderItem>South</HeaderItem>
            <BidItem>1</BidItem>
            <BidItem>2</BidItem>
            <BidItem>3</BidItem>
            <BidItem>4</BidItem>
            <BidItem>5</BidItem>
            <BidItem>6</BidItem>
        </Container>
    )
}

const BidContainer = styled.div`
    min-height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(24px);
    gap: 10px;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-auto-rows: 60px;
    box-shadow: var(--app-shadow);
    gap: 1px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    overflow: hidden;
    min-width: 800px;
    min-height: 400px;
`

const HeaderItem = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
`

const BidItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-color: white;
    margin-left: 20px;
    margin-right: 20px;
    box-shadow: var(--app-shadow);
    margin-bottom: 10px;
    height: 50px;
`

export default BiddingPage;