import { act, fireEvent, getByText, render, screen } from "@testing-library/react";
import userEvent, { TargetElement } from "@testing-library/user-event";
import axios from "axios";
import LoginPage from "../Login/Login";
import CreateTourPopup from "./CreateTourPopup";
import { useLobby } from '../../Service/SocketService';

// jest.mock('axios');
// jest.mock('../../Service/SocketService')

describe('test Create Tour popup', ()=> {
    const mockFunc = jest.fn()
    test('render', ()=> {
        render(
            <CreateTourPopup 
                isVisible={false} 
                onDismiss={mockFunc}
            />
        )
    })

    test('popup visibility to be visible', ()=> {
        const {container} = render(<CreateTourPopup isVisible={false} onDismiss={mockFunc}/>)
        expect(container.firstChild).not.toBeVisible()
    })

    test('popup visibility to be visible', ()=> {
        const {container} = render(<CreateTourPopup isVisible={true} onDismiss={mockFunc}/>)
        expect(container.firstChild).toBeVisible()
    })

    test('popup click function', ()=> {
        const mockFunc = jest.fn()
        const { container } = render(<CreateTourPopup isVisible={true} onDismiss={mockFunc} tourName=""/>)
        userEvent.click(container.firstChild)
        expect(mockFunc).toHaveBeenCalledTimes(1)
    })

    test('Input all correct in create tour ', async()=> {
        render(<CreateTourPopup isVisible={true} onDismiss={mockFunc} tourName=""/>);
        await act(async()=> {
            fireEvent.change(screen.getByTestId("popup-title"), {target:{value:"title"}})
            fireEvent.change(screen.getByTestId("popup-time"), {target:{value:"20:03:00"}})
            fireEvent.change(screen.getByTestId("popup-date"), {target:{value:"1999-08-13"}})
            fireEvent.change(screen.getByTestId("popup-movement"), {target:{value:"Pairs"}})
            fireEvent.change(screen.getByTestId("popup-scoring"), {target:{value:"IMP"}})
            fireEvent.change(screen.getByTestId("popup-board_to_play"), {target:{value:"6"}})
            fireEvent.change(screen.getByTestId("popup-minute_board"), {target:{value:"5"}})
            fireEvent.change(screen.getByTestId("popup-board_round"), {target:{value:"2"}})
            userEvent.click(screen.getAllByText('Create Tour')[0])
            
        })
        expect(screen.queryAllByText('Create Tour')).toBeNull
    })

    test('Input all correct in create tour ', async()=> {
        render(<CreateTourPopup isVisible={true} onDismiss={mockFunc} tourName=""/>);
        await act(async()=> {
            fireEvent.change(screen.getByTestId("popup-title"), {target:{value:""}})
            fireEvent.change(screen.getByTestId("popup-time"), {target:{value:"20:03:00"}})
            fireEvent.change(screen.getByTestId("popup-date"), {target:{value:"1999-08-13"}})
            fireEvent.change(screen.getByTestId("popup-movement"), {target:{value:"Pairs"}})
            fireEvent.change(screen.getByTestId("popup-scoring"), {target:{value:"IMP"}})
            fireEvent.change(screen.getByTestId("popup-board_to_play"), {target:{value:"6"}})
            fireEvent.change(screen.getByTestId("popup-minute_board"), {target:{value:"5"}})
            fireEvent.change(screen.getByTestId("popup-board_round"), {target:{value:"2"}})
            userEvent.click(screen.getAllByText('Create Tour')[0])
            
        })
        expect(screen.queryAllByText('Create Tour')).toHaveLength(1)
    })
})