import React from "react"
import { validator } from "../../views/Login/components/Validate"

export const useForm =<T>(formStruct: T) => {
    
    const handleSubmit =(callback: (isFormValid: boolean,{})=>void)=> {
        var isFormValid = true;
        const temp : {[key in keyof T]: {isValid:boolean, message: string}} = {...isValid}
        const formValue : {[key: string]: string} = {}
        Object.keys(formStruct).map((key)=> {
            try {
                var isSelect = false
                var value
                try {
                    const input = (document.querySelector(`input[name='${key}']`) as HTMLInputElement).value;
                    // console.log("INPUT : ",input)
                    formValue[key] = input
                    value = input
                } catch {
                }
                try {
                    const select = (document.querySelector(`select[name='${key}']`) as HTMLSelectElement).value
                    // console.log("GET SELECT", select)
                    formValue[key] = select
                    isSelect = true
                    value = select
                } catch {
                }
                
                // formValue[key] = (document.querySelector(`input[name='${key}'`)as HTMLInputElement).value;
                // console.log(key,(document.querySelector(`input[name='${key}'`)as HTMLInputElement).value);
                (formStruct[key as keyof T] as unknown as typeof validator)(value ?? '', humanize(key))
                temp[key as keyof T] = { isValid: true, message: ""}
                isFormValid = isFormValid && true
            } catch (error) {
                isFormValid = isFormValid && false
                // console.log("ERR",(error as Error).message)
                temp[key as keyof T] = {isValid:false, message: (error as Error).message}
            }
        })
        console.log("RESULT", temp)
        setIsValid(temp)
        callback(isFormValid,formValue)
    }

    const initValue =(): {}=> {
        var temp : {[key in keyof T]: {isValid:boolean, message: string}} = {} as {[key in keyof T]: {isValid:boolean, message: string}} 
        Object.keys(formStruct).map((key)=> {
            temp[key as keyof T] = {isValid: true, message: ""}
        })
        return temp
    }

    const [isValid, setIsValid ] = React.useState<{[key in keyof T]: {isValid:boolean, message: string}}>(initValue() as {[key in keyof T]: {isValid:boolean, message: string}} )
    return { isValid , handleSubmit}
}

function humanize(str: string) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }