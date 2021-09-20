import React from 'react'
import ModePreviewContainer from './components/ModePreviewContainer/ModePreviewContainer'
import Banner from './components/Banner/Banner'

const LandingPage: React.FC =()=> {
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