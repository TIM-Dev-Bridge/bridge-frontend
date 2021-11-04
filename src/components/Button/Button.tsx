import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // children: JSX.Element
}

export const PrimaryButton =(props: ButtonProps)=> {
    return <button className="border-2 rounded-3xl pl-8 pr-8 mt-3 mb-3 text-white bg-blue-500 text-sm h-10 pt-2 pb-2">{props.children}</button>
}

export const SecondaryButton =(props: ButtonProps)=> {
    return <button className="border-2 border-blue-500 rounded-3xl pl-8 pr-8 mt-3 mb-3 text-blue-500 bg-white h-full pt-2 pb-2">Continue</button>
}