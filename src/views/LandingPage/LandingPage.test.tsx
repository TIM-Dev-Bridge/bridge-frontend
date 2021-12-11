import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "./LandingPage";

describe("Landing Page Test", ()=> {
    

    test("render", ()=> {
        render(<LandingPage />)
    })

    test("Correctly Link to Lobby", ()=> {
        const { container } = render(<LandingPage />)
        userEvent.click(screen.getByText('Online Plays'))
        expect(window.location.pathname = "/lobby")
    })

    test("Correctly Link to Lobby", ()=> {
        const { container } = render(<LandingPage />)
        userEvent.click(screen.getAllByText('Board')[0])
        expect(window.location.pathname = "/admin-board")
    })

    test("Correctly Link to Board when click Create Post", ()=> {
        const { container } = render(<LandingPage />)
        userEvent.click(screen.getByText('Create Post'))
        expect(window.location.pathname = "/admin-board")
    })
})