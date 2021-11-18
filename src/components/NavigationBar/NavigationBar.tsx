import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/images/bridge-logo.png'
import { useAuthen } from '../../Authen'
import { device } from '../../Device'
import { NavigationLink } from '../Router/NavigationLink'
import { navigate, useNavigator } from '../Router/Router'

const NavigationBar: React.FC =()=> {
    const authen = useAuthen()
    const navContext = useNavigator()
    return (
        <div className="h-14 top-0 sticky bg-white bg-opacity-80 backdrop-filter backdrop-blur-xl z-50">
            <NavbarArea>
                <MenuContainer>
                    <LogoContaniner>
                        <img src={Logo} alt="logo" style={{height: "32px", minWidth:"140px"}}/>
                    </LogoContaniner>
                    <MenuLinkItem>
                        <NavigationLink path={''} state={{}}>
                            Rules
                        </NavigationLink>
                    </MenuLinkItem>
                    <MenuLinkItem>
                        <NavigationLink path={''} state={{}}>
                            Match History
                        </NavigationLink>
                    </MenuLinkItem>
                </MenuContainer>
                <div className="flex items-end justify-center">
                    
                    {/* <div className="px-7 self-center text-appBlue">
                        Log in
                    </div> */}
                    <button className="bg-appBlue text-white px-10 h-10 rounded-md text-xs lg:text-base sm:text-sm"
                        onClick={()=> {
                            if (authen.authen.token === '') {
                                
                            }
                            else {
                                window.localStorage.removeItem('bridge-authen')
                                navigate(navContext, '/', {})
                            }
                        }}
                        >
                        { authen.authen.token === '' ? "Log in" : "Log out"}
                    </button>
                </div>
            </NavbarArea>
        </div>
    )
}

const LogoContaniner = styled.div`
    @media ${device.xs} {
        visibility: hidden;
        width: 0px;
    }
    @media ${device.sm} {
        visibility: visible;
        width: 140px;
    }
    @media ${device.lg} {
        visibility: visible;
        width: 140px;
    }
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
    text-align: center;
`

const MenuLinkItem = styled.div`
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
    color: #19A1FB;
    text-align: center;
    vertical-align: middle;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const NavbarArea = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    @media ${device.xs} {
        padding-left: 16px;
        padding-right: 16px;
    }
    @media ${device.sm} {
        padding-left: 80px;
        padding-right: 80px;
    }
    @media ${device.lg} {
        padding-left: 80px;
        padding-right: 80px;
    }
`
//h-full flex items-center px-16 justify-between shadow-sm 
export default NavigationBar