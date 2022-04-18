import React, { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { PrimarySqButton } from '../../components/Button/Button'
import { navigate, useNavigator } from '../../components/Router/Router'
import { device } from '../../Device'
import { api } from '../../Service/ApiService'
import { useProfile } from '../UserProfile/ProfileContext'

const BoardPage: FunctionComponent<{max?: number}> =({max = 8})=> {
    const navigateContext = useNavigator()
    const profile = useProfile()
    const [posts, updatePostsList] = React.useState<{_id: string, creator: string, title: string, data: any}[]>([])
    // const posts = [
    //     {
    //         id: "1",
    //         title: "Post1",
    //         description: "hello test description from test post",
    //     },
    //     {
    //         id: "2",
    //         title: "Post2",
    //         description: "hello test description from test post",
    //     },
    //     {
    //         id: "3",
    //         title: "Post3",
    //         description: "hello test description from test post",
    //     },
    //     {
    //         id: "4",
    //         title: "Post4",
    //         description: "hello test description from test post",
    //     }
    // ]

    React.useEffect(()=> {
        window.scrollTo(0,0)
        // console.log("Profile", profile.profile)
        api.getAnnouncements(0, 8)
            .then( response => {
                console.log(response)
                updatePostsList(response.data)
            })
            .catch( error => {

            })
    }, [])

    return (
        <Container>
            { 
                profile.profile.access.toLowerCase() == "td" ? 
                <BoardToolBar>
                    <PrimarySqButton onClick={()=>{
                    navigate(navigateContext, '/admin-board', {})
                }}>
                        Create Post
                    </PrimarySqButton>
                </BoardToolBar> 
                : <></>
            }
            
                
            <InnerContainer>
            {
                posts.map((post, i) => <BoardCell {...post} time={post.data.time} preview={post.data.blocks[0].data.text} key={i} onClick={()=> { navigate(navigateContext, '/post', {post}, `id=${post._id}`)}}/> )
            }
            </InnerContainer>
        </Container>
    )
}

const BoardToolBar = styled.div`
    height: 60px;
    max-width: 720px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 15px;
    background-color: white;
    box-shadow: var(--app-shadow);
    margin: 0 auto;
    position: sticky;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    top: 0;
    margin-top: 15px;
    top: 70px;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 15px;
    margin-top: 15px;
    box-sizing: border-box;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 20px;
    justify-content: center;
    gap: 20px;
    /* align-items: center; */
    /* align-content: center; */
`

interface BoardCellProps extends HTMLAttributes<HTMLElement> {
    _id: string,
    title: string,
    creator: string,
    time: number,
    preview: string,
}


const BoardCell =(props: BoardCellProps)=> {

    const dateFormat =()=> {
        var d = new Date(props.time)
        return  d.toLocaleDateString()+ ' ' + d.toLocaleTimeString()
    }
    return (
        <BoardCellContainer onClick={props.onClick}>
            <BoardTitleContainer>
                <h1 style={{fontSize: "20px"}}>{props.title}</h1>
                <PreviewAndDateContainer>
                    <div style={{fontSize: "12px", maxHeight: "18px", textOverflow: "ellipsis", overflow: "hidden", lineClamp: 2, textAlign: "left"}}>
                        {props.preview}...
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                        <div style={{width: "100%"}}>
                        <p style={{fontWeight: 100, fontSize: "12px", width: "100%", textAlign: "right"}}>creator : {props.creator}</p>
                        </div>
                        <div>
                        <p style={{fontWeight: 100, fontSize: "12px"}}>date : {dateFormat()}</p>
                        </div>
                    </div>
                </PreviewAndDateContainer>
            </BoardTitleContainer>
        </BoardCellContainer>
    )
}

const BoardCellContainer = styled.div`
    display: flex;
    width: 100%;
    min-width: 320px;
    height: 100px;
    padding: 20px;
    cursor: pointer;
    &:hover {
        
    }
`

const BoardTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    width: 100%;
`

const PreviewAndDateContainer = styled.div`
    display: flex;
    align-content: end;
    align-items: end;
    justify-content: space-between;
    width: 100%;
`
//display: "flex", display: "-webkit-flex", justifyContent: "space-between", alignContent: "end", alignItems: "end", width: "100%"
export default BoardPage;