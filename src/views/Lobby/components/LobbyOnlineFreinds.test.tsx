import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as hooks from "../../../Authen";
// import { useAuthen } from "../../../Authen";
import OnlineFriends, { FriendBlock } from "./OnlineFriends";


describe("Online Freinds Test", ()=> {
    test("render", ()=> {
        const {container} = render(<OnlineFriends tourName={""} display={true} />)
        expect(container.firstChild).toBeVisible()
    })
})

describe("Freinds BLock", ()=> {
    test("render", ()=> {
        const {container} = render(<FriendBlock name={"Nack"} displayMode={"invite"} isWaiting={false} />)
        expect(container.firstChild).toBeVisible()
    })

    test("render with invited", ()=> {
        const {container} = render(<FriendBlock name={"Nack"} displayMode={"invite"} isWaiting={true} />)
        userEvent.click(screen.queryByRole('button')!)
        expect(container).toHaveTextContent('Pending')
    })

    test("authe content", ()=> {
        // const authen = useAuthen()
        // authen.updateToken({token: "", username: "nackie"})
        jest.spyOn(hooks, 'useAuthen').mockImplementation(()=> ({authen: {token: "", username: "Nack"}, updateToken: jest.fn()}))
        const {container} = render(<FriendBlock name={"Nack"} displayMode={"invite"} isWaiting={true} />)
        expect(screen.findByText('Invite')).toBeFalsy()
    })

    test("render accept", ()=> {
        const {container} = render(<FriendBlock name={"Nack"} displayMode={"accept-invite"} isWaiting={true} />)
        // userEvent.click(screen.queryByRole('button')!)
        expect(container).toHaveTextContent('Accept')
    })
})