import React from 'react'
import Logo from '../../assets/images/bridge-logo.png'

const NavigationBar: React.FC =()=> {
    return (
        <div className="h-14">
            <div className="h-full flex items-center px-16 justify-between shadow-sm">
                <div className="flex items-start justify-center">
                    <div>
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className="px-7 self-center text-appBlue">
                        Play Online
                    </div>
                    <div className="px-7 self-center text-appBlue">
                        Rules
                    </div>
                    <div className="px-7 self-center text-appBlue">
                        Match History
                    </div>
                </div>
                <div className="flex items-end justify-center">
                    <div className="px-7 self-center text-appBlue">
                        My Balance
                    </div>
                    
                    {/* <div className="px-7 self-center text-appBlue">
                        Log in
                    </div> */}
                    <button className="bg-appBlue text-white px-10 h-10 rounded-md">
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar