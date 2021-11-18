import axios from 'axios';
import { motion, MotionProps } from 'framer-motion';
import React from 'react'
import { AuthenContext } from '../../../Authen';
import { PrimaryButton } from '../../../components/Button/Button';
import { useForm } from '../../../components/Form/FormHooks';
import { navigate, NavigationContext } from '../../../components/Router/Router';
import { LinkText, NormalText, TitleText } from '../../../components/Text/Text';
import TextField from '../../../components/TextField/TextField';
import LandingPage from '../../LandingPage/LandingPage';
import { validator } from './Validate';

interface LoginFormProps extends MotionProps {
    onRegisterClick?: ()=>void
    onForgotPasswordClick?: ()=>void
    isDisplay?: boolean
}

const LoginForm: React.FC<LoginFormProps> =(props: LoginFormProps)=> {
    const context = React.useContext(AuthenContext)
    const navigateContext = React.useContext(NavigationContext)
    const onLogin =(value: {})=> {
        axios.post('http://localhost:4000/login', value)
            .then( res => {
                console.log(res)
                if (res.status == 200) {
                    onLoginComplete(res.data.token, res.data.username)
                } 
            })
    }

    const onLoginComplete =(token: string, username: string)=> {
        console.log("TOKEN OLD",context.authen.token)
        const authen = {
            token: token,
            username: username
        }
        context.updateToken(authen)
        navigate(navigateContext,'/bridgebase', {})
    }

    const form = {
        email: (text: string, field: string) => {
            validator(text, field)
                .isEmpty()
                .email()
        },
        password: (text: string, field: string) => {
            validator(text, field)
                .isEmpty()
                .min(8)
        }
    }

    const { isValid, handleSubmit } = useForm<typeof form>(form)

    return (
        <motion.div className="flex flex-col pb-10 w-3/4 rounded-3xl shadow-md bg-white max-w-lg" 
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">
                    <TitleText big>Log in</TitleText>
                </div>
                <TextField name={`${props.isDisplay ? "email" : "" }`} placeholder="email" isValid={isValid["email"].isValid} warningMessage={isValid["email"].message} />
                <TextField name={`${props.isDisplay ? "password" : "" }`} placeholder="Password" isValid={isValid["password"].isValid} warningMessage={isValid["password"].message}/>
                <div className="flex flex-row justify-end items-center">
                    <input type="checkbox" className="mr-2"/>
                    <NormalText small>Remember me</NormalText>
                </div>
                <PrimaryButton twstyle="h-8" onClick={()=> {
                    handleSubmit((isValid,value)=> {
                        if (isValid) {
                            console.log(value)
                            onLogin(value)
                        }
                        // navigate(navigateContext,'/bridgebase', {})
                    })

                    }}>Continue</PrimaryButton>
                <div className="flex flex-row items-center justify-between">
                    <LinkText small onClick={props.onRegisterClick}>Don't have and accout?</LinkText>
                    <LinkText small>Forgot password</LinkText>
                </div>
            </div>
        </motion.div>
    );
}

export default LoginForm;