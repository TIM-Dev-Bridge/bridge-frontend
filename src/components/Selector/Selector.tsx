import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
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
}

const Selector: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {
    const [isValid, setValid] = React.useState(props.isValid!);
    React.useEffect(()=> {
        
    },[])

    return (
        <div className="w-full mt-2">
            <div className="ml-3">
                <WarningText small visible={false}>{""}</WarningText>
            </div>
            <select name={props.name} className={`border-2 border-gray-100 h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-1 mb-3`} value={props.text} placeholder={props.placeholder}>
                {props.children}
            </select>
        </div>
    );
}
Selector.defaultProps = defaultProps
export default Selector;

