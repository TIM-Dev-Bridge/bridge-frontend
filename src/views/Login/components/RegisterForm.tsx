import React from 'react'
import { motion, MotionProps } from 'framer-motion';
import TextField from '../../../components/TextField/TextField';
import { PrimaryButton } from '../../../components/Button/Button';
import { LinkText, TitleText } from '../../../components/Text/Text';
import { useForm } from '../../../components/Form/FormHooks';
import { validator } from './Validate';
import axios from 'axios';

interface RegsiterFormProps extends MotionProps {
    onLoginClick?: ()=>void
    isDisplay?: boolean
}

const RegisterForm: React.FC<RegsiterFormProps> =(props: RegsiterFormProps)=> {

    React.useEffect(()=> {

    })

    const onRegister =(value: {})=> {
        axios.post('https://bridge-api-tim.herokuapp.com/register', value)
            .then( res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onRegisterComplete =()=> {

    }
 
    const form = {
        first_name: (text:string, field: string)=> {
            validator(text, field)
                .isEmpty()
            }
            ,
        last_name: (text: string, field: string)=> {
            validator(text, field)
                .isEmpty()
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
        },
    }

    const { isValid, handleSubmit } = useForm<typeof form>(form)

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
                    <TextField name="first_name" placeholder="First Name" isValid={isValid["first_name"].isValid} warningMessage={isValid["first_name"].message} />
                    <div className="w-4"></div>
                    <TextField name="last_name" placeholder="Last Name" isValid={isValid["last_name"].isValid} warningMessage={isValid["last_name"].message} />
                </div>
                <TextField name="display_name" placeholder="Display Name" isValid={isValid["display_name"].isValid} warningMessage={isValid["display_name"].message} />
                <TextField name={`${props.isDisplay ? "email" : "" }`} placeholder="Email" isValid={isValid["email"].isValid} warningMessage={isValid["email"].message} />
                <TextField name={`${props.isDisplay ? "username" : "" }`} placeholder="Username" isValid={isValid["username"].isValid} warningMessage={isValid["username"].message} />
                <input name="birth_date" type="date" min="1970-01-01" />
                <TextField name={`${props.isDisplay ? "password" : "" }`} placeholder="Password" isValid={isValid["password"].isValid} warningMessage={isValid["password"].message} />
                <PrimaryButton onClick={()=> {
                    handleSubmit((isValid,value)=> {
                        if (isValid) {
                            console.log(value)
                            onRegister(value)
                        }
                    })

                    }}>Continue</PrimaryButton>
                <div className="flex flex-row items-center justify-end">
                    <LinkText small onClick={props.onLoginClick}>Already Have an account</LinkText>
                </div>
            </div>
        </motion.div>
    );
}

interface FormAttributes {
    children?: JSX.Element
}

const Form: React.FunctionComponent<FormAttributes> =(props: FormAttributes)=> {
    return (<div>
        {props.children}
    </div>)
}

export default RegisterForm;