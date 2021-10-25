import React, { InputHTMLAttributes } from 'react'

const RegisterForm: React.FC =()=> {
    return (
        <div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md">
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">Register</div>
                <div className="flex flex-row">
                    <TextField />
                    <TextField />
                </div>
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <button className="border-none h-8 rounded-3xl pl-8 pr-8 mt-3 mb-3 text-white bg-blue-300">Continue</button>
                <div className="flex flex-row items-center justify-end">
                    <p>Already Have an account</p>
                </div>
            </div>
        </div>
    );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
}

const TextField: React.FC<TextFieldProps> =(props: TextFieldProps)=> {
    return (
        <input type="text" className="border-none h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-3 mb-3" value={props.text} placeholder="placehlder"/>
    );
}

const Button: React.FC =()=> {
    return (
        <div className="">

        </div>
    )
}

export default RegisterForm;