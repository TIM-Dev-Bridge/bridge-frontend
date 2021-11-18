import React from 'react'
import {ModePreviewContainer, LocalModePreviewContainer } from './components/ModePreviewContainer/ModePreviewContainer'
import Banner from './components/Banner/Banner'
import { AuthenContext } from '../../Authen'
import { NavigationLink } from '../../components/Router/NavigationLink'
import CreateTourPopup from '../Popup/CreateTourPopup'
import styled from 'styled-components'
import { device } from '../../Device'

const LandingPage: React.FC =()=> {
    const context = React.useContext(AuthenContext)
    React.useEffect(()=> {
        console.log(context.authen.token)
    },[])
    const [displayDialog, setDialogDisplay] = React.useState(false);

    return (
        <Container>
            <MenuContainer>
                <MenuList>
                    <ModePreviewContainer title="Online Plays" to="/lobby" state={{}}/>
                    <LocalModePreviewContainer to="/lobby" state={{}} onClick={()=> {
                        setDialogDisplay(!displayDialog)
                    }} title="Local Plays"/>
                    <LocalModePreviewContainer to="/lobby" state={{}} onClick={()=> {
                        setDialogDisplay(!displayDialog)
                    }} title="Local Plays"/>
                </MenuList>
            </MenuContainer>
            <Banner />
            <CreateTourPopup isVisible={displayDialog} onDismiss={()=> setDialogDisplay(!displayDialog)}/>
        </Container>
    )
}

const Container = styled.div`
    min-height: calc(100vh - 56px);
    overflow: scroll;
`

const MenuContainer = styled.div`
    height: 100%;
    min-height: calc(100vh - 56px);
    margin: 0 auto;
`

const MenuList = styled.div`
    display: grid;
    min-height: calc(100vh - 56px);
    grid-template: repeat( auto-fit, minmax(300px, 1fr) ) / repeat( auto-fit, minmax(300px, 1fr));
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    gap: 40px;
`


export default LandingPage