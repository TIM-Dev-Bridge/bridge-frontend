import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthenContext, AuthenProvider, useAuthen } from "../../Authen";
import NavigationBar from "./NavigationBar";

describe("Navigation Bar test", ()=> {
    test("Show Log out on non empty token", ()=> {
        const authenObj = {
            token:  'nonepmty'  ,
            username: 'nonempty'  ,
        }
        
        render(
            <AuthenContext.Provider value={{authen: authenObj, updateToken: jest.fn()}}>
                <NavigationBar />
            </AuthenContext.Provider>
        )
        expect(screen.getByText("Log out")).toBeInTheDocument()
    })

    test('Correctly Route to Logout', ()=> {        
        const authenObj = {
            token:  'test-token'  ,
            username: 'test-username'  ,
        }
        
        render(
            <AuthenContext.Provider value={{authen: authenObj, updateToken: jest.fn()}}>
                <NavigationBar />
            </AuthenContext.Provider>
        )
        userEvent.click(screen.getByText('Log out'))
        expect(window.location.pathname).toEqual('/')
        expect(window.localStorage.getItem('bridge-authen')).toBeNull
    })

    test('Logout remove token', ()=> {        
        const authenObj = {
            token:  'test-token'  ,
            username: 'test-username'  ,
        }
        
        render(
            <AuthenContext.Provider value={{authen: authenObj, updateToken: jest.fn()}}>
                <NavigationBar />
            </AuthenContext.Provider>
        )
        userEvent.click(screen.getByText('Log out'))
        expect(window.location.pathname).toEqual('/')
        expect(window.localStorage.getItem('bridge-authen')).toBeNull
    })

    test("Show Login on empty token", ()=> {
        const authenObj = {
            token:  ''  ,
            username: ''  ,
        }
        
        render(
            <AuthenContext.Provider value={{authen: authenObj, updateToken: jest.fn()}}>
                <NavigationBar />
            </AuthenContext.Provider>
        )
        expect(screen.getByText("Log in")).toBeInTheDocument()
    })

    
})