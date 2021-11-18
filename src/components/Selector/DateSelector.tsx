import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    type: string
}

const defaultProps = {
    value: "",
    placeholder: "",
    type: "date"
}

const DateSelector: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {
    React.useEffect(()=> {
        
    },[])

    return (
        <div className="w-full mt-2">
            <div className="ml-3">
                <WarningText small visible={false} hidden>{""}</WarningText>
            </div>
            <input type={props.type} name={props.name} onChange={props.onChange} className={`border-2 border-gray-100 h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-1 mb-3`} value={props.text} placeholder={props.placeholder}/>
        </div>
    );
}

DateSelector.defaultProps = defaultProps

export default DateSelector;