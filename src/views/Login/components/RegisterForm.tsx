import React from 'react'
import { motion, MotionProps } from 'framer-motion';
import TextField from '../../../components/TextField/TextField';
import { PrimaryButton } from '../../../components/Button/Button';
import { LinkText, TitleText } from '../../../components/Text/Text';
import { useForm } from '../../../components/Form/FormHooks';
import { validator } from './Validate';
import axios from 'axios';
import DateSelector from '../../../components/Selector/DateSelector';
import styled from 'styled-components';
import { navigate, useNavigator } from '../../../components/Router/Router';
import { api } from '../../../Service/ApiService';
import Lottie from 'lottie-react';
import failedAnimation  from '../../../assets/Animate/fail.json'
import successAnimation from '../../../assets/Animate/success.json'
import loadingAnimation from '../../../assets/Animate/loading.json'

interface RegsiterFormProps extends MotionProps {
    onLoginClick?: ()=>void
    isDisplay?: boolean
    onRegisterComplete?: ()=>void
}

const RegisterForm: React.FC<RegsiterFormProps> =(props: RegsiterFormProps)=> {

    const navContext = useNavigator()
    const [displayFailed, setDisplayFailed] = React.useState(false)
    const [displaySuccess, setDisplaySuccess] = React.useState(false)
    const [errorResponse, setErrorResponse] = React.useState({
        email: {
            isValid: true,
            message: ''
        },
        username: {
            isValid: true,
            message: ''
        }
    })

    const onRegister =(value: {})=> {
        // console.log(value)
        api.register(value)
            .then( res => {
                // console.log(res)
                setDisplaySuccess(true)
            })
            .catch(err => {
                console.log(err)
                setDisplayFailed(true)
            })
    }
 
    const form = {
        first_name: (text:string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .isCharacter()
            }
            ,
        last_name: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .isCharacter()
        },
        display_name: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .min(5)
        },
        username: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .min(5)
        },
        birth_date: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
        },
        email: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .email()
        },
        password: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .min(8)
                .password()
        },
        confirm_password: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
                .isEqualTo((document.querySelector(`input[name='password'`)as HTMLInputElement).value)
        },
    }

    React.useEffect(()=> {
        if (displayFailed) {
            setTimeout(()=> {
                setDisplayFailed(false)
            }, 1500)
        }
    }, [displayFailed])

    React.useEffect(()=> {
        if (displaySuccess) {
            setTimeout(()=> {
                setDisplaySuccess(false)
                props.onRegisterComplete?.()
            }, 1500)
        }
    }, [displaySuccess])

    const { isValid, handleSubmit } = useForm<typeof form>(form)

    return (
        <Container
            visible={props.isDisplay ?? false}
            animate={props.animate}
            variants={props.variants}
            transition={{ duration: 0.05, type: "spring", stiffness: 100 }}>
            <div className="flex flex-col mr-10 ml-10 -3xl overflow-scroll">
                <div className="m-5 text-center">
                    <TitleText big>Register</TitleText>
                </div>
                <div className="xl:flex flex-row">
                    <TextField name="first_name" placeholder="First Name" isValid={isValid["first_name"].isValid} warningMessage={isValid["first_name"].message} data-testid="register-firstname" warningVisible={true}/>
                    <div className="w-4"></div>
                    <TextField name="last_name" placeholder="Last Name" isValid={isValid["last_name"].isValid} warningMessage={isValid["last_name"].message} data-testid="register-lastname" warningVisible={true}/>
                </div>
                <TextField name="display_name" placeholder="Display Name" isValid={isValid["display_name"].isValid} warningMessage={isValid["display_name"].message} data-testid="register-displayname" warningVisible={true}/>
                <TextField name={`${props.isDisplay ? "email" : "" }`} placeholder="Email" isValid={isValid["email"].isValid} warningMessage={isValid["email"].message} data-testid="register-email" warningVisible={true}/>
                <TextField name={`${props.isDisplay ? "username" : "" }`} placeholder="Username" isValid={isValid["username"].isValid} warningMessage={isValid["username"].message} data-testid="register-username" warningVisible={true}/>
                {/* <input name="birth_date" type="date" min="1970-01-01" /> */}
                <DateSelector type={'date'} name="birth_date" testid="register-date"/>
                <TextField type="password" name={`${props.isDisplay ? "password" : "" }`} placeholder="Password" isValid={isValid["password"].isValid} warningMessage={isValid["password"].message} data-testid="register-password" warningVisible={true}/>
                <TextField type="password" name={`${props.isDisplay ? "confirm_password" : "" }`} placeholder="Confirm Password" isValid={isValid["confirm_password"].isValid} warningMessage={isValid["confirm_password"].message} data-testid="register-confirmpassword" warningVisible={true}/>
                <PrimaryButton onClick={()=> {
                    handleSubmit((isValid,value)=> {
                        if (isValid) {
                            onRegister(value)
                        }
                    })

                    }}>Continue</PrimaryButton>
                <div className="flex flex-row items-center justify-end">
                    <LinkText small onClick={props.onLoginClick}>Already Have an account</LinkText>
                </div>
            </div>
            <FailedPopup display={displayFailed}>
                <FailedPopupContent>
                    <Lottie animationData={failedAnimation} style={{width: "300px", height: "300px", alignSelf: "center"}} loop />
                    <TitleText>Register unsuccessfull. Email or Username is Exist</TitleText>
                </FailedPopupContent>
            </FailedPopup>
            <FailedPopup display={displaySuccess}>
                <FailedPopupContent>
                    <Lottie animationData={successAnimation} style={{width: "300px", height: "300px", alignSelf: "center"}} loop />
                    <TitleText>Register Successfully!</TitleText>
                </FailedPopupContent>
            </FailedPopup>
        </Container>
    );
}

interface FormAttributes {
    children?: JSX.Element
}

// const Form: React.FunctionComponent<FormAttributes> =(props: FormAttributes)=> {
//     return (<div>
//         {props.children}
//     </div>)
// }

const FailedPopup = styled.div<{display: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(248,248,248, 0.9);
    opacity: ${props=>props.display ? "1" : "0"};
    visibility: ${props=>props.display ? "visible" : "hidden"};
    transition: all 0.2s ease-in-out;
`

const FailedPopupContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40%;
`

const Container = styled(motion.div)<{visible: boolean}>`
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
    width: 75%;
    max-width: 512px;
    /* height: 80vh; */
    overflow: scroll;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 15px;
    visibility: ${props=> props.visible ? "visible" : "hidden"};
`

export default RegisterForm;