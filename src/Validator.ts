
export class ValidateError extends Error {
    warningMessage: string
    constructor(warningMessage: string) {
        super();
        this.warningMessage = warningMessage
    }
}

export abstract class ValidatorProtocol {
    abstract validate(text: string): undefined | never
}

export enum ValidatorType {
    Email = 1,
}

export function Validator(type: ValidatorType): ValidatorProtocol {
    switch (type) {
        case ValidatorType.Email: {
            return new EmailValidator()
        }
    }
}

export class EmailValidator extends ValidatorProtocol {
    validate(text: string): undefined | never {
        if (text.length == 0) {
            throw new ValidateError("Email must not be empty")
        }
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regexp.test(text)) {
            return
        }
        throw new ValidateError("Invalid Email");
    }
}

export class TextValidator extends ValidatorProtocol {
    fieldName: string
    constructor(fieldName: string) {
        super()
        this.fieldName = fieldName
    }
    validate(text: string): undefined | never {
        if (text.length == 0) {
            throw new ValidateError(this.fieldName + "must not be empty")
        }
        if (!(/\d/.test(text))) {
            throw new ValidateError(this.fieldName + "must not contain number");
        }
        return
    }
}

export function validatorFactory(text: string, type: ValidatorType): undefined | never {
    switch (type) {
        case ValidatorType.Email: {
            return validateEmail(text)
        }
    }
}


function validateEmail(text: string): undefined | never {
    if (text.length == 0) {
        throw new ValidateError("Email must not be empty")
    }
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!regexp.test(text)) {
        throw new ValidateError("Invalid Email");
    }
    return
}

function validateNormalText(fieldName: string, text: string) {
    if (text.length == 0) {
        throw new ValidateError(fieldName + "must not be empty")
    }
    if (!(/\d/.test(text))) {
        throw new ValidateError(fieldName + "must not contain number");
    }
    return
}