import React, { HTMLAttributes } from 'react'

export interface Profile {
    access: string,
    birth_date: string,
    display_name: string
    email: string
    first_name: string
    last_name: string
    password: string
}

export const getProfile = function(): Profile {
    if (window.localStorage.getItem('bridge-profile') == null) {
        return {
            access: '',
            birth_date: '',
            display_name: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        }
    }
    let out: Profile = {
        access: '',
        birth_date: '',
        display_name: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    }
    try {
        out = JSON.parse(window.localStorage.getItem('bridge-profile')!)
    } catch {
        return {
            access: '',
            birth_date: '',
            display_name: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
        }
    }
    return out
}

const currentProfile = getProfile()

export const ProfileContext = React.createContext({
    profile: {
        access: '',
        birth_date: '',
        display_name: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    },
    updateProfile: (profile: Profile)=>{}
})

const defaultProfile = {
    access: '',
    birth_date: '',
    display_name: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
}

export const ProfileProvider =(props: HTMLAttributes<HTMLElement>)=> {
    const [profile, updateProfile] = React.useState<Profile>(currentProfile)
    React.useEffect(()=> {
        window.localStorage.setItem('bridge-profile', JSON.stringify(profile))
        console.log("NEW PROFILE",profile)
    }, [profile])
    return (
        <ProfileContext.Provider value={{profile, updateProfile}}>{props.children}</ProfileContext.Provider>
    )
}

export const useProfile =()=> React.useContext(ProfileContext)