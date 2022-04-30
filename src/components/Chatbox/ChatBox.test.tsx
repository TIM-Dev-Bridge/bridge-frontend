import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chat from "./ChatBox";

describe('Chat box test', ()=> {
    test('render', ()=> {
        const {container} = render(<Chat display={true} />)
        expect(container.firstChild).toBeVisible()
    })

    test('display = false will not render', ()=> {
        const {container} = render(<Chat display={false} />)
        expect(container.firstChild).toNotBeVisible()
    })

    test('typing', ()=> {
        const {queryByRole} = render(<Chat display={true} />)
        const input = queryByRole('textbox')
        userEvent.type(screen.queryByRole('textbox')!, "NACKIE")
        expect(screen.getByRole('textbox')).toHaveValue('NACKIE')
    })

    test('sending', ()=> {
        const {queryByRole} = render(<Chat display={true} />)
        userEvent.type(screen.queryByRole('textbox')!, "NACKIE")
        userEvent.click(screen.queryByRole('button')!)
        expect(screen.queryAllByText).toHaveValue('NACKIE')
    })
})