import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // children: JSX.Element
    twstyle?: string
}

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // children: JSX.Element
    isSelect?: boolean
}

export const PrimaryButton =(props: ButtonProps)=> {
    return <button onClick={props.onClick} onSubmit={props.onSubmit} className={`border-2 rounded-3xl pl-8 pr-8 text-white bg-blue-500 text-xs ${props.twstyle}`}>{props.children}</button>
}

export const SecondaryButton =(props: ButtonProps)=> {
    return <button onClick={props.onClick} onSubmit={props.onSubmit} className={`border-2 border-blue-500 rounded-3xl pl-8 pr-8 text-xs text-blue-500 bg-white ${props.twstyle}`}>{props.children}</button>
}

export const PrimarySqButton =(props: ButtonProps)=> {
    return <button onClick={props.onClick} onSubmit={props.onSubmit} className="bg-appBlue text-white px-10 py-2 rounded-md border border-appBlue hover:bg-appBlue hover:text-white transition">{props.children}</button>
}

export const SelectSqButton =(props: SelectButtonProps)=> {
    return <button onClick={props.onClick} onSubmit={props.onSubmit} className={`${props.isSelect ? "bg-appBlue" : "bg-white"}bg-appBlue text-white px-10 py-2 rounded-md border border-appBlue hover:bg-appBlue hover:text-white transition`}>{props.children}</button>
}