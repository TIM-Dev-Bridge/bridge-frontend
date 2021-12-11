import LoginPage from "./Login";
import { fireEvent, getByLabelText, getByText, render, screen, queryAllByAttribute, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from "react-dom/test-utils";
import * as navigatorFunc from "../../components/Router/Router";

Element.prototype.scrollIntoView = jest.fn();
jest.mock('axios');

// jest.mock('../../components/Router/Router', ()=> {
//     navigate: (jest.fn())
//     return jest.fn(()=> {navigate})
// })
// global.window = { location: { ...location,pathname: null } };


describe('Login Page Test', ()=> {
    test('Render Register Form correctly', ()=> {
        render(<LoginPage />)
    })

    test('To Match Snapshot', ()=> {
        const tree = render(<LoginPage />)
        expect(tree).toMatchSnapshot()
    })

    test('Correctly Display', ()=> {
        render(<LoginPage />)
        expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Display Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
        // expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument()
        expect(screen.getByText('Continue')).toBeInTheDocument()
        expect(screen.getByText(`Already Have an account`)).toBeInTheDocument()
    })

    test('Correctly Display', ()=> {
        render(<LoginPage />)
        userEvent.click(screen.getByText(`Already Have an account`))
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })
    

    describe('behavioral', ()=> {
        test('If Render correct initial form', ()=> {
            const {container} = render(<LoginPage />)
            const element = container.firstChild?.firstChild
            expect(element?.firstChild).toBeVisible()

            const register = container.lastChild?.lastChild
            expect(register?.firstChild).not.toBeVisible()
        })

        test('If it can switch between register and login', async ()=> {
            const {container} = render(<LoginPage />)
            userEvent.click(screen.getByText(`Already Have an account`))
            var element = container.firstChild?.firstChild
            expect(element?.firstChild).not.toBeVisible()

            var register = container.lastChild?.lastChild
            expect(register?.firstChild).toBeVisible()

            userEvent.click(screen.getByText(`Don't have and accout?`))
            element = container.firstChild?.firstChild
            register = container.lastChild?.lastChild
            expect(element?.firstChild).toBeVisible()
            expect(register?.firstChild).not.toBeVisible()
        })
        
        test('Function in Register is Executed', async ()=> {
            const {container} = render(<LoginPage />)
            // userEvent.click(screen.getAllByText(`Continue`)[0])
        })

        test('Function in Login is Executed', async ()=> {
            const {container} = render(<LoginPage />)
            // userEvent.click(screen.getAllByText(`Continue`)[1])
        })

        test('Input all correct in form ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(navigatorFunc, 'navigate');

            userEvent.click(screen.getByText(`Already Have an account`))
            await act(async()=> {
                fireEvent.change(screen.getByTestId("login-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("login-password"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[1])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(1)
            expect(window.location.pathname).toEqual('/bridgebase')
        })

        test('No Input Login form ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(navigatorFunc, 'navigate');

            userEvent.click(screen.getByText(`Already Have an account`))
            await act(async()=> {
                fireEvent.change(screen.getByTestId("login-email"), {target:{value:""}})
                fireEvent.change(screen.getByTestId("login-password"), {target:{value:""}})
                userEvent.click(screen.getAllByText('Continue')[1])
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Input incorrect in form ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(navigatorFunc, 'navigate');

            userEvent.click(screen.getByText(`Already Have an account`))
            await act(async()=> {
                userEvent.click(screen.getAllByText('Continue')[1])
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('No Input Register form ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Input all correct in form register ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledWith("https://bridge-api-tim.herokuapp.com/register", {"birth_date": "1999-08-13", "confirm_password": "1213145678", "display_name": "displayname", "email": "tete.wittawin@gmail.com", "first_name": "firstname", "last_name": "lastname", "password": "1213145678", "username": "username"})
            expect(await screen.findByText('Log in')).toBeInTheDocument()
        })

        test('Not filling firstname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Fill special char firstname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"☺☻♥♦♣♠"}})
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Fill numeric char firstname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"123456"}})
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Not filling lastname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Fill special char lastname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"☺☻♥♦♣♠"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Fill numeric char lastname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"123456"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Email has no @ ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"123456"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawingmail.com"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Not fill email ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Email has no dot com ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('No displayname ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                // fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Displayname less than 5 ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"User"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('Displayname mroe than 16 ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1999-08-13"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('birthdate 100 years ago ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"1920-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('birthdate future ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2112-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('no password ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2012-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                // fireEvent.change(screen.getByTestId("register-password"), {target:{value:"1213145678"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"1213145678"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('invalid password regex ', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2012-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"aaaaaaaa"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"aaaaaaaa"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('password less than 8', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2012-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:" Qq123!"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:" Qq123!"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('password less than 8', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2012-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"Qq123AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"Qq123AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })

        test('confirm password not match', async()=> {
            render(<LoginPage />);
            const mockedAxios = axios ;
            mockedAxios.post.mockResolvedValue({
                status: 200,
                data : {
                    token: 'test-token',
                    username: 'test-username'
                }
            })
            const jsonSpy = jest.spyOn(mockedAxios, 'post');
            await act(async()=> {
                fireEvent.change(screen.getByTestId("register-lastname"), {target:{value:"lastname"}})
                fireEvent.change(screen.getByTestId("register-firstname"), {target:{value:"firstname"}})
                fireEvent.change(screen.getByTestId("register-username"), {target:{value:"username"}})
                fireEvent.change(screen.getByTestId("register-displayname"), {target:{value:"displayname"}})
                fireEvent.change(screen.getByTestId("register-date"), {target:{value:"2012-10-07"}})
                fireEvent.change(screen.getByTestId("register-email"), {target:{value:"tete.wittawin@gmail"}})
                fireEvent.change(screen.getByTestId("register-password"), {target:{value:"Qq123456!"}})
                fireEvent.change(screen.getByTestId("register-confirmpassword"), {target:{value:"Qq1234567"}})
                userEvent.click(screen.getAllByText('Continue')[0])
                
            })
            expect(jsonSpy).toHaveBeenCalledTimes(0)
        })
    })
})
