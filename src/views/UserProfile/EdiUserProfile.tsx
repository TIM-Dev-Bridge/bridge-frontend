import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { useAuthen } from '../../Authen'
import { PrimaryButton } from '../../components/Button/Button'
import { useForm } from '../../components/Form/FormHooks'
import DateSelector from '../../components/Selector/DateSelector'
import { NormalText, TitleText } from '../../components/Text/Text'
import TextField from '../../components/TextField/TextField'
import { validator } from '../Login/components/Validate'
import { useProfile } from './ProfileContext'
import loadingAnimation  from '../../assets/Animate/loading_blue.json'
import Lottie from 'lottie-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingState } from '../Login/components/useLoading'
import successAnimation from '../../assets/Animate/success.json'
import failedAnimation from '../../assets/Animate/fail.json'
import { api } from '../../Service/ApiService'

const EditUserProfile =()=> {
    const authen = useAuthen()
    const [defaultData, updateData] = React.useState<any>()
    const profile = useProfile()
    const [loadingState, setLoadingState] = React.useState(LoadingState.LOADING)
    const [displaySuccess, setDisplaySuccess] = React.useState(false)
    const [displayFailed, setDisplayFailed] = React.useState(false)

    React.useEffect(()=> {
        api.getUserData(authen.authen.username).then( respone => {
            // console.log(respone)
            const newData = {
                username: respone.data.username,
                first_name: respone.data.first_name,
                last_name: respone.data.last_name,
                password: respone.data.password,
                display_name: respone.data.display_name,
                birth_date: respone.data.birth_date
            }
            
            updateData(newData)
            setLoadingState(LoadingState.SUCCESS)
            
        })
        .catch( error => {
            
        })
        // const newData = {
        //     username: profile.profile.display_name,
        //     first_name: profile.profile.first_name,
        //     last_name: profile.profile.last_name,
        //     password: '',
        //     display_name: '',
        //     birth_date: ''
        // }
        // updateData(profile.profile)
    }, [])
    
    const updateUserData =(data: any)=> {
        const newData = {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            password: defaultData.password,
            display_name: data.display_name,
            birth_date: data.birth_date
        }
        updateData(newData)
        // console.log(newData)
        api.updateUserData(newData)
            .then( response => {
                console.log(response)
                setDisplaySuccess(true)
            })
            .catch((error)=> {
                console.log(error)
                setDisplayFailed(true)
            })
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
            }, 1500)
        }
    }, [displaySuccess])
    
    const postUpdateUser =()=> {
        // console.log(defaultData)
        // axios.post('https://bridge-api-tim.herokuapp.com/getUserData', defaultData)     
    }

    const formStruct = {
        username: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        first_name: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        last_name: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        display_name: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        birth_date: (text: string, fieldName: string)=> {
            validator(text)
                .isEmpty()
        },
        // password: (text: string, fieldName: string)=> {
        //     validator(text)
        //         .isEmpty()
        // },
    }
    const form = useForm(formStruct)

    const popup = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.3
            }
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    }

    return (
        <Container>
            <InnerContainer>
                <div style={{display: "flex", justifyContent: "start",marginBottom: "50px"}}>
                    <TitleText big>Update Information</TitleText>
                </div>
                <NormalText>Username</NormalText>
                <TextField 
                    name="username" 
                    placeholder="Username"
                    warningMessage={form.isValid['username'].message}
                    isValid={form.isValid['username'].isValid}
                    defaultValue={defaultData?.username ?? ''}
                    />
                <NormalText>Firstname</NormalText>
                <TextField 
                    name="first_name"
                    placeholder="Firstname"
                    warningMessage={form.isValid['first_name'].message}
                    isValid={form.isValid['first_name'].isValid}
                    defaultValue={defaultData?.first_name ?? ''}
                    />
                <NormalText>Lastname</NormalText>
                <TextField 
                    name="last_name"
                    placeholder="Lastname"
                    warningMessage={form.isValid['last_name'].message}
                    isValid={form.isValid['last_name'].isValid}
                    defaultValue={defaultData?.last_name ?? ''}
                    />
                <NormalText>Display Name</NormalText>
                <TextField 
                    name="display_name"
                    placeholder="Display Name"
                    warningMessage={form.isValid['display_name'].message}
                    isValid={form.isValid['display_name'].isValid}
                    defaultValue={defaultData?.display_name ?? ''}
                    />
                <NormalText>Birth Date</NormalText>
                <DateSelector type="date" name="birth_date" defaultValue={defaultData?.birth_date ?? ''}/>
                {/* <NormalText>Password</NormalText> */}
                {/* <TextField placeholder="Password" name="password" defaultValue={defaultData?.password ?? ''}/> */}
                <div style={{width: "100%",alignContent: "flex-end", display: "flex", justifyContent: "flex-end", marginTop: "50px"}}>
                    <div style={{width: "120px", alignSelf: "flex-end"}}>
                        <PrimaryButton
                            onClick={()=> {
                                form.handleSubmit((isValid, value)=> {
                                    if (isValid) {
                                        updateUserData(value)
                                    }
                                })
                            }}
                            >
                            Update
                        </PrimaryButton>
                    </div>
                </div>
            </InnerContainer>
            {/* <AnimatePresence>
                {loadingState == LoadingState.LOADING && (
                    <LoadingSpinner 
                        initial={{opacity: 1}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}>
                        <Lottie animationData={loadingAnimation} style={{width: "100vw", height: "100vh"}} loop/>
                    </LoadingSpinner>)
                }
            
            </AnimatePresence> */}
            <Popup display={loadingState == LoadingState.LOADING}>
                <PopupContent>
                    <Lottie animationData={loadingAnimation} style={{width: "300px", height: "300px", alignSelf: "center"}} loop />
                </PopupContent>
            </Popup>
            <Popup display={displayFailed}>
                <PopupContent>
                    <Lottie animationData={failedAnimation} style={{width: "300px", height: "300px", alignSelf: "center"}} loop />
                    <TitleText>Update failed try again later</TitleText>
                </PopupContent>
            </Popup>
            <Popup display={displaySuccess}>
                <PopupContent>
                    <Lottie animationData={successAnimation} style={{width: "300px", height: "300px", alignSelf: "center"}} loop />
                    <TitleText>Update successfully!</TitleText>
                </PopupContent>
            </Popup>
            
        </Container>
    )
}

const Popup = styled.div<{display: boolean}>`
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

const PopupContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40%;
`

const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    /* margin-top: 50px;
    max-width: 560px; */
    min-width: 480px;
    display: flex;
    position: relative;
    flex-direction: column;
    box-shadow: var(--app-shadow);
    min-height: calc(100vh - 56px);
    /* justify-content: center; */
    align-items: center;
`

const InnerContainer = styled.div`
    margin-top: 50px;
    max-width: 720px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-content: flex-start;
    align-items: flex-start;
`

const LoadingSpinner = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
`

export default EditUserProfile;