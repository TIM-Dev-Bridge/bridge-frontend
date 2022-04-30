import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { ProfileContext } from "../UserProfile/ProfileContext";
import LandingPage from "./LandingPage";
import TDLandingPage from "./TDLandingPage";

describe("Landing Page Test", ()=> {
    

    test("render", ()=> {
        render(<LandingPage />)
    })

    test("Correctly Link to Lobby", ()=> {
        const { container } = render(<TDLandingPage />)
        userEvent.click(screen.getByText('Online Plays'))
        expect(window.location.pathname = "/lobby")
    })

    // test("Correctly Link to Lobby", ()=> {
    //     const defaultProfile = {
    //         access: 'user',
    //         birth_date: '',
    //         display_name: '',
    //         email: '',
    //         first_name: '',
    //         last_name: '',
    //         password: '',
    //     }

    //     const MockedProfileProvider =(props)=> {
    //         const [profile, updateProfile] = React.useState(defaultProfile)
    //         React.useEffect(()=> {
    //         }, [])
    //         return (
    //             <ProfileContext.Provider value={{profile, updateProfile}}>{props.children}</ProfileContext.Provider>
    //         )
    //     }
    //     const { container } = render(
    //         <MockedProfileProvider>
    //             <LandingPage />
    //         </MockedProfileProvider>
    //     )
    //     userEvent.click(screen.getAllByText(`Let's see`)[0])
    //     expect(window.location.pathname = "/board")
    // })

    // test("Correctly Link to Board when click Create Post", ()=> {
    //     const defaultProfile = {
    //         access: 'admin',
    //         birth_date: '',
    //         display_name: '',
    //         email: '',
    //         first_name: '',
    //         last_name: '',
    //         password: '',
    //     }

    //     const MockedProfileProvider =(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; })=> {
    //         const [profile, updateProfile] = React.useState(defaultProfile)
    //         React.useEffect(()=> {
    //         }, [])
    //         return (
    //             <ProfileContext.Provider value={{profile, updateProfile}}>{props.children}</ProfileContext.Provider>
    //         )
    //     }
    //     const { container } = render(
    //         <MockedProfileProvider>
    //             <TDLandingPage />
    //         </MockedProfileProvider>
    //     )
    //     userEvent.click(screen.getByText('Create Post'))
    //     expect(window.location.pathname = "/admin-board")
    // })
})