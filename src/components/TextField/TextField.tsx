import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    warningMessage?: string
    isValid?: boolean
    ref?: RefObject<HTMLInputElement> 
}

const defaultProps = {
    value: "",
    placeholder: "",
    warningMessage: "warning message",
    isValid: false
}

const TextField: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {
    const [isValid, setValid] = React.useState(props.isValid!);

    React.useEffect(()=> {
        
    })

    return (
        <div className="w-full mt-2">
            <div className="ml-3">
                <WarningText small visible={!props.isValid!}>{props.warningMessage!}</WarningText>
            </div>
            <input name={props.name} onChange={props.onChange} ref={props.ref} type="text" className={`border-2 ${!props.isValid ? "border-red-600" : "border-gray-100"}  h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-1 mb-3`} value={props.text} placeholder={props.placeholder}/>
        </div>
    );
}

TextField.defaultProps = defaultProps

export default TextField;