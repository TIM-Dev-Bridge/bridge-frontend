import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    ref?: RefObject<HTMLInputElement> 
}

const defaultProps = {
    value: "",
    placeholder: "",
}

const TextFieldNoWarning: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {

    return (
        <div className="w-full">
            <input autoComplete={props.autoComplete} onKeyUp={props.onKeyUp} onKeyDown={props.onKeyDown} onClick={props.onClick} onFocus={props.onFocus} name={props.name} onChange={props.onChange} type="text" className={`border-2 border-gray-100 h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100`} value={props.text} placeholder={props.placeholder}/>
        </div>
    );
}

TextFieldNoWarning.defaultProps = defaultProps

export default TextFieldNoWarning;