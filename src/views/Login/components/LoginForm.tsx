import { motion, MotionProps } from 'framer-motion';
import React, { InputHTMLAttributes } from 'react'
import { PrimaryButton } from '../../../components/Button/Button';
import { LinkText, NormalText, TitleText } from '../../../components/Text/Text';
import TextField from '../../../components/TextField/TextField';

interface LoginFormProps extends MotionProps {
    onRegisterClick?: ()=>void
    onForgotPasswordClick?: ()=>void
}

const LoginForm: React.FC<LoginFormProps> =(props: LoginFormProps)=> {
    return (
        <motion.div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md bg-white max-w-lg" 
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">
                    <TitleText big>Log in</TitleText>
                </div>
                <TextField placeholder="Username" />
                <TextField placeholder="Password"/>
                <div className="flex flex-row justify-end items-center">
                    <input type="checkbox" className="mr-2"/>
                    <NormalText small>Remember me</NormalText>
                </div>
                <PrimaryButton>Continue</PrimaryButton>
                <div className="flex flex-row items-center justify-between">
                    <LinkText small onClick={props.onRegisterClick}>Don't have and accout?</LinkText>
                    <LinkText small>Forgot password</LinkText>
                </div>
            </div>
        </motion.div>
    );
}

export default LoginForm;