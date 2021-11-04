import React, { InputHTMLAttributes } from 'react';
import {ValidatorType, Validator} from '../../Validator';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    warningMessage?: string
    didTap?: boolean
    validateType?: ValidatorType
}

const TextField: React.FC<TextFieldProps> =(props: TextFieldProps)=> {
    var text: string = ''

    function validateForm(text: string) {
        try {
            Validator(props.validateType!).validate(text)
        } 
        catch {
            console.log("FUCK")
        }
    }

    return (
        <div className="w-full">
            <p className="text-xs">{props.warningMessage}</p>
            <input type="text" className="border-none h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-3 mb-3" value={props.text} placeholder={props.placeholder}/>
        </div>
    );
}

export default TextField;