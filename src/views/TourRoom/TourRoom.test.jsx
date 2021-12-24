import { render } from "@testing-library/react";
import { TourRoomPage } from "./TourRoom";

describe("Tour Room test", ()=> {
    test('Render', ()=> {
        render(<TourRoomPage tourName={"#"} />)
    })

    test('Display Correct Tour Name', ()=> {
        var { container } = render(<TourRoomPage tourName={"TourName test"} />)
        expect(container).toHaveTextContent('TourName test')
    })

    test('Display Correct Tour Name', ()=> {
        var { container } = render(<TourRoomPage tourName={"TourName test"} />)
        expect(container).toHaveTextContent('Leave')
    })
})