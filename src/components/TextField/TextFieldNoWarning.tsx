import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import styled from 'styled-components';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    ref?: RefObject<HTMLInputElement> 
}

const defaultProps = {
    placeholder: "",
}

const TextFieldNoWarning: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {

    return (
        <TextFieldContainer style={props.style}>
            {/* <input autoComplete={props.autoComplete} onKeyUp={props.onKeyUp} onKeyDown={props.onKeyDown} onClick={props.onClick} onFocus={props.onFocus} name={props.name} onChange={props.onChange} type="text" className={`border-2 border-gray-100 h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100`} value={props.text} placeholder={props.placeholder}/> */}
            <Input {...props} />
        </TextFieldContainer>
    );
}

const TextFieldContainer = styled.div`
    width: 100%;
`

const WarningMessageContainer = styled.div`
    margin-left: 12px;
    display: flex;
    justify-content: flex-start;
`

const Input = styled.input`
    border-width: 2px;
    border-color: rgba(243, 244, 246, 1);
    min-height: 32px;
    border-radius: 16px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(243, 244, 246, 1);
`

TextFieldNoWarning.defaultProps = defaultProps

export default TextFieldNoWarning;