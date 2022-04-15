import React from 'react'
import LoginPage from '../../views/Login/Login'
import { RouterConfig } from './RouterConfig'

// const thisHistory = window.history

export const NavigationContext = React.createContext({
    navigationStack: [<div></div>],
    updateStack: (view: JSX.Element[])=>{}
})

export const useNavigator =()=> React.useContext(NavigationContext)

interface NavigationViewAttr {
    children?: JSX.Element
}

export const NavigationView =(props: NavigationViewAttr)=> {
    const [navigationStack, updateStack] = React.useState([<LoginPage />])
    const stackRef = React.useRef(navigationStack)

    React.useEffect(()=> {
        if (window.history.state != null) {
            const stack = [...navigationStack, RouterConfig[window.history.state.path]()]
            if (window.location.pathname != "/" && navigationStack[navigationStack.length - 1] != <LoginPage />) {
                updateStack(stack)
            }
        } else {
            const path = window.location.pathname
            // console.log(path)
            const stack = [...navigationStack, RouterConfig[path]()]
            updateStack(stack)
        }

        // console.log(window.history.state)

    },[window.location.pathname])

    const backEvent = React.useCallback(()=> {
        window.addEventListener('popstate', ()=> {
            const newStack = [...stackRef.current]
            if (stackRef.current.length > 0) {
                newStack.pop()
                updateStack(newStack)
            }
        })
    }, [navigationStack])

    React.useEffect(()=> {
        stackRef.current = navigationStack
    },[navigationStack])

    React.useEffect(()=> {
        // console.log(stackRef.current.length)
        backEvent()
    },[])

    
    return (
        <NavigationContext.Provider value={{navigationStack, updateStack}}>
            {props.children}
        </NavigationContext.Provider>
    )
}

export const navigate =(context: {navigationStack: JSX.Element[], updateStack: (view: JSX.Element[]) => void;
}, path: string, state: {}, query: string = '')=> {
    const currentPath = window.location.pathname
    const newPath = window.location.pathname.replace(currentPath, path + (query == '' ? '' : `?${query}`))
    const newState = {
        path: path,
        state: state
    }
    window.history.pushState(newState,"",newPath)
    const element = RouterConfig[path]()
    const newStack = [...context.navigationStack, element]
    context.updateStack(newStack)
    // console.log('navigate function')
}
