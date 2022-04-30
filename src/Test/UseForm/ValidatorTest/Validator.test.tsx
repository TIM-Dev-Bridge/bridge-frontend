import { validator } from "../../../views/Login/components/Validate";

describe('Input Validate Function', ()=> {
    test('check is Empty [input ==> empty] [output ==> return error]', ()=> {
        const input = ""
        expect(()=> {validator(input).isEmpty()}).toThrow(Error(` should not be empty`))
    })

    test('check is Empty [input ==> not empty] [output ==> validator function]', ()=> {
        const input = "test"
        const expectOutput = validator(input)
        // //console.log(validator(input).isEmpty().toString())
        expect(validator(input).isEmpty().toString()).toEqual(expectOutput.toString())
    })

    test('check min 3 char [input ==> 2 char] [output ==> return error]', ()=> {
        const input = "gg"
        expect(()=> {validator(input).min(3)}).toThrow(Error(` should have at least 3 character`))
    })

    test('check min 3 char [input ==> 4 char] [output ==> return validator]', ()=> {
        const input = "gggg"
        const expectOutput = validator(input)
        expect(validator(input).min(3).toString()).toEqual(expectOutput.toString())
    })

    test('check min 3 char [input ==> 3 char] [output ==> return validator]', ()=> {
        const input = "a1-"
        const expectOutput = validator(input)
        expect(validator(input).min(3).toString()).toEqual(expectOutput.toString())
    })

    test('check max 3 char [input ==> 2 char] [output ==> return validator]', ()=> {
        const input = "a1"
        const expectOutput = validator(input)
        expect(validator(input).max(3).toString()).toEqual(expectOutput.toString())
    })

    test('check max 3 char [input ==> 4 char] [output ==> return error]', ()=> {
        const input = "N@cK"
        expect(()=> {validator(input).max(3)}).toThrow(Error(` should not have more than 3 character`))
    })

    test('check email [input ==> incorrect email] [output ==> return error]', ()=> {
        const input = "tete.wittawingmail.com"
        expect(()=> {validator(input).email()}).toThrow(Error(`Invalid Email`))
    })

    test('check email [input ==> correct email] [output ==> return validator]', ()=> {
        const input = "tete.wittawin@gmail.com"
        const expectOutput = validator(input)
        expect(validator(input).email().toString()).toEqual(expectOutput.toString())
    })

    test('check equal [input ==> anytext and sametext] [output ==> validator obj]', ()=> {
        const input = "N@cK"
        const compareInput = "N@cK"
        const expectOutput = validator(input)
        expect(validator(input).isEqualTo(compareInput).toString()).toEqual(expectOutput.toString())
    })

    test('check equal [input ==> anytext and different] [output ==> validator obj]', ()=> {
        const input = "N@cK"
        const compareInput = "N@cdK"
        expect(()=> {validator(input).isEqualTo(compareInput)}).toThrow()
    })
})