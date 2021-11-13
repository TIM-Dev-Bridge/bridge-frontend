import React, { HTMLAttributes } from 'react'

export const AuthenContext = React.createContext({
    token: '',
    updateToken: (text: string)=>{}
})


export const AuthenProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [token, updateToken] = React.useState('')
    return (
        <AuthenContext.Provider value={{token, updateToken}}>{props.children}</AuthenContext.Provider>
    )
}