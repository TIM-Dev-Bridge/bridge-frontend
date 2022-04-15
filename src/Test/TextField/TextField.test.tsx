import { screen, render } from "@testing-library/react"
import TextField from "../../components/TextField/TextField"

describe('Text Field Test', ()=> {
    test('Render', ()=> {
        render(<TextField />)
    })

    test('To display Correct placeholder', ()=> {
        const placeholder = "Test Placeholder"
        const view = render(<TextField placeholder={placeholder}/>)
        expect(view.findByPlaceholderText(placeholder))
    })

    test('To display Red border if is not valid', ()=> {
        render(<TextField isValid={false}/>)
        expect(screen.getByRole('textbox')).toHaveStyle('border: 2px inset')
    })

    test('To not display Red border if is valid', ()=> {
        render(<TextField isValid={true}/>)
        expect(screen.getByRole('textbox')).toHaveStyle('border: 2px inset')
    })

    test('To display warning message if is not valid', ()=> {
        render(<TextField isValid={false} warningMessage="test warning message" warningVisible={true}/>)
        expect(screen.getByText("test warning message")).toBeVisible()
    })

    test('To not Display warning message if is valid', ()=> {
        render(<TextField isValid={true} warningMessage="test warning message" warningVisible={true}/>)
        expect(screen.getByText("test warning message")).not.toBeVisible()
    })
})