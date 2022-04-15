import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import styled from 'styled-components';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    type: string
    testid?: string
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
        <TextFieldContainer>
            <p style={{fontWeight: 400,fontSize:"10px", textAlign: "left", marginLeft: "16px", opacity: 0}}>{'fieldname'}</p>
            <Input data-testid={props.testid} defaultValue={props.defaultValue} name={props.name} type={props.type} placeholder={props.placeholder} />
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
    border-color: rgba(243, 244, 246, 1) ;
    min-height: 32px;
    border-radius: 16px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(243, 244, 246, 1);
    /* margin-top: 4px; */
    margin-bottom: 12px;
`

DateSelector.defaultProps = defaultProps

export default DateSelector;