import React, { HTMLAttributes } from 'react'

const authenJSON = ""

export const AuthenContext = React.createContext({
    authen: {
        token:  authenJSON == "" ? "" : authenJSON ,
        username: authenJSON == "" ? "" : authenJSON  ,
    },
    updateToken: (authen: {token: string, username: string})=>{}
})

export const AuthenProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [authen, updateToken] = React.useState<{token:string, username: string}>({token: "", username: ''})
    React.useEffect(()=> {
        window.localStorage.setItem('bridge-authen', JSON.stringify(authen))
    }, [authen])
    return (
        <AuthenContext.Provider value={{authen, updateToken}}>{props.children}</AuthenContext.Provider>
    )
}

export const useAuthen =()=> React.useContext(AuthenContext)