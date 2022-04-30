import { render } from "@testing-library/react"
import BiddingControl from "./BiddingCotrol"

describe("Bidding Control", ()=> {
    test("render", ()=> {
        const { container } = render(<BiddingControl />)
        expect(container.firstChild).toBeVisible()
    })
})