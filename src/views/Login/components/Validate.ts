

export const validator =(value: string, fieldName: string ='')=> {
    const initValue = value
    const initFieldName = fieldName
    const validator = {
        isEmpty : (warningMsg: string = `${initFieldName} should not be empty`)=> {
            if (initValue.length > 0) {
                return validator
            }
            throw Error(warningMsg)
        },
        min : (length: number, message: string = `${initFieldName} should have at least ${length} character`)=> {
            if (initValue.length >= length) {
                return validator
            }
            throw Error(message)
        },
        max : (length: number, message: string = `${initFieldName} should not have more than ${length} character`)=> {
            if (initValue.length <= length) {
                return validator
            }
            throw Error(message)
        },
        isEqualTo: (field: string, message: string = `${fieldName} and ${field} do not match`)=> {
            const compareText = (document.querySelector(`input[name='${field}'`)as HTMLInputElement).value
            if (initValue === compareText) {
                return validator
            }
            throw Error(message)
        },
        email: (message: string = 'Invalid Email') => {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegex.test(initValue)) {
                return validator
            }
            throw Error(message)
        }
    }
    return validator
}


