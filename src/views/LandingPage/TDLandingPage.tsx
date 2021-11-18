import React from 'react'
import {ModePreviewContainer, LocalModePreviewContainer } from './components/ModePreviewContainer/ModePreviewContainer'
import Banner from './components/Banner/Banner'
import { AuthenContext } from '../../Authen'
import { NavigationLink } from '../../components/Router/NavigationLink'

const TDLandingPage: React.FC =()=> {
    const context = React.useContext(AuthenContext)
    React.useEffect(()=> {
        console.log(context.authen.token)
    },[])

    return (
        <div className="flex-col pb-14 items-center justify-center contents-center">
            <Banner />
            <div className="" style={{margin:"0 auto", width: "80%"}}>
                <div className="flex flex-col items-center justify-center gap-10 mx-20 mt-14 sm:flex-col md:flex-row">
                    <NavigationLink path={'/lobby'} state={{}} > 
                        <ModePreviewContainer title="Online Plays"/>
                    </NavigationLink>
                    <LocalModePreviewContainer title="Local Plays"/>
                </div>
            </div>
        </div>
    )
}

export default TDLandingPage