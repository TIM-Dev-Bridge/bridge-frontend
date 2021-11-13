import React from "react"
import { validator } from "../../views/Login/components/Validate"

export const useForm =<T>(formStruct: T) => {
    
    const handleSubmit =(callback: (isFormValid: boolean,{})=>void)=> {
        var isFormValid = true;
        const temp : {[key: string]: {isValid:boolean, message: string}} = {...isValid}
        const formValue : {[key: string]: string} = {}
        Object.keys(formStruct).map((key)=> {
            try {
                formValue[key] = (document.querySelector(`input[name='${key}'`)as HTMLInputElement).value;
                console.log(key,(document.querySelector(`input[name='${key}'`)as HTMLInputElement).value);
                (formStruct[key as keyof T] as unknown as typeof validator)((document.querySelector(`input[name='${key}'`)as HTMLInputElement).value, key)
                temp[key] = { isValid: true, message: ""}
                isFormValid = true
            } catch (error) {
                isFormValid = false
                console.log("ERR",(error as Error).message)
                temp[key] = {isValid:false, message: (error as Error).message}
            }
        })
        console.log("RESULT", temp)
        setIsValid(temp)
        callback(isFormValid,formValue)
    }

    const initValue =(): {}=> {
        const temp : {[key: string]: {isValid:boolean, message: string}} = {}
        Object.keys(formStruct).map((key)=> {
            temp[key] = {isValid: true, message: ""}
        })
        return temp
    }

    const [isValid, setIsValid ] = React.useState<{[key: string]: {isValid:boolean, message: string}}>(initValue())
    return { isValid , handleSubmit}
}