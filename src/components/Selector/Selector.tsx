import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import styled from 'styled-components';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    warningMessage?: string
    isValid?: boolean
    ref?: RefObject<HTMLInputElement> 
    testid?: string
}

const defaultProps = {
    placeholder: "",
    warningMessage: "warning message",
}

const Selector: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {
    const [isValid, setValid] = React.useState(props.isValid!);
    React.useEffect(()=> {
    },[])

    return (
        <TextFieldContainer>
            <p style={{fontWeight: 400,fontSize:"10px", textAlign: "left", marginLeft: "16px", opacity: 0}}>{''}</p>
            <Input data-testid={props.testid} name={props.name} placeholder={props.placeholder}
                onChange={(e)=> {
                    
                }
            }>{props.children}</Input>
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

const Input = styled.select`
    border-width: 2px;
    border-color: rgba(243, 244, 246, 1) ;
    min-height: 32px;
    border-radius: 16px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(243, 244, 246, 1);
    margin-top: 4px;
    margin-bottom: 12px;
`

Selector.defaultProps = defaultProps
export default Selector;

