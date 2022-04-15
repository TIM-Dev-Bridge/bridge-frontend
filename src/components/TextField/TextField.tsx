import React, { InputHTMLAttributes, MutableRefObject, RefObject } from 'react';
import styled from 'styled-components';
import {ValidatorType, Validator} from '../../Validator';
import { NormalText, WarningText } from '../Text/Text';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
    warningMessage?: string
    isValid?: boolean
    warningVisible?: boolean
    ref?: RefObject<HTMLInputElement> 
}

const defaultProps = {
    placeholder: "",
    warningMessage: "",
    isValid: true,
    warningVisible: false
}

const TextField: React.FunctionComponent<TextFieldProps> =(props: TextFieldProps)=> {

    React.useEffect(()=> {
        
    })
    const [opacity, setOpacity] = React.useState(0)
    const handleKeyDown =(event: any)=> {
        setTimeout(()=> {
            if (event.target.value.length > 0) {
                setOpacity(1)
                return
            }
            setOpacity(0)
        }, 100)
        
    }

    const handleFocus =()=> {
        // setOpacity(1)
    }

    const handleBlur =(e: any)=> {
        if (e.target.value.length == 0) {
            setOpacity(0)
        }
    }
    
    const handleChange =(e: any)=> {
        e.target.value = e.target.value.replace(/[^A-Za-z]/ig, '')
    }

    return (
        <TextFieldContainer>
            <p style={{fontWeight: 500,fontSize:"10px", textAlign: "left", marginLeft: "16px", opacity: opacity}}>{humanize(props.name ?? '')}</p>
            <Input isValid={props.isValid ?? true} {...props} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} pattern="[A-Za-z0-9]"/>
            <WarningMessageContainer visible={!props.isValid!}>
                <WarningText visible={props.warningVisible! && !props.isValid}>{props.warningMessage!}</WarningText>
            </WarningMessageContainer>
            {props.isValid ? <div style={{height:'12px'}}></div> : <div style={{height:'4px'}}></div>}
            
        </TextFieldContainer>
    );
}

const TextFieldContainer = styled.div`
    width: 100%;
`

const WarningMessageContainer = styled.div<{visible: boolean}>`
    margin-left: 12px;
    display: flex;
    justify-content: flex-start;
    visibility: ${props => props.visible ? "visible" : "hidden"};

`

const Input = styled.input<{isValid: boolean}>`
    border-width: 2px;
    border-color: ${props => props.isValid ? "rgba(243, 244, 246, 1)" : "rgba(220 ,38, 38, 1)"};
    min-height: 32px;
    border-radius: 16px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(243, 244, 246, 1);
    /* margin-top: 4px; */
    /* margin-bottom: 12px; */
`
//`border-2 ${!props.isValid ? "border-red-600" : "border-gray-100"}  h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-1 mb-3`

function humanize(str: string) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }

TextField.defaultProps = defaultProps

export default TextField;