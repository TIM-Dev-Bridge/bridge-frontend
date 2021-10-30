import { motion, MotionProps } from 'framer-motion';
import React, { InputHTMLAttributes } from 'react'

interface LoginFormProps extends MotionProps {
    onRegisterClick?: ()=>void
    onForgotPasswordClick?: ()=>void
}

const LoginForm: React.FC<LoginFormProps> =(props: LoginFormProps)=> {
    return (
        <motion.div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md bg-white"
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">Login</div>
                <TextField />
                <TextField />
                <div className="flex flex-row justify-end items-center">
                    <input type="checkbox" className="mr-2"/>
                    <p>Remember me</p>
                </div>
                <button className="border-none h-8 rounded-3xl pl-8 pr-8 mt-3 mb-3 text-white bg-blue-300">Continue</button>
                <div className="flex flex-row items-center justify-between">
                    <div >
                        <p onClick={props.onRegisterClick}>Don't have account</p>
                    </div>
                    <div onClick={props.onForgotPasswordClick}>
                        <p>Forgot password</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string
    placeholder?: string
}

const TextField: React.FC<TextFieldProps> =(props: TextFieldProps)=> {
    return (
        <input type="text" className="border-none h-8 rounded-3xl pl-8 pr-8 bg-gray-100 mt-3 mb-3" value={props.text} placeholder={props.placeholder}/>
    );
}

export default LoginForm;