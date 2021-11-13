import React from 'react';
import { useContext } from 'react';
import { navigate, NavigationContext } from './Router';

interface NavigationAttr {
    path: string,
    children?: JSX.Element,
    element: JSX.Element,
}

export const NavigationLink =(props: NavigationAttr)=> {    
    const context = useContext(NavigationContext)
    return (
        <div onClick={()=>{
            navigate(context,props.path, props.element)
            }}>
            {props.children}
        </div>
    )
}