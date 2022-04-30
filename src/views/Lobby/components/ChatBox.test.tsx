import { render, screen } from "@testing-library/react";
import Chat from "./ChatBox";
import userEvent from "@testing-library/user-event";
import { createServer } from "http";
import { act } from "react-dom/test-utils";
import { socket } from "../../../Service/SocketService";
const httpServer = createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: '*',
    }
  });

describe('Lobby Chat Test', ()=> {
    Element.prototype.scrollIntoView = jest.fn();


    test('Remove text in textfiled should hide send button', ()=> {
        render(<Chat display={true} />)
        userEvent.type(screen.getAllByRole('textbox')[0], "hg{backspace}{backspace}")
        expect(screen.getAllByRole('textbox')[0]).toHaveValue("")
    })
    
    test('render', ()=> {
        render(<Chat display={false}  />)
    })

    test('Visible', ()=> {
        // const mockSocket = io()
        const { container } = render(<Chat display={true} />)
        expect(container.firstChild).toBeVisible()
    })

    test('Send By Button', async ()=> {
        await act(async ()=> {
            screen.debug()
            render(<Chat display={true}/>)
            userEvent.type(screen.getAllByRole('textbox')[0], "hello")
            userEvent.click(screen.getAllByRole('button')[0])
        })
        expect(await screen.findByText('hello', {}, {timeout: 3000})).toBeInTheDocument()
    })

    test('Send By Enter', async ()=> {
        await act(async ()=> {
            screen.debug()
            render(<Chat display={true} />)
            userEvent.type(screen.getAllByRole('textbox')[0], "hello {enter}")
        })
        expect(await screen.findByText('hello', {}, {timeout: 3000})).toBeInTheDocument()
    })

    test('Display Lobby Chat text', ()=> {
        const { container } = render(<Chat display={true} />)
        expect(container).toHaveTextContent("Lobby Chat")
    })

    // test(`Sender and Receiver is same person don't show sender name`, async ()=> {
    //     await act(async ()=> {
    //         screen.debug()
    //         window.localStorage.setItem('bridge-authen', JSON.stringify({token:'test-token', username: ''}))
            
    //         render(<Chat display={true} />)
    //         socket.emit('send-lobby-chat','dummy-sender', 'hello2')
    //         expect(await screen.findByText('hello2', {}, {timeout: 3000})).toBeInTheDocument()
    //         socket.emit('send-lobby-chat','dummy-sender', 'hello3')
    //         setTimeout(()=> {}, 500)
            
    //     })
    //     expect(await screen.findByText('hello3', {}, {timeout: 3000})).toBeInTheDocument()
    // })

    test(`Sender and Receiver is not same person`, async ()=> {
        await act(async ()=> {
            screen.debug()
            window.localStorage.setItem('bridge-authen', JSON.stringify({token:'test-token', username: ''}))
            
            render(<Chat display={true} />)

            userEvent.type(screen.getAllByRole('textbox')[0], "hello {enter}")
            socket.emit('send-lobby-chat','dummy-sender', 'hello2')
        })
        expect(await screen.findByText('hello2', {}, {timeout: 3000})).toBeInTheDocument()
    })
})