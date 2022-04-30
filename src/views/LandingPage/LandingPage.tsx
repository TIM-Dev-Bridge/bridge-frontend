import React from 'react'
import {ModePreviewContainer, LocalModePreviewContainer } from './components/ModePreviewContainer/ModePreviewContainer'
import Banner from './components/Banner/Banner'
import { AuthenContext } from '../../Authen'
import { NavigationLink } from '../../components/Router/NavigationLink'
import CreateTourPopup from '../Popup/CreateTourPopup'
import styled from 'styled-components'
import { device } from '../../Device'
import BoardPage from '../Board/Board'
import { usePopup } from '../Popup/PopupContext'
import { useProfile } from '../UserProfile/ProfileContext'
import { navigate, useNavigator } from '../../components/Router/Router'

const LandingPage: React.FC =()=> {
    const context = React.useContext(AuthenContext)
    const popup = usePopup()
    const profile = useProfile()
    const [modes, setModes] = React.useState<string[]>([])
    const navigateContent = useNavigator()
    const [titleToDisplay, setTitleToDisplay] = React.useState<number | null>(null)
    React.useEffect(()=> {
        console.log(context.authen.token)
        if (profile.profile.access == 'user') {
            setModes(['Online Plays', 'Local Plays', 'Board'])
        }
        return
    },[])
    const [displayDialog, setDialogDisplay] = React.useState(false);

    const MenuListByRole =(): JSX.Element => {
        if (profile.profile.access == 'user') {
            return (
                <MenuList>
                    <ModePreviewContainer 
                        onMouseEnter={()=> setTitleToDisplay(0)}
                        onMouseLeave={()=> setTitleToDisplay(null)}
                        title="Online Plays" to="/lobby" state={{}} key="online-plays"/>
                    <LocalModePreviewContainer 
                        onMouseEnter={()=> setTitleToDisplay(1)}
                        onMouseLeave={()=> setTitleToDisplay(null)}
                        to="/lobby" 
                        state={{}} 
                        onClick={()=> {
                            navigate(navigateContent, '/lobby', {})
                        }} 
                        title="Local Plays"
                        key="local-plays"
                        />
                    <ModePreviewContainer 
                        onMouseEnter={()=> setTitleToDisplay(2)}
                        onMouseLeave={()=> setTitleToDisplay(null)}
                        title="Board" to="/board" state={{}} key="board" buttonTitle="let's see" description="Let's see what's new today!"/>
                </MenuList>
            )
        }
        else if (profile.profile.access.toLowerCase() == 'td') {
            return (
                <MenuList>
                    {/* <ModePreviewContainer 
                        title="Announcement" 
                        description="Announce things, deliver important infomation to every user" 
                        to="/board" 
                        state={{}} 
                        key="online-plays"
                        buttonTitle="Create"
                        /> */}

                    <ModePreviewContainer 
                        layoutId='create-tour-popup'
                        title="Tournament" 
                        description="Manage tournament for both ongoing tournaments and Finished tournaments." 
                        // to="/lobby" 
                        state={{}} 
                        key="tour"
                        buttonTitle="Browse"
                        onClick={()=> {
                            // popup.setTourName('')
                            // popup.setMode("online")
                            // popup.setDisplay(true)
                            navigate(navigateContent, '/lobby', {})
                        }} 
                        />
                    <ModePreviewContainer 
                        layoutId='create-tour-popup'
                        title="Local" 
                        description="Manage tournament for  both ongoing tournaments and Finished tournaments." 
                        // to="/lobby" 
                        state={{}} 
                        key="tour"
                        buttonTitle="Create"
                        onClick={()=> {
                            popup.setTourName('')
                            popup.setMode("local")
                            popup.setDisplay(true)
                        }} 
                        />
                </MenuList>
            )
        }

        else if (profile.profile.access.toLowerCase() == 'admin') {
            return (
                <MenuList>
                    <ModePreviewContainer 
                        title="Announcement" 
                        description="Announce things, deliver important infomation to every user" 
                        to="/admin-board" 
                        state={{}} 
                        key="board"
                        buttonTitle="Create"
                        />
                    <ModePreviewContainer 
                        title="Users Management" 
                        description="Manage users permission including Player, Tounament Director and Administrator permission." 
                        to="/user-manage" 
                        state={{}}
                        key="user"
                        buttonTitle="Manage"
                        />
                    {/* <ModePreviewContainer 
                        title="Back-Up Data" 
                        description="Back-Up Data in current Database in Various from of Storages." 
                        state={{}} 
                        key="backup"
                        buttonTitle="BackUp"
                        /> */}
                </MenuList>
            )
        }

        return (
            <></>
        )
    }

    return (
        <Container>
            <Banner modes={modes} titleToDisplay={titleToDisplay}/>
            <MenuContainer>
                <MenuListByRole />
            </MenuContainer>
            <BoardPage />
            
            {/* <CreateTourPopup tourName="tour-f1" isVisible={displayDialog} onDismiss={()=> setDialogDisplay(!displayDialog)}/> */}
        </Container>
    )
}

const Container = styled.div`
    min-height: calc(100vh - 56px);
    overflow: scroll;
`

const MenuContainer = styled.div`
    height: 300px;
    /* min-height: calc(100vh - 56px); */
    margin-left:  auto;
    margin-top: -50px;
`

const MenuList = styled.div`
    display: grid;
    min-height: calc(100vh - 56px);
    grid-template: repeat(auto-fit, 200px) / repeat( auto-fit, minmax(300px, 1fr));
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    gap: 40px;
`


export default LandingPage