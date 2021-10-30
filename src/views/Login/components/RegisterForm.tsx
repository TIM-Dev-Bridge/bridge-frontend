import React, { InputHTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion';

interface RegsiterFormProps extends MotionProps {
    onLoginClick?: ()=>void
}

const RegisterForm: React.FC<RegsiterFormProps> =(props: RegsiterFormProps)=> {
    return (
        <motion.div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md bg-white"
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">Register</div>
                <div className="flex flex-row">
                    <TextField />
                    <div className="w-4"></div>
                    <TextField />
                </div>
                <TextField />
                <TextField />
                <TextField />
                <TextField />
                <button className="border-none h-8 rounded-3xl pl-8 pr-8 mt-3 mb-3 text-white bg-blue-300">Continue</button>
                <div className="flex flex-row items-center justify-end">
                    <p onClick={props.onLoginClick}>Already Have an account</p>
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
        <input type="text" className="border-none h-8 rounded-3xl pl-4 pr-4 w-full bg-gray-100 mt-3 mb-3" value={props.text} placeholder={props.placeholder}/>
    );
}

export default RegisterForm;