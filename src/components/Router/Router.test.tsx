import { render } from "@testing-library/react";
import { NavigationView } from "./Router";

describe("Navigation View test", ()=> {
    test('render navigation view children', ()=> {
        render(<NavigationView>
            <div>Mocked</div>
        </NavigationView>)
    })

    // test('pop state test', ()=> {
        
    //     render(
    //         <NavigationView>
    //             <div>Mocked</div>
    //         </NavigationView>)
    //     window.history.pushState({},'','/bridgebase')
    //     window.history.pushState({},'','/')
    //     window.history.back()
    //     // expect(window.location.pathname)
    // })
})