import React, { InputHTMLAttributes } from 'react'
import { motion, MotionProps } from 'framer-motion';
import TextField from '../../../components/TextField/TextField';
import { ValidatorType } from '../../../Validator';
import { PrimaryButton } from '../../../components/Button/Button';
import { LinkText, NormalText, TitleText } from '../../../components/Text/Text';

interface RegsiterFormProps extends MotionProps {
    onLoginClick?: ()=>void
}

const RegisterForm: React.FC<RegsiterFormProps> =(props: RegsiterFormProps)=> {
    let validateBtnDidTap = false
    return (
        <motion.div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md bg-white max-w-lg"
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">
                    <TitleText big>Register</TitleText>
                </div>
                <div className="xl:flex flex-row">
                    <TextField placeholder="First Name"/>
                    <div className="w-4"></div>
                    <TextField placeholder="Last Name"/>
                </div>
                <TextField placeholder="Email" validateType={ValidatorType.Email}/>
                <TextField placeholder="Username"/>
                <TextField placeholder="Password"/>
                <TextField placeholder="Confirm Password"/>
                <PrimaryButton>Continue</PrimaryButton>
                <div className="flex flex-row items-center justify-end">
                    <LinkText small onClick={props.onLoginClick}>Already Have an account</LinkText>
                </div>
            </div>
        </motion.div>
    );
}

export default RegisterForm;