import React from 'react'
import styled from 'styled-components'
import DefaultPage from '../DefaultPage/DefaultPage'
import DefaultPlace from './DefaultPlace'

const Summary =()=> {
    return (
        <SummaryContainer>
            {/* <DefaultPlace place={0} placeText={''} detail={undefined} /> */}
            {/* <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace /> */}
        </SummaryContainer>
    )
}

const SummaryContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex-wrap: wrap;
`

export default Summary;
