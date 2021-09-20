import React from 'react'
import PlaceholderImg from '../../../../assets/images/placeholder.png'

const Banner: React.FC =()=> {
    return (
        <div className="w-full overflow-hidden h-72">
            <img src={PlaceholderImg} alt="banner" className="w-full object-cover m-auto" />
        </div>
    )
}

export default Banner