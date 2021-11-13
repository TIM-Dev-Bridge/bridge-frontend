import React from 'react'
import ModePreviewContainer from './components/ModePreviewContainer/ModePreviewContainer'
import Banner from './components/Banner/Banner'
import { AuthenContext } from '../../Authen'

const LandingPage: React.FC =()=> {
    const context = React.useContext(AuthenContext)
    React.useEffect(()=> {
        console.log(context.token)
    },[])

    return (
        <div className="flex-col pb-14">
            <Banner />
            <div className="flex items-start gap-10 mx-20 mt-14">
                <ModePreviewContainer />
                <ModePreviewContainer />
                <ModePreviewContainer />
                <ModePreviewContainer />
            </div>
        </div>
    )
}

export default LandingPage