import { render } from "@testing-library/react";
import { AuthenProvider, getKey } from "./Authen";


describe("Get key function test", ()=> {
    test("Return Empty Obj if Local storage is not found", ()=> {
        window.localStorage.removeItem('bridge-authen')
        const emptyObj = {
            token: '',
            username: '',
        }
        expect(getKey()).toEqual(emptyObj)
    })

    test("Return Obj if Local storage is found", ()=> {
        const testObj = {
            token: 'token',
            username: 'username',
        }
        window.localStorage.setItem('bridge-authen', JSON.stringify(testObj))
        
        expect(getKey()).toEqual(testObj)
    })

    test("Return Empty Obj if Local storage is not in json", ()=> {
        const testObj = '{dkf'
        window.localStorage.setItem('bridge-authen', testObj)
        const emptyObj = {
            token: '',
            username: '',
        }
        expect(getKey()).toEqual(emptyObj)
    })

    test("Test Render authen Provider", ()=> {
        render(
            <AuthenProvider>
                <div></div>
            </AuthenProvider>
        )
    })
})