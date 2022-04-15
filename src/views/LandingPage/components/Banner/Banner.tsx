import React from 'react'
import styled from 'styled-components'
import PlaceholderImg from '../../../../assets/images/placeholder.png'

const Banner: React.FC =()=> {
    return (
        <BannderContainer>
            <img src={PlaceholderImg} alt="banner" className="w-full object-cover m-auto" />
        </BannderContainer>
    )
}

const BannderContainer = styled.div`
    width: 100%;
    overflow: hidden;
    height: 50vh;
    top: 0;
    position: absolute;
    z-index: -1;
`

export default Banner