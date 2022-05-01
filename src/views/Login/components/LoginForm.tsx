import axios from 'axios';
import { motion, MotionProps } from 'framer-motion';
import React from 'react'
import styled from 'styled-components';
import { AuthenContext } from '../../../Authen';
import { PrimaryButton } from '../../../components/Button/Button';
import { useForm } from '../../../components/Form/FormHooks';
import { navigate, NavigationContext } from '../../../components/Router/Router';
import { LinkText, NormalText, TitleText } from '../../../components/Text/Text';
import TextField from '../../../components/TextField/TextField';
import { api } from '../../../Service/ApiService';
import LandingPage from '../../LandingPage/LandingPage';
import { Profile, useProfile } from '../../UserProfile/ProfileContext';
import { LoadingAnimation, LoadingSpinner, LoadingState } from './useLoading';
import { validator } from './Validate';

interface LoginFormProps extends MotionProps {
    onRegisterClick?: ()=>void
    onForgotPasswordClick?: ()=>void
    isDisplay?: boolean
}

const LoginForm: React.FC<LoginFormProps> =(props: LoginFormProps)=> {
    const context = React.useContext(AuthenContext)
    const profile = useProfile()
    const navigateContext = React.useContext(NavigationContext)
    const [loadingStatus, setLoadingStatus] = React.useState(LoadingState.IDLE)
    const [errorResponse, setErrorResponse] = React.useState({
        email: {
            isValid: true,
            message: ''
        },
        password: {
            isValid: true,
            message: ''
        }
    })
    const onLogin =(value: {})=> {
        // console.log("VLAUE: ", value)
        setLoadingStatus(LoadingState.LOADING)
        api.login(value)
            .then( res => {
                console.log("LOGIN RES",res)
                if (res.status == 200) {
                    onLoginComplete(res.data.token, res.data.username)
                    const newProfile: Profile = {
                        access: res.data.access,
                        birth_date: res.data.birth_date,
                        display_name: res.data.display_name,
                        email: res.data.email,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        password: res.data.password
                    }
                    profile.updateProfile(newProfile)
                } 
            })
            .catch( error => {
                setLoadingStatus(LoadingState.FAIL)
                if (error == undefined) {
                    return
                }
                let response = error.response
                if (response == undefined) {
                    return
                }
                if (error.response.status == 400) {
                    setErrorResponse({
                        email: {
                            isValid: false,
                            message: 'Email or Password is incorrect'
                        },
                        password: {
                            isValid: false,
                            message: 'Email or Password is incorrect'
                        }
                    })
                }
            })
    }

    const onLoginComplete =(token: string, username: string)=> {
        // console.log("TOKEN OLD",context.authen.token)
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

    const loadable =(component: JSX.Element)=> {
        console.log(LoadingState[loadingStatus])
        switch (loadingStatus) {
            case LoadingState.IDLE:
                return component
            case LoadingState.LOADING:
                return LoadingAnimation.loading
            case LoadingState.SUCCESS:
                return LoadingAnimation.success
            case LoadingState.FAIL:
                return component
        }
    }

    return (
        <Container 
            visible={props.isDisplay ?? false}
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl">
                <div className="m-5 text-center">
                    <TitleText big>Log in</TitleText>
                </div>
                <TextField id="login-email" warningVisible={true} name={`${props.isDisplay ? "email" : "" }`} placeholder="Email" isValid={isValid["email"].isValid && errorResponse['email'].isValid} warningMessage={isValid["email"].message + errorResponse['email'].message} data-testid="login-email"/>
                <TextField id="login-password" warningVisible={true} type="password" name={`${props.isDisplay ? "password" : "" }`} placeholder="Password" isValid={isValid["password"].isValid && errorResponse['password'].isValid} warningMessage={isValid["password"].message  + errorResponse['password'].message} data-testid="login-password"/>
                {/* <div className="flex flex-row justify-end items-center">
                    <input type="checkbox" className="mr-2"/>
                    <NormalText small>Remember me</NormalText>
                </div> */}
                <PrimaryButton onClick={()=> {
                    // console.log("VALUE :=> ",(document.getElementById('login-email') as HTMLInputElement).value)
                    handleSubmit((isValid,value)=> {
                        // console.log("IS VALID", isValid)
                        if (isValid) {
                            console.log(value)
                            onLogin(value)
                        }
                        // navigate(navigateContext,'/bridgebase', {})
                    })

                    }}>
                        {
                            loadable(<>Continue</>)
                        }
                    </PrimaryButton>
                <div className="flex flex-row items-center justify-between">
                    <LinkText small onClick={props.onRegisterClick}>Don't have and accout?</LinkText>
                    {/* <LinkText small>Forgot password</LinkText> */}
                </div>
            </div>
        </Container>
    );
}

const Container = styled(motion.div)<{visible: boolean}>`
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
    width: 75%;
    max-width: 512px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 15px;
    visibility: ${props=> props.visible ? "visible" : "hidden"};
`

export default LoginForm;