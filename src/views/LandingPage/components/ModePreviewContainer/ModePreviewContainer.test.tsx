import { render } from "@testing-library/react"
import { LocalModePreviewContainer, ModePreviewContainer } from "./ModePreviewContainer"

describe("Mode Preview Container test", ()=> {
    test("render", ()=> {
        const { container } = render(<ModePreviewContainer state={{}} />)
        expect(container.firstChild).toBeVisible()
    })

    test("render", ()=> {
        const { container } = render(<LocalModePreviewContainer state={{}} />)
        expect(container.firstChild).toBeVisible()
    })
})