import React, { HTMLAttributes } from 'react';
import CreateTourPopup from './CreateTourPopup';

const PopupContext = React.createContext({
    popup: <></>,
    display: true,
    tourName: '',
    setPopup: (children: JSX.Element)=>{},
    setDisplay: (display: boolean) => {},
    setTourName: (tourName: string) => {},
})

export const PopupProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [popup, setPopup] = React.useState(<></>)
    const [display, setDisplay] = React.useState(false)
    const [tourName, setTourName] = React.useState('')
    return (
        <PopupContext.Provider value={{popup, setPopup,display, setDisplay, tourName, setTourName}}>
            <CreateTourPopup 
                data-testid="create-tour-popup"
                isVisible={display} 
                tourName={tourName}
                onDismiss={
                ()=> {
                    setDisplay(false)
                }}
              />
            {props.children}
        </PopupContext.Provider>
    )
}

export const usePopup =()=> React.useContext(PopupContext)