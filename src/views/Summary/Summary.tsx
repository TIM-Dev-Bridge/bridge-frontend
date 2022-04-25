import React from 'react'
import styled from 'styled-components'
import { SummaryRank } from '../Bidding/UsePlaying'
import DefaultPage from '../DefaultPage/DefaultPage'
import DefaultPlace from './DefaultPlace'

interface SummaryProps {
    summaryRank: SummaryRank[]
}

const Summary =(props: SummaryProps)=> {
    // const [sortedRank, setSortedRank] = 
    //     React.useState<SummaryRank[]>(props.summaryRank.sort((a,b)=> {
    //             if (a.totalMP > b.totalMP) {
    //                 return 1
    //             }
    //             return -1
    //         }
    //     ))
    
    // React.useEffect(()=> {
    //     console.log(sortedRank, props.summaryRank)
    //     // setSortedRank(props.summaryRank)
    // }, [props.summaryRank])

    const mockRank: SummaryRank[] = [
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        },
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        },
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        },
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        },
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        },
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
        ,
        {
            pair_id: 4, 
            name1: "string", 
            name2: "string", 
            totalMP: 4, 
            rankPercent: 4
        }
    ]

    return (
        <SummaryContainer teamSize={props.summaryRank.length} rowPerColumn={4}>
            <ScrollContent>
            {props.summaryRank.sort((a,b)=> {
                if (a.totalMP > b.totalMP) { return 1}
                return -1
            })
            
                .map( (item, index) => 
                <DefaultPlace 
                    key={index} 
                    place={index + 1} 
                    placeText={''} 
                    percent={item.rankPercent.toString()} 
                    point={item.totalMP.toString()} 
                    pair_id={item.pair_id}
                    name1={item.name1}
                    name2={item.name2}/>)}
                    
            {/* <DefaultPlace place={0} placeText={''} percent={"PER"} point={"POIN"} /> */}
            {/* <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace />
            <DefaultPlace /> */}
            </ScrollContent>
        </SummaryContainer>
    )
}



const SummaryContainer = styled.div<{teamSize: number, rowPerColumn: number}>`
    /* display: grid;
    grid-template-columns: repeat(${props=> Math.floor(props.teamSize / props.rowPerColumn) + 1}, 1fr);
    grid-template-rows: repeat(${props=>props.rowPerColumn}, 1fr); */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: white;
    /* position: relative; */
    /* flex-direction: column; */
    /* flex-wrap: wrap; */
`

const ScrollContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    min-width: 100%;
    min-height: min-content;
    /* overflow: auto; */
    /* position: relative; */
    /* flex-direction: column; */
    /* flex-wrap: wrap; */
`

export default Summary;
