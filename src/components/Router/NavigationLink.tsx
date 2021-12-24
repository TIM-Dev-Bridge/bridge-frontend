import React, { HTMLAttributes } from 'react';
import { useContext } from 'react';
import { navigate, NavigationContext } from './Router';

interface NavigationAttr extends HTMLAttributes<HTMLElement> {
    path: string | undefined,
    // children?: JSX.Element,
    state: {}
}

export const NavigationLink =(props: NavigationAttr)=> {    
    const context = useContext(NavigationContext)
    return (
        <div onClick={()=>{
            if (props.path) {
                navigate(context,props.path, {})
            }
            }}>
            {props.children}
        </div>
    )
}