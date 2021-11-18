import React, { HTMLAttributes } from 'react'

const getKey =(): { token: string, username: string }=> {
    if (window.localStorage.getItem('bridge-authen') == null) {
        return {
            token: '',
            username: '',
        }
    }
    let out: {token: string, username: string} = {
        token: '',
        username: ''
    }
    try {
        out = JSON.parse(window.localStorage.getItem('bridge-authen')!)
    } catch {
        return {
            token: '',
            username: '',
        }
    }
    return out
}

const key = getKey()

export const AuthenContext = React.createContext({
    authen: {
        token:  key.token  ,
        username: key.username  ,
    },
    updateToken: (authen: {token: string, username: string})=>{}
})

export const AuthenProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [authen, updateToken] = React.useState<{token:string, username: string}>({token: key.token, username: key.username})
    React.useEffect(()=> {
        window.localStorage.setItem('bridge-authen', JSON.stringify(authen))
    }, [authen])
    return (
        <AuthenContext.Provider value={{authen, updateToken}}>{props.children}</AuthenContext.Provider>
    )
}

export const useAuthen =()=> React.useContext(AuthenContext)