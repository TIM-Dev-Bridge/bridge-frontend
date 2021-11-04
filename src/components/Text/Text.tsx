import React, { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLElement> {
    children: JSX.Element | string
    small?: boolean
    medium?: boolean
    big?: boolean
} 

const defaultProps: TextProps = {
    children: "",
    small: false,
    medium: false,
    big: false
}

const LinkText: React.FunctionComponent<TextProps> =(props: TextProps)=> {
    var fontSize = "text-base"
    if (props.small) {
        fontSize = "text-xs"
    }
    if (props.medium) {
        fontSize = "text-sm"
    }
    if (props.big) {
        fontSize = "text-base"
    }
    return <p className={`text-blue-500 ${fontSize} cursor-pointer`} onClick={props.onClick}>{props.children}</p>
}

const TitleText: React.FunctionComponent<TextProps> =(props: TextProps)=> {
    var fontSize = "text.2xl"
    if (props.small) {
        fontSize = "text-xl"
    }
    if (props.medium) {
        fontSize = "text-2xl"
    }
    if (props.big) {
        fontSize = "text-3xl"
    }
    
    return <h1 className={`text-black ${fontSize} font-bold`} onClick={()=>{console.log(fontSize)}}>{props.children}</h1>
}

const NormalText: React.FunctionComponent<TextProps> =(props: TextProps)=> {
    var fontSize = "text.base"
    if (props.small) {
        fontSize = "text-xs"
    }
    if (props.medium) {
        fontSize = "text-sm"
    }
    if (props.big) {
        fontSize = "text-base"
    }
    return <p className={`text-black ${fontSize} font-extralight`}>{props.children}</p>
}

LinkText.defaultProps = defaultProps
TitleText.defaultProps = defaultProps
NormalText.defaultProps = defaultProps

export {LinkText, NormalText, TitleText}