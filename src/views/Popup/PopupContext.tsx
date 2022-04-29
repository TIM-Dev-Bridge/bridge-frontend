import { AnimatePresence } from 'framer-motion';
import React, { HTMLAttributes } from 'react';
import CreateTourPopup from './CreateTourPopup';

const PopupContext = React.createContext({
    popup: <></>,
    display: true,
    tourName: '',
    setPopup: (children: JSX.Element)=>{},
    setDisplay: (display: boolean) => {},
    setTourName: (tourName: string) => {},
    setMode: (mode: string)=> {}
})

export const PopupProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [popup, setPopup] = React.useState(<></>)
    const [display, setDisplay] = React.useState(false)
    const [tourName, setTourName] = React.useState('')
    const [mode, setMode] = React.useState('online')
    return (
        <PopupContext.Provider value={{popup, setPopup,display, setDisplay, tourName, setTourName, setMode}}>
            {/* {display && ( */}
                {/* <AnimatePresence> */}
                    <CreateTourPopup 
                        // initial={{opacity: 0}}
                        // animate={{opacity: 1}}
                        // exit={{opacity: 0}}
                        data-testid="create-tour-popup"
                        isVisible={display} 
                        tourName={tourName}
                        mode={mode}
                        onDismiss={
                        ()=> {
                            setDisplay(false)
                        }}
                    />    
                {/* </AnimatePresence> */}
            {/* )} */}
            {props.children}
        </PopupContext.Provider>
    )
}

export const usePopup =()=> React.useContext(PopupContext)