import { render, screen } from "@testing-library/react";
import { LobbyPage } from "./Lobby";
import {act, renderHook} from '@testing-library/react-hooks'
import userEvent from "@testing-library/user-event";
import { ProfileContext, ProfileProvider } from "../UserProfile/ProfileContext";
import React, { HTMLAttributes } from "react";
import axios from 'axios'


Element.prototype.scrollIntoView = jest.fn();

describe('Lobby Test', ()=> {
    beforeAll(()=> {
        
    })

    test('Render', ()=> {
        render(<LobbyPage />)
    })

    test('Have Title', ()=> {
        const { container } = render(<LobbyPage />)
        expect(container).toHaveTextContent("Available Match")
    })

    test('Have Chat', ()=> {
        const { container } = render(<LobbyPage />)
        expect(container).toHaveTextContent("Tournament Chat")
    })

    test("Resize event", ()=> {
        render(<LobbyPage />)
        global.innerWidth = 500;
        // Trigger the window resize event.
        global.dispatchEvent(new Event('resize'));
    })

    test("Display tour list", async()=> {

        await act( async()=> {
            render(<LobbyPage />)
        })
        expect(await screen.findAllByTestId('tbody-list', {}, {timeout: 3000})).toHaveLength(1)
    })

    test("Display tour room", async()=> {
        await act( async()=> {
            render(<LobbyPage />)
            expect(await screen.findAllByTestId('tbody-list')).toHaveLength(1)
            userEvent.click(screen.getAllByTestId('tbody-list')[0])
        })
        expect(await screen.findByTestId('tour-room-container')).toHaveStyle('opacity: 1')
    })

    test("Display create tour popup list when role is TD", async()=> {
        await act( async()=> {
            const defaultProfile = {
                access: 'TD',
                birth_date: '',
                display_name: '',
                email: '',
                first_name: '',
                last_name: '',
                password: '',
            }

            const MockedProfileProvider =(props)=> {
                const [profile, updateProfile] = React.useState(defaultProfile)
                React.useEffect(()=> {
                }, [])
                return (
                    <ProfileContext.Provider value={{profile, updateProfile}}>{props.children}</ProfileContext.Provider>
                )
            }

            render(
            <MockedProfileProvider>
                <LobbyPage />
            </MockedProfileProvider>
            )
        })
        expect(await screen.findByText("Create")).toBeInTheDocument()
    })

    test("Do not display create tour popup list when role is not TD", async()=> {
        await act( async()=> {
            const defaultProfile = {
                access: '',
                birth_date: '',
                display_name: '',
                email: '',
                first_name: '',
                last_name: '',
                password: '',
            }

            const MockedProfileProvider =(props)=> {
                const [profile, updateProfile] = React.useState(defaultProfile)
                React.useEffect(()=> {
                }, [])
                return (
                    <ProfileContext.Provider value={{profile, updateProfile}}>{props.children}</ProfileContext.Provider>
                )
            }

            render(
            <MockedProfileProvider>
                <LobbyPage />
            </MockedProfileProvider>
            )
            // expect(await screen.findAllByTestId('tbody-list')).toHaveLength(1)
        })
        expect(await screen.queryByText('Create')).toBeNull()
    })

    test("Display friends list", async()=> {
        await act( async()=> {
            render(<LobbyPage />)
            expect(await screen.findAllByTestId('tbody-list')).toHaveLength(1)
            userEvent.click(screen.getAllByTestId('tbody-list')[0])
        })
        expect(await screen.findAllByTestId('friends')).toHaveLength(2)
    })
})

