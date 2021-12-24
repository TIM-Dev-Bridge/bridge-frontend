import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface TextProps extends HTMLAttributes<HTMLElement> {
    children: JSX.Element | string
    small?: boolean
    medium?: boolean
    big?: boolean
    textColor?: string
    bold?: boolean
} 

interface WarningTextProps extends TextProps {
    visible: boolean
}

const defaultProps: TextProps = {
    children: "",
    small: false,
    medium: false,
    big: false,
    bold: false
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
    return <p className={`${props.bold? "font-bold" : ""} ${props.textColor ? props.textColor : "text-black"} ${fontSize} font-extralight`}>{props.children}</p>
}

// const WarningText: React.FunctionComponent<WarningTextProps> =(props: WarningTextProps)=> {
//     var fontSize = "text-xss"
//     if (props.small) {
//         fontSize = "text-xss"
//     }
//     if (props.medium) {
//         fontSize = "text-xs"
//     }
//     if (props.big) {
//         fontSize = "text-small"
//     }
//     return <p className={`text-red-600 ${fontSize} font-regular text-xss ${props.visible ? "visible" : "invisible"}`}>{props.children}</p>
// }

const fontSize = {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 22
}

const fontWeight = {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
}

const WarningText = styled.p<{fontSize?: number, fontWeight?: number, visible?: boolean}>`
    color: rgba(220, 38, 38, 1);
    font-size: ${props => props.fontSize}px;
    font-weight: 400;
    visibility: ${props => props.visible ? "visible" : "hidden"};
`

WarningText.defaultProps = {
    fontSize: fontSize.xxs,
    fontWeight: fontWeight.thin,
    visible: false
}


LinkText.defaultProps = defaultProps
TitleText.defaultProps = defaultProps
NormalText.defaultProps = defaultProps

export {LinkText, NormalText, TitleText, WarningText}