import { render } from "@testing-library/react"
import EditUserProfile from "./EdiUserProfile"

describe("Edit User Profile", ()=> {
    test("",()=> {
        const { container } = render(<EditUserProfile />)
        expect(container.firstChild).toBeVisible()
    })
})