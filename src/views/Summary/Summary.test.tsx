import { render, screen } from "@testing-library/react"
import { SummaryRank } from "../Bidding/UsePlaying"
import Summary from "./Summary"

describe("Summary Test", ()=> {
    test("Summary Test", ()=> {
        const { container } = render(<Summary summaryRank={[]} />)
        expect(container.firstChild).toBeVisible()
    })

    test("Summary Test with rank", ()=> {
        let mockRank: SummaryRank[] = [
            {
                pair_id: 0,
                name1: "nack",
                name2: "tae",
                totalMP: 3,
                rankPercent: 100
            },
            {
                pair_id: 1,
                name1: "john",
                name2: "jane",
                totalMP: 2,
                rankPercent: 0
            },
            {
                pair_id: 2,
                name1: "jieb",
                name2: "oliver",
                totalMP: 1,
                rankPercent: 0
            }
        ]
        const { container } = render(<Summary summaryRank={mockRank} />)
        expect(screen.findByText('nack')).toBeVisible()
    })
})