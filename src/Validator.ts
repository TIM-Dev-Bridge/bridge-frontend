
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
        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regexp.test(text)) {
            console.log(text)
            return
        }
        throw new ValidateError("Invalid Email");
    }
}
