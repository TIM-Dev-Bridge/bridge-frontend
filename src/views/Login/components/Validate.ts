

export const validator =(value: string, fieldName: string ='')=> {
    const initValue = value
    const initFieldName = fieldName
    const validate = {
        isEmpty : (warningMsg: string = `${initFieldName} should not be empty`)=> {
            if (initValue.length > 0) {
                return validate
            }
            throw Error(warningMsg)
        },
        min : (length: number, message: string = `${initFieldName} should have at least ${length} character`)=> {
            if (initValue.length >= length) {
                return validate
            }
            throw Error(message)
        },
        max : (length: number, message: string = `${initFieldName} should not have more than ${length} character`)=> {
            if (initValue.length <= length) {
                return validate
            }
            throw Error(message)
        },
        isEqualTo: (text: string, fieldName: string = '', message: string = `${fieldName} and ${fieldName} do not match`)=> {
            // const compareText = (document.querySelector(`input[name='${field}'`)as HTMLInputElement).value
            if (initValue === text) {
                return validate
            }
            throw Error(message)
        },
        email: (message: string = 'Invalid Email') => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegex.test(initValue)) {
                return validate
            }
            throw Error(message)
        },
        isCharacter: (message: string = `${fieldName} only accept alphabet`) => {
            const emailRegex = /[^A-Za-z]+/;
            if (!emailRegex.test(initValue)) {
                return validate
            }
            throw Error(message)
        },
        password: (message: string = 'Password should include Capital Letter, small Letter,number and special character') => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (passwordRegex.test(initValue)) {
                return validate
            }
            throw Error(message)
        },
    }
    return validate
}


